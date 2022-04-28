export namespace LoginCredentials{

export type Edit = {
    username: string,
    password: string
}

export type EditRequest = {
    email:  string
    password : string
}

export function empty(): Edit {
    return {
        username: '',
        password: '',
    }
}

export function mapOut(credentials:Edit):EditRequest{

    return{
        email: credentials.username,
        password: credentials.password
    }
 }
}