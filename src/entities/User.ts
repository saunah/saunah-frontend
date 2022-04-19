export namespace User{
    export type Edit = {
        username: string
        password: string
    }

    export type EditRequest = {
        email: string
        password: string
    }

    export function empty(): Edit{
        return {
            username: '',
            password: '',
        }
    }

    export function mapOut(user: Edit): EditRequest{
        return {
            email: user.username,
            password: user.password
        }
    }
}