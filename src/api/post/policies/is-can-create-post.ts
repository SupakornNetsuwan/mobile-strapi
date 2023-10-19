/**
 * is-can-create-post policy
 */
import { errors } from "@strapi/utils"
const { PolicyError } = errors;

// policy เช็คว่ามีeventsให้โพสต์หรือป่าวและแนบeventที่ต้องการสร้างโพสต์มาด้วยหรือป่าว
// add type Context to policyContext to accessors and aliases
import type { Context } from "koa";

export default async (policyContext, config, { strapi:Strapi }) => {
    return true
};