/**
 * is-owner-of-post policy
 */

import { errors } from "@strapi/utils"
const { PolicyError } = errors;
import { Strapi } from "@strapi/strapi/lib/types/core/namespace";

import type { Context } from "koa";

export default async (policyContext:Context, config, { strapi:Strapi }) => {
  // Add your own logic here.
  strapi.log.info('In is-owner-of-post policy.');

  const {user} = policyContext.state;
  const post_id = policyContext.params.id
  const existedPost = await strapi.entityService.findOne(
    'api::post.post',
    post_id,
    { populate: "*" }
  );

  const isOnwerPost = user.id == existedPost.owner?.id;
  if (!isOnwerPost) {
    throw new PolicyError('คุณไม่ใช่เจ้าของโพสต์', { policy: 'is-owner-of-post' })
  } else {
    return true;
  }
  return false

};

