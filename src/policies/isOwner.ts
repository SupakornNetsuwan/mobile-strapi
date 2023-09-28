"use strict";
import { errors } from "@strapi/utils"
const { PolicyError } = errors;
/**
 * `isOwner` policy
 */

module.exports = async (policyContext, config, { strapi }) => {

  const { user, auth } = policyContext.state;
  const { params } = policyContext;

  // this case the userId is the same as the id we are requesting
  // other cases would need more extensive validation...
  const canDoSomething = user.id == params.id;

  if (!canDoSomething) {
    throw new PolicyError('คุณไม่มีสิทธิ์เข้าถึงข้อมูลที่ไม่ได้รับอนุญาต', { policy: 'isOwner' })
  } else {
    return true;
  }
};