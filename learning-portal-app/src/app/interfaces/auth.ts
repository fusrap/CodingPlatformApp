export interface RegisterPostData {
    fullName: string;
    email: string;
    password: string;
    role: string;
}

export interface User extends RegisterPostData {
    id: string;
}