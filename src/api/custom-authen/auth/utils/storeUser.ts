const storeUser = async (params: {
    email: string,
    id: string,
    fullname: string,
    department: string
    password: string
}) => {
    
    const newUser = await strapi.entityService.create("plugin::users-permissions.user", {
        data: {
            username: params.id,
            email: params.email,
            fullname: params.fullname,
            password: params.password,
            confirmed: true,
            blocked: false,
            role: 1 // เป็น Students
        },
    })

    return newUser
}

export default storeUser