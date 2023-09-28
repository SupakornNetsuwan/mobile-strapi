module.exports = (plugin) => {

  const allRoutes = plugin.routes["content-api"].routes; // route ที่เกี่ยวข้องทั้งหมด
  
  /*
  [
  {
    method: 'GET',
    path: '/connect/(.*)',
    handler: 'auth.connect',
    config: { middlewares: [Array], prefix: '' }
  },
  {
    method: 'POST',
    path: '/auth/local',
    handler: 'auth.callback',
    config: { middlewares: [Array], prefix: '' }
  },
  {
    method: 'POST',
    path: '/auth/local/register',
    handler: 'auth.register',
    config: { middlewares: [Array], prefix: '' }
  },
  {
    method: 'GET',
    path: '/auth/:provider/callback',
    handler: 'auth.callback',
    config: { prefix: '' }
  },
  {
    method: 'POST',
    path: '/auth/forgot-password',
    handler: 'auth.forgotPassword',
    config: { middlewares: [Array], prefix: '' }
  },
  {
    method: 'POST',
    path: '/auth/reset-password',
    handler: 'auth.resetPassword',
    config: { middlewares: [Array], prefix: '' }
  },
  {
    method: 'GET',
    path: '/auth/email-confirmation',
    handler: 'auth.emailConfirmation',
    config: { prefix: '' }
  },
  {
    method: 'POST',
    path: '/auth/send-email-confirmation',
    handler: 'auth.sendEmailConfirmation',
    config: { prefix: '' }
  },
  {
    method: 'POST',
    path: '/auth/change-password',
    handler: 'auth.changePassword',
    config: { middlewares: [Array], prefix: '' }
  },
  {
    method: 'GET',
    path: '/users/count',
    handler: 'user.count',
    config: { prefix: '' }
  },
  {
    method: 'GET',
    path: '/users',
    handler: 'user.find',
    config: { prefix: '' }
  },
  {
    method: 'GET',
    path: '/users/me',
    handler: 'user.me',
    config: { prefix: '' }
  },
  {
    method: 'GET',
    path: '/users/:id',
    handler: 'user.findOne',
    config: { prefix: '' }
  },
  {
    method: 'POST',
    path: '/users',
    handler: 'user.create',
    config: { prefix: '' }
  },
  {
    method: 'PUT',
    path: '/users/:id',
    handler: 'user.update',
    config: { prefix: '' }
  },
  {
    method: 'DELETE',
    path: '/users/:id',
    handler: 'user.destroy',
    config: { prefix: '' }
  },
  { method: 'GET', path: '/roles/:id', handler: 'role.findOne' },
  { method: 'GET', path: '/roles', handler: 'role.find' },
  { method: 'POST', path: '/roles', handler: 'role.createRole' },
  { method: 'PUT', path: '/roles/:role', handler: 'role.updateRole' },
  {
    method: 'DELETE',
    path: '/roles/:role',
    handler: 'role.deleteRole'
  },
  {
    method: 'GET',
    path: '/permissions',
    handler: 'permissions.getPermissions'
  }
]
  */


  for (let i = 0; i < allRoutes.length; i++) {
    const route = allRoutes[i];

    if (
      route.path === "/users/:id" // ถ้าเป็น path นี้ก็ทำการปรับแต่งใส่ policy ให้เฉพาะเจ้าของ
    ) {
      allRoutes[i] = {
        ...route,
        config: {
          ...route.config,
          policies: route.config.policies
            ? [...route.config.policies, "global::isOwner"] // tests if policies were defined
            : ["global::isOwner"],
        },
      };
    }
  }

  return plugin;
};
