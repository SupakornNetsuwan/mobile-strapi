
class CustomError extends Error {

    public constructor(payload: string | Error | Object) {
        if (payload instanceof Error) {
            super(payload.message);
            Object.setPrototypeOf(this, CustomError.prototype);
            this.name = payload.name;
            strapi.log.warn(payload.message)
            return
        }

        if (typeof payload === 'string') {
            super(payload)
            Object.setPrototypeOf(this, CustomError.prototype);
            this.name = "Custom error 🚨";
            strapi.log.warn(payload)
            return
        }

        if (payload instanceof Object) {
            super(JSON.stringify(payload));
            Object.setPrototypeOf(this, CustomError.prototype);
            this.name = "Unknown error 🚨";
            strapi.log.warn(payload)
            return
        }
    }
    
}

export default CustomError