import { users } from '../coustomModule/models/users'
import { utils } from "../coustomModule/controller/utils";
import * as userService from '../coustomModule/services/userService'


jest.mock('../coustomModule/services/userService');
const usermodule = userService as jest.Mocked<typeof userService>;

describe('user controller', () => {

    beforeEach(() => {
        usermodule.registerUser.mockReset();
        usermodule.getAllUser.mockReset();
    })

    test('registerUser', () => {

        const userMock: users = {
            id: 1,
            fName: 'arpit',
            lName: 'srivastav',
            mName: '',
            email: 'mearpit015'
        }

        const result = userService.registerUser(userMock);

        expect(userService.registerUser).toBeCalledWith(userMock); /// expected userMock same response

        expect(userService.registerUser).not.toBeCalledWith('erorr');
        expect(result).toBe(undefined);
    })

    test('get user', () => {
        const getUserMock: users[] = [{
            id: 1,
            fName: 'arpit',
            lName: 'srivastav',
            mName: '',
            email: 'mearpit015'
        }]

        const addUserMock: users = {
            id: 1,
            fName: 'arpit',
            lName: 'srivastav',
            mName: '',
            email: 'mearpit015'
        }

        usermodule.getAllUser.mockReturnValue(getUserMock);

        const result = userService.getAllUser(); // expected undefined
        expect(userService.getAllUser).not.toBe('erorr');
        console.log(result)
        expect(result).toBe(getUserMock);
        expect(result).not.toBe('erorr');
    })

    test('utils', () => {
        let ut = new utils();
        expect(ut.printReverse('arpits')).toBe('stipra');
    })
})