/**
 * event router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::event.event', {
    config: {
        find: {
            policies: ["global::custom-authen", "only-event-owner", (policyContext, config, { strapi }) => {
                console.log("Directly passed policy. ✨")
                return true;
            }],
            /* ทำการกำหนด Policies ได้ทั้งแบบ global level, route level
            หรือ ทำ api::event.only-event-owner ก็ได้ สำหรับ policies */
            middlewares: ["api::event.is-owner", "global::global-example", "api::event.event-middleware", (ctx, next) => {
                console.log("Directly passed middleware middleware. 🧀")
                return next();
            }], // Middleware สำหรับ route level ส่วน Global กำหนดที่ ./config/middlewares.ts
        },
        

    }
});
