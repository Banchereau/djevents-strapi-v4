"use strict";

/**
 *  event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  async me(ctx) {
    const results = await strapi.service("api::event.event").me(ctx);
    return results;
  },
  async create(ctx) {
    //strapi.log.info(`create: ${JSON.stringify(ctx.state.user)}`);
    ctx.request.body = {
      data: {
        ...ctx.request.body.data,
        user: ctx.state.user.id,
      },
    };
    ctx.state.auth = false;
    // Calling the default core action
    // const response = await strapi.entityService.create('api::event.event', body )
    const response = await super.create(ctx);
    // ctx.state.user doesn't work

    return response;
  },
}));
