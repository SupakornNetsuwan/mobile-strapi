/**
 * is-can-create-event policy
 */

export default (policyContext, config, { strapi }) => {
    // Add your own logic here.
    // strapi.log.info('In is-can-create-event policy. (Route level) ✨');

    const { user } = policyContext.state;

    const canDoSomething = user.isCanCreateEvent;

    if (canDoSomething) {
      return true;
    }

    return false;
};
