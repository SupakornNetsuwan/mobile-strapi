/**
 * `is-staff-of-event` middleware
 */

import { Strapi } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const user = ctx.state.user;
    const params = ctx.params

    const event = await strapi.entityService.findOne('api::event.event', params.id, { populate: "*" })
    const staff = await strapi.entityService.findMany(
      'api::staff.staff',
      {
        populate: "*",
        filters: {
          event: {
            id: params.id
          },
          staff: {
            id: user.id
          }
        }
      }
    );

    if (staff.length == 0 && event.owner?.id != user.id) {
      return ctx.unauthorized("คุณไม่ได้เข้าร่วมกิจกรรมนี้");
    }

    await next();
  };
};
