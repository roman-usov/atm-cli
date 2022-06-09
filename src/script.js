// Done 1. Ask for account
// Done 2. Check if account exists, if account doesn't exist, ask to create account
// In Progress 3. Ask what they want to do
// 4. Execute command
// a. View
// b. Withdraw
// c. Deposit

const Account = require('./Account');
const CommandLine = require('./CommandLine');

async function promptFindAccount() {
  const accountName = await CommandLine.ask(
    'Which account would you like to access?'
  );

  const foundAccount = await Account.find(accountName);

  return {
    accountName,
    foundAccount,
  };
}

async function promptCreateAccount(accountName) {
  const createAccountResponse = await CommandLine.ask(
    "That account doesn't exist. Would you like to create it? (yes/no)"
  );

  if (createAccountResponse === 'yes') {
    return Account.create(accountName);
  }

  return null;
}

async function promptTask(account) {
  const taskResponse = await CommandLine.ask(
    'What would you like to do? (view/withdraw/deposit)?'
  );

  if (taskResponse === 'deposit') {
    const amount = parseFloat(
      await CommandLine.ask('How much would you like to deposit?')
    );
    await account.deposit(amount);
  }
}

async function main() {
  const { accountName, foundAccount } = await promptFindAccount();

  let account = foundAccount;

  if (account === null) {
    account = await promptCreateAccount(accountName);
    console.log(account);
  }

  if (account !== null) {
    await promptTask(account);
  }
}

main();
