/**
 * only-event-owner policy
 */

export default (policyContext, config, { strapi }) => {
    // Add your own logic here.
    strapi.log.info('In only-event-owner policy. (Route level) ✨');

    const canDoSomething = true;

    if (canDoSomething) {
      return true;
    }

    return false;
};
