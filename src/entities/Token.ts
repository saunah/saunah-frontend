export namespace Token {
    export type Response = {
        token: string
    }

    export type RemoteResponse = Response

    export function isRemoteResponse(object: unknown): object is RemoteResponse {
        const token = object as RemoteResponse
        return token != null && typeof token.token === 'string'
    }

    export function mapIn(token: unknown): Response {
        if (!isRemoteResponse(token))
            throw new Error(`Object could not be mapped in. It is not of type RemoteResponse.`)
        return token
    }
}
