/**
 * is-event-owner policy
 */

import { errors } from "@strapi/utils"
const { PolicyError } = errors;

export default async (policyContext, config, { strapi }) => {
    // Add your own logic here.
    strapi.log.info('In is-event-owner policy.');
    
    const { user } = policyContext.state;
    const { params } = policyContext;
    
    const event = await strapi.entityService.findOne(
      'api::event.event',
      params.id,
      { populate: "*" }
    );

    const canDoSomething = user.id == event.owner.id;

    if (!canDoSomething) {
      throw new PolicyError('คุณไม่มีสิทธิ์เข้าถึงข้อมูลที่ไม่ได้รับอนุญาต', { policy: 'is-event-owner' })
    } else {
      return true;
    }
};
