'use strict';

/**
 * `is-me` policy.
 */

module.exports = (policyContext, config, { strapi }) => {
    // Add your own logic here.
    strapi.log.info('In is-me policy.');

    const canDoSomething = true;

    if (canDoSomething) {
      return true;
    }

    return false;
};
