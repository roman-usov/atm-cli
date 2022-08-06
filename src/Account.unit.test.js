const FileSystem = require('./FileSystem');
const Account = require('./Account');

beforeEach(() => {
  jest.restoreAllMocks();
});

async function createAccount(name, balance) {
  const spy = jest
    .spyOn(FileSystem, 'read')
    .mockResolvedValueOnce(Promise.resolve(balance));

  const account = await Account.find(name);

  spy.mockRestore();

  return account;
}

describe('#deposit', () => {
  test('it adds money to the account', async () => {
    // create a spy to fake the FileSystem class
    const spy = jest
      .spyOn(FileSystem, 'write')
      .mockReturnValue(Promise.resolve());

    // create a starting balance
    const startingBalance = 5;

    // create an account with a name and balance
    const account = await createAccount('Kyle', startingBalance);

    // call the deposit method
    const amount = 10;
    await account.deposit(amount);

    // check the balance of the account
    const expectedBalanceAfterDeposit = startingBalance + amount;
    expect(account.balance).toBe(expectedBalanceAfterDeposit);

    // check the correct amount is written to the correct file

    expect(spy).toBeCalledWith(account.filePath, expectedBalanceAfterDeposit);
  });
});

describe('#withdraw', () => {
  describe('with enough money on the account', () => {
    test('it removes money from the account', async () => {
      // create a spy to fake the FileSystem class
      const spy = jest
        .spyOn(FileSystem, 'write')
        .mockReturnValue(Promise.resolve());

      // create a starting balance
      const startingBalance = 15;

      // create an account with a name and balance
      const account = await createAccount('Kyle', startingBalance);

      // call the deposit method
      const amount = 5;
      await account.withdraw(amount);

      // check the balance of the account
      const expectedBalanceAfterWithdrawal = startingBalance - amount;
      expect(account.balance).toBe(expectedBalanceAfterWithdrawal);

      // check the correct amount is written to the correct file

      expect(spy).toBeCalledWith(
        account.filePath,
        expectedBalanceAfterWithdrawal
      );
    });
  });
  describe('with not enough money on the account', () => {
    test('it should throw an error', async () => {
      // create a spy to fake the FileSystem class
      const spy = jest.spyOn(FileSystem, 'write');

      // create a starting balance
      const startingBalance = 5;

      // create an account with a name and balance
      const account = await createAccount('Kyle', startingBalance);

      // call the deposit method
      const amount = 10;
      await expect(account.withdraw(amount)).rejects.toThrow();

      // check the balance of the account
      expect(account.balance).toBe(startingBalance);

      // check the correct amount is written to the correct file

      expect(spy).not.toBeCalledWith();
    });
  });
});
