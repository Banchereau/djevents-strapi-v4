"use strict";

/**
 * event service.
 */

const { createCoreService } = require("@strapi/strapi").factories;
const { sanitize } = require("@strapi/utils");

module.exports = createCoreService("api::event.event", ({ strapi }) => ({
    async me(ctx) {
    // in case of ctx.state.user problem
    //const user = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);
    
    if (!ctx.state.user) {
      return ctx.badRequest('No authorization was found');
    }
    
    const results = await strapi.entityService.findMany('api::event.event', {
      filters: {
        user: ctx.state.user.id
      },
      populate: ['user'],
    });
    const model = strapi.getModel('api::event.event');
    const sanitizedResults = await sanitize.contentAPI.output(results,model);
    return sanitizedResults;
        
  },
}));
