// 1. Ask for account
// 2. Check if account exists, if account doesn't exist, ask to create account
// 3. Ask what they want to do
// 4. Execute command
// a. View
// b. Withdraw
// c. Deposit

const Account = require('./Account');
const CommandLine = require('./CommandLine');

async function main() {
  const accountName = await CommandLine.ask(
    'Which account would you like to access?'
  );

  const account = await Account.find(accountName);

  if (account) {
    console.log('Account found.');
  } else {
    const createAccount = await CommandLine.ask(
      'No account found. Would you like to open an account?'
    ).then((response) => {
      CommandLine.print(response);
    });
  }
}

main();
