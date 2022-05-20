import { UserMock } from '../networking/api/user.mock'
import { ResetPassword } from './ResetPassword'

describe('ResetPassword', () => {
    test('mapOut', () => {
        const remoteRequest = ResetPassword.mapOut(UserMock.sampleResetRequest)
        expect(remoteRequest.email).toEqual(UserMock.sampleResetRequest.email)
    })
})
