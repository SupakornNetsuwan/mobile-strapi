export default {
  routes: [
    {
      method: 'POST',
      path: '/custom-authen',
      handler: 'custom-authen.signin',
      config: {
        auth: false,
        policies: ["api::custom-authen.validate-input",(policyContext, config, { strapi }) => {
          strapi.log.info("Authentication Policy ✨")
          return true;
        }],
        middlewares: [(ctx, next) => {
          strapi.log.info("Authentication Middleware ✨")
          return next();
        }],
      },
    },
  ],
};
