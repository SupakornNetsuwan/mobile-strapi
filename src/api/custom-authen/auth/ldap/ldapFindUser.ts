import util from "util"
import { createClient } from 'ldapjs';
import { base, filter_fmt, url } from "./ldapConnector";
import type { FindUserType, LDAPuser } from "./types"

const findUser: FindUserType = async (username, password) => {

    const opts = {
        filter: util.format(filter_fmt, username),
        scope: "sub"
    }

    try {
        /*
         ที่ต้องใช้ Promise เพราะว่า client.search มีการเรียกใช้ callback
         เลยต้องให้มัน reject ออกมา ไม่เช่นนั้นถ้าหาก throw error
         มันจะติดอยู่ใน callback function scope
        */

        const result = new Promise((resolve, reject) => {
            const client = createClient({ url });
            console.log("------------------------\nกำลังเริ่มต้นค้นหาผู้ใช้งาน...");

            let user = {};

            client.on('connectError', (error) => {
                // Handle connection error
                return reject(error)
            })

            // @ts-ignore
            client.search(base, opts, (error, res) => {
                if (error) return reject(error)

                // @ts-ignore
                // res.on('searchRequest', (searchRequest) => console.log('searchRequest: ', searchRequest.messageId));

                /**
                * @description เมื่อเจอ User จาก LDAP search จะแสดงที่นี่
                */
                // @ts-ignore
                res.on('searchEntry', (entry) => user = entry);

                /**
                * @description เมื่อค้นหาแล้วเกิด Error เกิดขึ้น
                */
                // @ts-ignore
                res.on('error', (error) => {
                    // console.error('error: ' + error.message);
                    return reject(error)
                });

                /**
                * @description จบการทำงาน result.status ควรจะเท่ากับ 0
                */
                // @ts-ignore
                res.on('end', (result) => {
                    console.log(result.status === 0 ? "ปิดการค้นหาด้วยสถนะปกติ (status = 0) " : "มีปัญหาเกิดขึ้นระหว่าง client.search");
                    if (!Object.keys(user).length) return reject(new Error("User not found"))

                    // ตรวจสอบว่า Password ถูกต้อง หรือ ไม่
                    // @ts-ignore
                    client.bind(user?.dn.toString(), password, (error) => {
                        if (error) return reject(error)
                        console.log("Authenticate user ผ่านแล้ว🎉...")
                        // @ts-ignore
                        if (user?.pojo) return resolve(user?.pojo)
                        client.unbind();
                        client.destroy();
                    });
                });
            });
        })

        const searchResult = (await result) as LDAPuser

        // ข้อมูลผู้ใช้จาก LDAP เช่น
        // 
        // LDAPid: '64070108',
        // LDAPemail: '64070108@kmitl.ac.th',
        // LDAPfullname: 'Supakorn Netsuwan',
        // LDAPdepartment: 'it_inf',

        const LDAPdepartment = searchResult.attributes[0].values[0]
        const LDAPemail = searchResult.attributes[4].values[0]
        const LDAPid = searchResult.attributes[5].values[0]
        const LDAPfullname = searchResult.attributes[7].values[0]

        return { department: LDAPdepartment, email: LDAPemail, fullname: LDAPfullname, id: LDAPid }
    } catch (error) {

        // error เป็น error จริงๆ - ควรจะเป็น Default case
        if (error instanceof Error) throw error

        // error เป็น string ธรรมดา
        if (typeof error === "string") throw new Error(error.toString())

        // error เป็น object ธรรมดา - ทำให้เราไม่รู้ object structure ภายใน
        if (error instanceof Object) throw new Error(JSON.stringify(error))

        throw new Error("Unknown error")
    }
}

export default findUser