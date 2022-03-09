import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Greeting = {
    id: number
    content: string
}

const Test = () => {
    const [greeting, setGreeting] = useState<Greeting>()

    useEffect(() => {
        axios
            .get('http://localhost:8080/Housemate Richard')
            .then(response => {
                const responseGreeting = response.data as Greeting
                setGreeting(responseGreeting)
            })
            .catch(() => {
                setGreeting({ id: 0, content: 'Nobody is here...' })
            })
    }, [])

    return <p className="text-3xl font-semibold ">{greeting?.content}</p>
}

export default Test
