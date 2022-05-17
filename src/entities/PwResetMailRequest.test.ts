import { PwResetMailRequest } from "./PwResetMailRequest";

const response: PwResetMailRequest.Request = {
    mailadress: "test@test.ch"
}

describe('<PwResetMailRequest Tests>', () => {

    test('mapOut test', () => {
        expect(PwResetMailRequest.mapOut(response)).toBeTruthy()
    })
})