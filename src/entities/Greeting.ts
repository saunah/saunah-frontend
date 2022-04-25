export type Greeting = {
    name: string
    content: string
}

export type GreetingResponse = Greeting

export function mapInGreeting(greeting: GreetingResponse): Greeting {
    return greeting
}
