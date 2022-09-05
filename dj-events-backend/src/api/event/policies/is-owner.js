"use strict";

/**
 * `is-owner` policy.
 */

module.exports = async (policyContext, config, { strapi }) => {
  // Add your own logic here.
  strapi.log.info("In is-owner policy.");

  try {
    // Get id from request
    const { id } = policyContext.params;
    // Get the tutorial by id
    const event = await strapi
      .service("api::event.event")
      .findOne(id, { populate: ["user"] });
    // current logged in user
    const { user } = policyContext.state;
    // check if classroom manager is logged in user
    const { user: eventUser } = event;
    
    if (eventUser && eventUser.id === user.id) return true;
    return false;
  } catch (e) {
    strapi.log.error("Error in is-manager policy", e);
    return false;
  }
};
