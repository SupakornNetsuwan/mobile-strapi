/**
 * post router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::post.post',{
    config:{
        create: {
            policies: ["is-validate-form-input","is-can-create-post", (policyContext, config, { strapi }) => {
                return true;
            }],
        },
        update: {
            policies: ["is-validate-form-input", "is-owner-of-post", (policyContext, config, { strapi }) => {
                return true;
            }],
        },
        delete: {
            policies: ["is-owner-of-post",  (policyContext, config, { strapi }) => {
                return true;
            }],
        }
    }
});
