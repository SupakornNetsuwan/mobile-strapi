/**
 * @description ทำการเช็คว่าผู้มช้มีในฐานข้อมูลหรือไม่
 */

const checkExistUser = async (email: string) => {
    const user = await strapi.db.query("plugin::users-permissions.user").findOne({
        where: {
            email: email
        }
    })

    return user;
}

export default checkExistUser