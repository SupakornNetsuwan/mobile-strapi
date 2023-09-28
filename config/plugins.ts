export default ({ env }) => ({
    // ...
    "users-permissions": {
        config: {
            register: {
                allowedFields: ["fullname"],
            },
        },
    },
    upload: {
        config: {
            provider: 'local',
            providerOptions: {
                sizeLimit: 1000000,
            },
        },
    },
    // ...
});