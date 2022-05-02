import { SaunaImage } from './SaunaImage'

const testRemoteResponse: SaunaImage.RemoteResponse = {
    id: 1,
    saunaId: 2,
    fileName: 'file-3',
}

describe('SaunaImage', () => {
    test('isRemoveResponse() works correctly', () => {
        expect(SaunaImage.isRemoteResponse(testRemoteResponse)).toBe(true)
        expect(SaunaImage.isRemoteResponse(null)).toBe(false)
        expect(SaunaImage.isRemoteResponse({})).toBe(false)
        Object.keys(testRemoteResponse).forEach(key => {
            expect(SaunaImage.isRemoteResponse({ ...testRemoteResponse, [key]: undefined })).toBe(false)
        })
    })

    test('mapIn() only works with correct input entity', () => {
        expect(SaunaImage.mapIn(testRemoteResponse)).toBeTruthy()
        expect(() => SaunaImage.mapIn({})).toThrow()
    })
})
