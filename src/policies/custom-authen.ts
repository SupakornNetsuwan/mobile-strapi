/**
 * custom-auten policy
 */

export default (policyContext, config, { strapi }) => {
    // Add your own logic here.
    strapi.log.info('In custom-authen policy. (Gloval level) ✨');

    const canDoSomething = true;

    if (canDoSomething) {
      return true;
    }

    return false;
};
