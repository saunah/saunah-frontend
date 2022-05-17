import { SaunaImage } from '../../entities/SaunaImage'

export namespace SaunaImagesMock {
    export function simpleMock(config?: { list?: SaunaImage.Response[] }) {
        return {
            list: jest.fn(() => Promise.resolve(config?.list || [sampleResponse1])),
            add: jest.fn(() => Promise.resolve()),
            remove: jest.fn(() => Promise.resolve()),
        }
    }

    export const sampleResponse1: SaunaImage.Response = {
        id: 1,
        saunaId: 1,
        url: 'http://localhost/test-sauna-1.jpg',
    }

    export const sampleResponse2: SaunaImage.Response = {
        id: 2,
        saunaId: 2,
        url: 'http://localhost/test-sauna-2.jpg',
    }

    export const sampleResponse3: SaunaImage.Response = {
        id: 3,
        saunaId: 3,
        url: 'http://localhost/test-sauna-3.jpg',
    }

    export const sampleRemoteResponse1: SaunaImage.RemoteResponse = {
        id: 1,
        saunaId: 2,
        url: 'http://localhost/test-sauna-2.jpg',
    }
}
