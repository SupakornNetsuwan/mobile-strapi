/**
 * event controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::event.event",
    ({ strapi }) => ({
        async find(ctx) {
            const student_year = Number(ctx.state.user.email.substring(0, 2))
            const application = await strapi.entityService.findOne(
                'api::application.application',
                2
            );
            const current_year = Number(application.year.toString().substring(2, 4))
            const year = current_year - student_year + 1

            ctx.query = {
                ...ctx.query,
                populate: "*",
                filters: {
                    studentAccessYears: {
                        year: { $contains: year }
                    },
                },
            };

            const response = await super.find(ctx);
            return response;
        },
    })
);
