import { SaunaImage } from '../../entities/SaunaImage'

export namespace SaunaImagesMock {
    export function simpleMock(config?: { list?: SaunaImage.Response[] }) {
        return {
            list: jest.fn(() => Promise.resolve(config?.list || [sampleResponse1])),
            add: jest.fn(() => Promise.resolve()),
            remove: jest.fn(() => Promise.resolve()),
        }
    }

    const sampleResponse1: SaunaImage.Response = {
        id: 1,
        saunaId: 1,
        fileName: 'test-sauna-1',
    }
}
