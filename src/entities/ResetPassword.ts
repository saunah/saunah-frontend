export namespace ResetPassword {
    export type Request = {
        email: string
    }

    export type RemoteRequest = {
        email: string
    }

    export function emptyRequest(): Request {
        return {
            email: '',
        }
    }

    export function mapOut(credentials: Request): RemoteRequest {
        return {
            email: credentials.email,
        }
    }
}
