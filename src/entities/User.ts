export namespace User {
    // This is the entity we use in the frontend
    // It can differ from the entitiy in the backend sometimes.
    // For example a date object is sent to the backend as a string
    // but we will represent it as a date object here in code
    export type Request = {
        password: string
        repeatPassword: string
        name: string
        firstname: string
        email: string
        telephone: string
        place: string
        street: string
        zip: string
    }

    // This is the user-entity, exactly the way
    // the backend expects us to send it to it
    export type RemoteRequest = {
        firstName: string
        lastName: string
        password: string
        email: string
        phoneNumber: string
        street: string
        place: string
        plz: string
    }

    // creates an empty user
    export function empty(): Request {
        return {
            name: '',
            firstname: '',
            email: '',
            telephone: '',
            street: '',
            place: '',
            zip: '',
            password: '',
            repeatPassword: '',
        }
    }

    // with this function we map out our entity which we use in the frontend
    // to the entitiy that the backend expects
    // Ideally this types are the same and we don't have to
    // map anything and can just return the same object
    export function mapOut(user: Request): RemoteRequest {
        return {
            firstName: user.firstname,
            lastName: user.name,
            password: user.password,
            email: user.email,
            phoneNumber: user.telephone,
            street: user.street,
            place: user.place,
            plz: user.zip,
        }
    }
}
