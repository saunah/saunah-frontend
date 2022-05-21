import { AxiosError } from 'axios'
import moment, { Moment } from 'moment'

export namespace SaunahError {
    export type Response = {
        timestamp: Moment
        status: number
        message: string
    }

    export type RemoteResponse = {
        timestamp: string
        status: number
        error: string
    }

    export function isRemoteResponse(object: unknown): object is RemoteResponse {
        const error = object as RemoteResponse
        return (
            error != null &&
            typeof error.timestamp === 'string' &&
            typeof error.status === 'number' &&
            typeof error.error === 'string'
        )
    }

    export function mapIn(error: unknown): Response {
        if (!isRemoteResponse(error))
            throw new Error('Object could not be mapped in. It is not of type RemoteResponse.')

        return {
            timestamp: moment(error.timestamp),
            status: error.status,
            message: error.error,
        }
    }
}

export type AxiosSaunahError = AxiosError<SaunahError.RemoteResponse>

export function isAxiosSaunahError(object: unknown): object is AxiosSaunahError {
    const error = object as AxiosError | null
    return (error?.isAxiosError || false) && SaunahError.isRemoteResponse(error?.response?.data)
}
