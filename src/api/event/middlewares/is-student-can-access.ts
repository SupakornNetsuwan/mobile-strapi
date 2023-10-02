/**
 * `is-student-can-access` middleware
 */

import { Strapi } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    const params = ctx.params

    const student_year = Number(user.email.substring(0, 2))

    const application = await strapi.entityService.findMany('api::application.application');
    const current_year = Number(application.year.toString().substring(2, 4))

    const year = (current_year - student_year + 1).toString()

    const event = await strapi.entityService.findOne(
      'api::event.event',
      params.id,
      {
        populate: {
          studentAccessYears: {
            filters: {
              year: { $contains: year }
            },
          },
        },
      }
    );

    if (event.studentAccessYears.length == 0) {
      return ctx.unauthorized("คุณไม่มีสิทธิ์เข้าถึงข้อมูลที่ไม่ได้รับอนุญาต");
    }

    await next();
  };
};
