export namespace PwResetMailRequest {
    export type Request = {
        mailadress: string
    }

    export type RemoteRequest = {
        email: string
    }

    export function empty() : Request {
        return{
            mailadress: '',
        }
    }

    export function mapOut(credentials: Request): RemoteRequest {
        return {
            email: credentials.mailadress
        }
    }
}