
/**
 * @description สำหรับจัดการผู้ใช้รายบุคคลแบบ Custom
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/custom-user',
      handler: 'custom-user.updateProfile',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
