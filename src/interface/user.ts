export interface User {
    id: number;
    name: string;
    email: string;
    companyId?: number;
    type: string;
}

export interface TokenPayload {
    id: number;
    username: string;
    email: string;
}