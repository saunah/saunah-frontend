export namespace LoginCredentials {
    export type Request = {
        username: string
        password: string
    }

    export type RemoteRequest = {
        email: string
        password: string
    }

    export type PasswordResetRequest = {
        mailadress: string
    }

    export type RemotePasswordResetRequest = {
        email: string
    }

    export function empty(): Request {
        return {
            username: '',
            password: '',
        }
    }

    export function mapOut(credentials: Request): RemoteRequest {
        return {
            email: credentials.username,
            password: credentials.password,
        }
    }

    export function mapOutPasswordReset(credentials: PasswordResetRequest): RemotePasswordResetRequest {
        return {
            email: credentials.mailadress
        }
    }
}
