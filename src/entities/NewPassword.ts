export namespace NewPassword {
    export type Request = {
        newPassword: string
    }

    export type RemoteRequest = {
        newPassword: string
    }

    export function emptyRequest(): Request {
        return {
            newPassword: '',
        }
    }

    export function mapOut(credentials: Request): RemoteRequest {
        return {
            newPassword: credentials.newPassword,
        }
    }
}
