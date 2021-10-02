import { users } from "../coustomModule/models/users";

export const mockUserService = jest.fn();
const userMock : users = {
    id: 1,
    fName: 'arpit',
    lName: 'srivastav',
    mName: '',
    email: 'mearpit015'
}
const mock = jest.fn().mockImplementation(() => {
  return {registerUser: mockUserService};
});

export default mock;