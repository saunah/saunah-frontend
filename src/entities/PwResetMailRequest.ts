export namespace PwResetMailRequest {
export type Request = {
    mailadress: string
}

export type RemoteRequest = {
    email: string
}

export function mapOutPasswordReset(credentials: Request): RemoteRequest {
    return {
        email: credentials.mailadress
    }
  }
}