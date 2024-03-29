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

/* async function promptTask(account) {
  const taskResponse = await CommandLine.ask(
    'What would you like to do? (view/withdraw/deposit)?'
  );

  if (taskResponse === 'deposit') {
    const amount = parseFloat(
      await CommandLine.ask('How much would you like to deposit?')
    );
    await account.deposit(amount);
  }

  if (taskResponse === 'withdraw') {
    const amount = parseFloat(
      await CommandLine.ask('How much would you like to withdraw?')
    );

    if (account.balance < amount) {
      CommandLine.print(
        `You don't have enough money on your account. The current balance is ${account.balance}.`
      );
      await promptTask(account);
    } else {
      await account.withdraw(amount);
    }
  }
  CommandLine.print(`Your balance is ${account.balance}.`);
} */

async function promptTask(account) {
  const response = await CommandLine.ask(
    'What would you like to do? (view/deposit/withdraw)'
  );

  if (response === 'deposit') {
    const amount = parseFloat(await CommandLine.ask('How much?'));

    await account.deposit(amount);
  } else if (response === 'withdraw') {
    const amount = parseFloat(await CommandLine.ask('How much?'));

    try {
      await account.withdraw(amount);
    } catch (e) {
      CommandLine.print(
        'We were unable to make the withdrawal. Please ensure you have enough money in your account.'
      );
    }
  }

  CommandLine.print(`Your balance is ${account.balance}`);
}

async function main() {
  try {
    const { accountName, foundAccount } = await promptFindAccount();

    let account = foundAccount;

    if (account === null) {
      account = await promptCreateAccount(accountName);
    }

    if (account !== null) {
      await promptTask(account);
    }
  } catch (err) {
    CommandLine.print('ERROR: Please, try again.');
  }
}

main();
