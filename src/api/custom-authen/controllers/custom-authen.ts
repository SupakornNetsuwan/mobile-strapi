import { errors } from '@strapi/utils';
import findUser from "../auth/ldap/ldapFindUser";
import CustomError from '../../../utils/CustomError';
import storeUser from '../auth/utils/storeUser';
import checkExistUser from '../auth/utils/checkExistUser';
import checkValidPassword from '../auth/utils/checkValidPassword';

/**
 * A set of functions called "actions" for `custom-authen`
 */

const { ApplicationError } = errors;

export default {
  signin: async (ctx, next) => {
    try {
      const { identifier, password }: { identifier: string; password: string } = ctx.request.body
      const studentId = identifier.replace("@kmitl.ac.th", "")
      const existUser = await checkExistUser(`${studentId}@kmitl.ac.th`);

      if (existUser) {
        strapi.log.info("พบผู้ใช้งานในฐานข้อมูล 🟢", existUser)
        ctx.request.body.identifier = studentId + "@kmitl.ac.th"

        return await strapi.plugin('users-permissions').controllers.auth.callback(ctx);
      } else {
        strapi.log.info("ไม่พบผู้ใช้งานในฐานข้อมูล ลองทำการค้นหาด้วย LDAP 🟡")
        const LDAPuser = await findUser(studentId, password); // ลองทำการหาจาก ฐานข้อมูล LDAP
        strapi.log.info("พบผู้ใช้ใน LDAP ทำการสมัครสมาชิก 🟢")
        ctx.request.body.email = LDAPuser.email
        ctx.request.body.username = LDAPuser.fullname

        return await strapi.plugin('users-permissions').controllers.auth.register(ctx);
      }

    } catch (err) {
      // เกิด Error 🚨
      err = new CustomError(err)
      throw new ApplicationError(err.message)
    }
  },
  signout: async (ctx, next) => { }
};
