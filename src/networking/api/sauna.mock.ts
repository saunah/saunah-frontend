import { Sauna } from '../../entities/Sauna'
import { deferred } from '../../utils/deferred'

export namespace SaunaMock {
    export function simpleMock(config?: {
        list?: Sauna.Response[]
        get?: Sauna.Response
        add?: Sauna.Response
        edit?: Sauna.Response
    }) {
        return {
            list: jest.fn(() => Promise.resolve(config?.list || [sampleResponse1])),
            get: jest.fn(() => Promise.resolve(config?.get || sampleResponse1)),
            add: jest.fn(() => Promise.resolve(config?.add || sampleResponse1)),
            edit: jest.fn(() => Promise.resolve(config?.edit || sampleResponse1)),
            remove: jest.fn(() => Promise.resolve()),
        }
    }

    export function deferredMock() {
        const listDefer = deferred<Sauna.Response[]>()
        const getDefer = deferred<Sauna.Response>()
        const addDefer = deferred<Sauna.Response>()
        const editDefer = deferred<Sauna.Response>()
        const removeDefer = deferred<void>()

        const mock = {
            list: jest.fn(() => listDefer.promise),
            get: jest.fn(() => getDefer.promise),
            add: jest.fn(() => addDefer.promise),
            edit: jest.fn(() => editDefer.promise),
            remove: jest.fn(() => removeDefer.promise),
        }

        return {
            mock,
            list: listDefer,
            get: getDefer,
            add: addDefer,
            edit: editDefer,
            remove: removeDefer,
        }
    }

    export const sampleResponse1: Sauna.Response = {
        id: 1,
        name: 'Sauna 1',
        description: 'Das ist Sauna 1.',
        price: 100000,
        maxTemp: 100,
        numberOfPeople: 10,
        street: 'Hinterstrasse 12',
        zip: 8400,
        location: 'Winterthur',
        type: 'Zeltsauna',
        mobile: false,
        googleCalendarId: '',
    }

    export const sampleRemoteResponse1: Sauna.RemoteResponse = {
        id: 12,
        name: 'Karhu',
        description: 'Nice sauna',
        price: 10,
        maxTemp: 12,
        numberOfPeople: 100,
        street: 'Hinterstrasse 12',
        zip: 8400,
        location: 'Winterthur',
        type: 'Zeltsauna',
        mobile: true,
        googleCalendarId: '',
    }
}
