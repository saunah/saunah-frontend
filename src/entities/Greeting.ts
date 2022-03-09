export type Greeting = {
    id: number
    content: string
}

export type GreetingResponse = Greeting

export function mapInGreeting(greeting: GreetingResponse): Greeting {
    return greeting
}
