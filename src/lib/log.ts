/**
 *
 * ref: https://github.com/winstonjs/winston#usage
 */
import winston, { format } from 'winston'

const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`
})

winston.addColors({
	silly: 'magenta',
	debug: 'blue',
	verbose: 'cyan',
	info: 'green',
	warn: 'yellow',
	error: 'red',
})


export const log = winston.createLogger({
	level: 'debug',
	format: combine(
		timestamp(),
		myFormat,
	),
	defaultMeta: { module: 'default' },
	transports: [
		
		//
		// - Write all logs with importance level of `error` or less to `error.log`
		// - Write all logs with importance level of `info` or less to `combined.log`
		//
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'combined.log' }),
	],
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
	log.add(new winston.transports.Console({
		level: 'info',
		format: combine(
			winston.format.colorize(), // colorize 要在前面！
			winston.format.simple(),
		),
	}))
}
