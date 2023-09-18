export type LDAPuser = {
    messageId: number;
    protocolOp: number;
    type: string;
    objectName: string;
    attributes: {
        type: string;
        values: string[];
    }[];
    controls: any[];
}

export type User = {
    department: string;
    id: string;
    email: string;
    fullname: string;
}

export type FindUserType = (username: string, password: string) => Promise<User>