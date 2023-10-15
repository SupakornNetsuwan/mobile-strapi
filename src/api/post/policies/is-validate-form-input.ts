/**
 * is-event-owner policy
 */

import { errors } from "@strapi/utils"
const { PolicyError } = errors;
import { Context } from "koa";


export default async (policyContext, config, { strapi }) => {
    // Add your own logic here.
    strapi.log.info('In validate-form-input policy.');
    const bodyRequest = policyContext.request.body;
    strapi.log.info(JSON.stringify(bodyRequest))
    // media is optional not required
    if(!bodyRequest.data.title) throw new PolicyError("title is required")
    if(!bodyRequest.data.content) throw new PolicyError("title is required")
    
    return true
};
