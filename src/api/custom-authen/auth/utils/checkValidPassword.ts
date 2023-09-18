const checkValidPassword = async (password: string, storedPassword: string) => {

    return await strapi.plugins['users-permissions'].services.user.validatePassword(password || "", storedPassword);
}

export default checkValidPassword