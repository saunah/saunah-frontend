import { UserMock } from '../networking/api/user.mock'
import { NewPassword } from './NewPassword'

describe('NewPassword', () => {
    test('mapOut', () => {
        const remoteRequest = NewPassword.mapOut(UserMock.sampleNewPasswordRequest)
        expect(remoteRequest.newPassword).toEqual(UserMock.sampleNewPasswordRequest.newPassword)
    })

    test('emptyRequest() returns object with empty values', () => {
        expect(NewPassword.emptyRequest().newPassword).toBe('')
    })
})
