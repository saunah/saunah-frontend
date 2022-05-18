export namespace SaunaImage {
    export type Response = {
        id: number
        saunaId: number
        url: string
    }

    export type RemoteResponse = Response

    export function isRemoteResponse(object: unknown): object is RemoteResponse {
        const image = object as RemoteResponse
        return (
            image != null &&
            typeof image.id === 'number' &&
            typeof image.saunaId === 'number' &&
            typeof image.url === 'string'
        )
    }

    export function mapIn(image: unknown): Response {
        if (!isRemoteResponse(image))
            throw new Error('Object could not be mapped in. It is not of type SaunaImage.RemoteResponse.')
        return image
    }
}
