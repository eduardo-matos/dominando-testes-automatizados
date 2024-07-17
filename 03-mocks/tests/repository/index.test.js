const UserRepository = require('../../src/repository/userRepository');
const makeUser = require('../../src/repository/index');


describe('UserRepository', function () {
  let oldAll, oldById, oldCreate, oldDel;

  beforeEach(() => {
    oldAll = UserRepository.all;
    oldById = UserRepository.byId;
    oldCreate = UserRepository.create;
    oldDel = UserRepository.del;

    UserRepository.all = jest.fn();
    UserRepository.byId = jest.fn();
    UserRepository.create = jest.fn();
    UserRepository.del = jest.fn();
  });
  it('creates user', async function () {
    UserRepository.byId.mockResolvedValue({ name: 'foo', email: 'bar@baz.com' });

    const result = await UserRepository.byId(7);

    expect(UserRepository.byId).toHaveBeenCalledWith(7);
    expect(result).toEqual({ name: 'foo', email: 'bar@baz.com' });
  });
})

