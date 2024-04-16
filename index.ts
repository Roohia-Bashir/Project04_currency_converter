#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

const exchangeRates: { [currency: string]: number } = {
    "USD": 1,
    "PKR": 278.23,
    "AED": 3.67,
    "INR": 83.37,
    "EUR": 0.85, 
    "GBP": 0.73, 
};

const currencyChoices = Object.keys(exchangeRates);

let isContinue = true;

do {
    const userAnswers = await inquirer.prompt([
        {
            type: "list",
            name: "fromCurrency",
            message: "\nSelect the currency you're converting from:",
            choices: currencyChoices
        },
        {
            type: "list",
            name: "toCurrency",
            message: "\nSelect the currency you're converting to:",
            choices: currencyChoices
        },
        {
            type: "number",
            name: "amount",
            message: "\nEnter the amount you want to convert:"
        }
    ]);

    const convertedAmount = Number((exchangeRates[userAnswers.toCurrency] / exchangeRates[userAnswers.fromCurrency] * userAnswers.amount).toFixed(2));

    console.log(chalk.green.bold(`\n\tConverted amount: ${convertedAmount} ${userAnswers.toCurrency} 💱`));

    const reverseConvertedAmount = Number((exchangeRates[userAnswers.fromCurrency] / exchangeRates[userAnswers.toCurrency] * convertedAmount).toFixed(2));
    console.log(chalk.yellow(`\tReverse converted amount: ${reverseConvertedAmount} ${userAnswers.fromCurrency} 💱`));

    const exchangeRate = exchangeRates[userAnswers.toCurrency] / exchangeRates[userAnswers.fromCurrency];
    console.log(chalk.blue(`\tExchange rate: 1 ${userAnswers.fromCurrency} = ${exchangeRate.toFixed(4)} ${userAnswers.toCurrency}`));

    const userContinue = await inquirer.prompt([{
        type: "confirm",
        name: "continueAns",
        message: "\nDo you want to continue?"
    }]);

    if (userContinue.continueAns === false) {
        isContinue = false;
    }

} while (isContinue === true);

console.log(chalk.magenta("\n\tGoodbye! Have a great day! 😊"));