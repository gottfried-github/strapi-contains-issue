"use strict";

module.exports = {
  test: async (ctx, next) => {
    const results = await strapi
      .documents("api::performance.performance")
      .findMany({
        filters: {
          title: {
            $contains: "est02",
          },
        },
      });

    console.log("performance test controller - results:", results);

    ctx.body = results;
  },
};
