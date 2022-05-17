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

    test('emptyRequest() returns object with only null values', () => {
        Object.values(SetNewPassword.empty()).forEach(value => expect(value).toBe(""))
    })
})