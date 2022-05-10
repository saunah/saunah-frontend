export namespace SetNewPassword {
    export type Request = {
        mailadress: string,
        resetToken: string,
        newPassword: string,
    }

    export type RemoteRequest = {
        email: string,
        resetToken: string,
        newPassword: string,
    }

    export function empty() : Request {
        return{
            mailadress: '',
            resetToken: '',
            newPassword: '',
        }
    }

    export function mapOut(credentials: Request): RemoteRequest {
        return {
            email: credentials.mailadress,
            resetToken: credentials.resetToken,
            newPassword: credentials.newPassword
        }
    }
}