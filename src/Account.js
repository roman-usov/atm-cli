const FileSystem = require('./FileSystem');
// const test = require('/src/accounts/Kyle.txt')

module.exports = class Account {
  #name;

  #balance;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get balance() {
    return this.#balance;
  }

  get filePath() {
    return `accounts/${this.name}.txt`;
  }

  async #load() {
    this.#balance = parseFloat(await FileSystem.read(this.filePath));
  }

  async #updateBalance(amount) {
    try {
      await FileSystem.write(this.filePath, amount);
      this.#balance = amount;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async find(accountName) {
    const account = new Account(accountName);

    try {
      await account.#load();
      return account;
    } catch (e) {
      return null;
    }
  }

  static async create(accountName) {
    const account = new Account(accountName);

    try {
      await FileSystem.write(account.filePath, 0);

      account.#balance = 0;

      return account;
    } catch (err) {
      return null;
    }
  }

  async deposit(amount) {
    const newAmount = this.#balance + amount;
    return this.#updateBalance(newAmount);

    // try {
    //   await FileSystem.write(this.filePath, newAmount);
    //   this.#balance = newAmount;
    // } catch (err) {
    //   console.error(err);
    // }
  }

  async withdraw(amount) {
    const newAmount = this.#balance - amount;
    return this.#updateBalance(newAmount);

    // try {
    //   await FileSystem.write(this.filePath, newAmount);
    //   this.#balance = newAmount;
    // } catch (err) {
    //   console.error(err);
    // }
  }
};
