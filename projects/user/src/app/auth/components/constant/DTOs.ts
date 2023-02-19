export interface CreateAccount{
    username:string,
    password:string,
    role:string,
    email:string
}
export interface Login{
    password:string,
    role:string,
    email:string
}