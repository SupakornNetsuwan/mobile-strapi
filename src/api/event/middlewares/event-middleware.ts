/**
 * `event-middleware` middleware
 */

import { Strapi } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (context, next) => {
    strapi.log.info('In event-middleware middleware. 🧀');

    await next();
  };
};
