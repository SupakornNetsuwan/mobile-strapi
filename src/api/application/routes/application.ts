/**
 * application router
 */

import { factories } from '@strapi/strapi';

const ctx = strapi.requestContext.get();

export default factories.createCoreRouter('api::application.application', {
    config: {

    }
});
