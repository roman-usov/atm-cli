const fs = require('fs');
const path = require('path');
const Account = require('./Account');

beforeEach(() => {
  const dirPath = path.join(__dirname, 'accounts');
  try {
    fs.mkdirSync(dirPath);
  } catch (e) {
    // ignore error since folder already exists
  }
});

afterEach(() => {
  const dirPath = path.join(__dirname, 'accounts');
  fs.rmSync(dirPath, { recursive: true, force: true });
});

describe('.create', () => {
  test('it creates a new account and file', async () => {
    const name = 'Kyle';
    // Create an account
    const account = await Account.create(name);

    // Check the name is correct
    expect(account.name).toBe(name);

    // Check the balance
    expect(account.balance).toBe(0);

    // Check a file was created
    const filePath = path.join(__dirname, account.filePath);
    expect(fs.readFileSync(filePath).toString()).toBe('0');
  });
});

describe('.find', () => {
  describe('when there is an account', () => {
    test('it finds an existing account', async () => {
      const name = 'kyle';
      const balance = 10;

      // create an account file with a balance
      const filePath = path.join(__dirname, `accounts/${name}.txt`);
      fs.writeFileSync(filePath, balance.toString());

      // find the account associated with the file
      const account = await Account.find(name);

      // check that the name of the account matches the search entry
      expect(account.name).toBe(name);

      // check that the balance of the account matches the expected value
      expect(account.balance).toBe(balance);
    });
  });

  describe('when there is no account', () => {
    test('it returns null', async () => {
      const name = 'kyle';

      // find the account associated with the file
      const account = await Account.find(name);

      // check that the name of the account matches the search entry
      expect(account).toBeNull();
    });
  });
});
