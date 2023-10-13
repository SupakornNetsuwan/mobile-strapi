/**
 * is-validate-form-input policy
 */

export default (policyContext, config, { strapi }) => {
    // Add your own logic here.
    strapi.log.info('In is-validate-form-input policy.');

    const canDoSomething = true;

    if (canDoSomething) {
      return true;
    }

    return false;
};
