import chalk from "chalk";
import dedent from "dedent-js";

const printError = async (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = async (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = async () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для сохранения токена`
    );
};

export {printError, printHelp, printSuccess};

