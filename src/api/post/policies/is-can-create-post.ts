/**
 * is-can-create-post policy
 */
import { errors } from "@strapi/utils"
const { PolicyError } = errors;

// policy เช็คว่ามีeventsให้โพสต์หรือป่าวและแนบeventที่ต้องการสร้างโพสต์มาด้วยหรือป่าว
// add type Context to policyContext to accessors and aliases
import type { Context } from "koa";

export default async (policyContext, config, { strapi:Strapi }) => {
    // Add your own logic here.
    strapi.log.info('In is-can-create-post.');

    const {user} =  policyContext.state;
    const { params } = policyContext;

    //Post Method : localhost:1337/api/posts/5
    const bodyRequest = policyContext.request.body;
    const event_id = bodyRequest.data.event
    // check ว่า มี event id มาด้วยไหม
    if (event_id){
      // ค้นหา event จาก event_id
      const event = await strapi.db.query('api::event.event').findOne({
        where:{
          id: event_id,
        },

      }) 
      // check if event is existing
      if (event){
        return true;
      }
      else{
        throw new PolicyError('ไม่มี event ที่จะสร้างโพสต์', { policy: 'is-can-create-post' })
      }
    }else{
      throw new PolicyError('คุณไม่ได้แนบอีเวนต์ไอดีมาด้วย', { policy: 'is-can-create-post' })
    }

};