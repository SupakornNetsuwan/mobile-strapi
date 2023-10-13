/**
 * is-can-create-event policy
 */

import { errors } from "@strapi/utils"
const { PolicyError } = errors;

export default (policyContext, config, { strapi }) => {
    // Add your own logic here.
    // strapi.log.info('In is-can-create-event policy. (Route level) ✨');

    const { user } = policyContext.state;

    const canDoSomething = user.isCanCreateEvent;

    if (!canDoSomething) {
      throw new PolicyError('คุณไม่มีสิทธิ์ในการสร้างกิจกรรม', { policy: 'is-can-create-event' })
    } else {
      return true;
    }
};
