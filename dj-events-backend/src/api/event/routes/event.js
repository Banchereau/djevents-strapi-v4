'use strict';

/**
 * event router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::event.event', {
    config: {
        update: {
            policies: ['is-owner'],
        },
        delete: {
            policies: ['is-owner'],
        }
    }
});
