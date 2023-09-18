import { errors } from "@strapi/utils"

const { PolicyError } = errors

/**
 * ทำการตรวจสอบว่า input มาครบมั้ย
 */

export default (policyContext, config, { strapi }) => {
  // Add your own logic here.
  const { identifier, password } = policyContext.request.body

  if (!identifier) throw new PolicyError("Identifier is required")
  if (!password) throw new PolicyError("Password is required")

  return true;
};
