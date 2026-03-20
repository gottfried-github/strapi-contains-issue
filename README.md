# `$contains` and `$containsi` REST API filters return empty data

After importing the data from the snapshot (see below), make the following queries:

`curl -g localhost:1337/api/performances?filters[title][$contains]=est02`

`curl -g localhost:1337/api/performances?filters[title][$containsi]=est02`

Observe that these return empty `data` array while it should return one document with title `test02`.

I also tried to use `$eq` operator, like this:

`curl -g localhost:1337/api/performances?filters[title][$eq]=test02`

which does work.

I have both Draft & Publish and Internationalization disabled.

I also tried this with an SQLite database, and the behavior is the same.

# `$contains` works in Document Service API

[Here](https://github.com/gottfried-github/strapi-contains-issue/blob/8fb0b0cd21a30b5b751d3c4f60cc78ff9db44eb8/src/api/performance/controllers/test.js#L10) I perform the same query as above with the `$contains` operator via Document Service API.

Run the following query:

`curl localhost:1337/api/performances/test`

This works as intended and returns a single document with title of `test02`.

# Project snapshot

I've created a backup, containing the data and configs. Here it is: `./backups/2026-03-19_01.tar`.

For restoring this snapshot, see [Importing the backup file](#importing-the-backup-file) below.

# Importing the backup file

Run:

`docker compose -f docker-compose.dev.yml run strapi npm run strapi import -- -f /usr/src/app/backups/<export file name>`

The `-f` option points to a location that's mounted from the host system.

# Running the app

`docker compose -f docker-compose.dev.yml up`

# Exporting the project data and configuration

To export, I use `strapi export` [`3`, `4`].

Because I run Strapi in a Docker Compose setup, I need to run it inside the `strapi` container. To do this, first stop (and remove) the containers if they are running (i.e., hit Ctrl + c and run `docker compose down`).

`docker compose -f docker-compose.dev.yml run strapi npm run strapi export -- --no-encrypt --no-compress -f /usr/src/app/backups/<export file name>`

The `-f` here points to the `/usr/src/app/backups` directory, which is mounted from the host `./backups`, so the backup file stays in the host filesystem.

# Refs

1. https://docs.strapi.io/cms/quick-start#step-4-set-roles--permissions
2. https://docs.strapi.io/cms/api/rest/populate-select#population
3. https://docs.strapi.io/cms/data-management/export
4. https://docs.strapi.io/cms/cli#strapi-export
5. https://docs.strapi.io/cms/api/rest/populate-select#populate-with-filtering
6. https://stackoverflow.com/questions/8333920/passing-a-url-with-brackets-to-curl
7. https://docs.strapi.io/cms/api/rest/populate-select#combining-population-with-other-operators
8. https://docs.strapi.io/cms/data-management/import
