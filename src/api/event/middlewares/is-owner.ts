/**
 * `is-owner` middleware
 */

import { Strapi } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    
    // return ctx.unauthorized("This action is unauthorized."); // ถ้าไม่อยากใหเข้าถึง

    await next();
  };
};
