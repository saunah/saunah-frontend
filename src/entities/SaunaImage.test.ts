import { SaunaImagesMock } from '../networking/api/saunaImages.mock'
import { SaunaImage } from './SaunaImage'

describe('SaunaImage', () => {
    test('isRemoveResponse() works correctly', () => {
        expect(SaunaImage.isRemoteResponse(SaunaImagesMock.sampleRemoteResponse1)).toBe(true)
        expect(SaunaImage.isRemoteResponse(null)).toBe(false)
        expect(SaunaImage.isRemoteResponse({})).toBe(false)
        Object.keys(SaunaImagesMock.sampleRemoteResponse1).forEach(key => {
            expect(SaunaImage.isRemoteResponse({ ...SaunaImagesMock.sampleRemoteResponse1, [key]: undefined })).toBe(
                false
            )
        })
    })

    test('mapIn() only works with correct input entity', () => {
        expect(SaunaImage.mapIn(SaunaImagesMock.sampleRemoteResponse1)).toBeTruthy()
        expect(() => SaunaImage.mapIn({})).toThrow()
    })
})
