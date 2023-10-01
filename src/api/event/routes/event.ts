/**
 * event router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::event.event', {
    config: {
        findOne: {
            middlewares: ["api::event.is-student-can-access", (ctx, next) => {
                return next();
            }],
        },
        create: {
            policies: ["is-can-create-event", (policyContext, config, { strapi }) => {
                return true;
            }],
        },
        update: {
            policies: ["is-event-owner", (policyContext, config, { strapi }) => {
                return true;
            }],
        },
        delete: {
            policies: ["is-event-owner", (policyContext, config, { strapi }) => {
                return true;
            }],
        }
    }
});
