export namespace Greeting {
    export type Data = {
        id: number
        content: string
        numberOfLikes: number
        date: Date
    }

    export type DataResponse = {
        id: number
        content: string
        numberOfLikes: number
        date: string
    }

    export function mapIn(greeting: DataResponse): Data {
        return {
            id: greeting.id,
            content: greeting.content,
            numberOfLikes: greeting.numberOfLikes,
            date: new Date(greeting.date),
        }
    }

    export type Edit = {
        id: number | null
        content: string
    }

    export type EditRequest = {
        id: number | null
        content: string
    }

    export function mapOut(greeting: Edit): EditRequest {
        return greeting
    }

    export function empty(): Edit {
        return {
            id: null,
            content: '',
        }
    }

    export function mapToEdit(greeting: Data): Edit {
        return {
            id: greeting.id,
            content: greeting.content,
        }
    }
}
