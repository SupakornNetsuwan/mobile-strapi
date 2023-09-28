import { errors } from "@strapi/utils"
const { ApplicationError } = errors
/**
 * A set of functions called "actions" for `custom-user`
 */

export default {
  updateProfile: async (ctx, next) => {
    const request = ctx.request;
    const user = ctx.state.user;

    console.log(user);
    // const profile = await strapi.services['plugin::users-permissions.jwt'].verify(user)
    // console.log(profile);

    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  }
};
