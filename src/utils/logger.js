import chalk from 'chalk';
import { format, transports, createLogger } from 'winston';
import util from 'util';

export const error = chalk.bold.red;
export const warning = chalk.keyword('orange');
export const success = chalk.green;

export function log(...msg) {
  logger.info(util.format(...msg));
}

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [new transports.Console(),
    new transports.File({ filename: 'log.log' })],
});

