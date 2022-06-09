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
    console.log(this.balance);
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
};
