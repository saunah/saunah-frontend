import { SetNewPassword } from "./SetNewPassword";

const testRequest: SetNewPassword.Request = {
    mailadress: "test@test.ch",
    newPassword: "sdjlfk",
    resetToken: "aabjke",
}

describe('<SetNewPassword tests>', () => {

    test('mapOut', () =>{
        expect(SetNewPassword.mapOut(testRequest)).toBeTruthy()
    })
})