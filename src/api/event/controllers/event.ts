/**
 * event controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::event.event",
    ({ strapi }) => ({
        async find(ctx) {
            const student_year = Number(ctx.state.user.email.substring(0, 2))
            const application = await strapi.entityService.findMany('api::application.application');

            const current_year = Number(application.year.toString().substring(2, 4))
            const year = current_year - student_year + 1

            ctx.query = {
                ...ctx.query,
                populate: {
                    cover:{
                        fields:["url", "width", "height"]
                    },
                    owner:{
                        fields:["id" ]
                    },
                    staffs:{
                        fields:["position", "duty"],
                        populate:{
                            staff:{
                                fields:["id"]
                            }
                        }
                    }
                },
                filters: {
                    $or: [
                        {
                            studentAccessYears: {
                                year: { $contains: year }
                            },
                        },
                        {
                            owner: {
                                id: ctx.state.user.id
                            },
                        },
                    ]
                },
                sort: { start: 'ASC' },
            };

            const response = await super.find(ctx);
            return response;
        },
    })
);
