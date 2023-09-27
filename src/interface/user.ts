export interface User {
    id: number;
    name: string;
    email: string;
    type: string;
}

export interface TokenPayload {
    id: number;
    username: string;
    email: string;
}