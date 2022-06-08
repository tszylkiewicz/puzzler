import { load } from 'dotenv-extended'
import dotenvParseVariables from 'dotenv-parse-variables'

const env = load({
    path: process.env.ENV_FILE,
    defaults: './config/.env.defaults',
    schema: './config/.env.schema',
    includeProcessEnv: true,
    silent: false,
    errorOnMissing: true,
    errorOnExtra: true
})

const parsedEnv = dotenvParseVariables(env)

type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'

interface Config {
    mongo: {
        url: string
    },
    loggerLevel: LogLevel
}

const config: Config = {
    mongo: {
        url: parsedEnv.MONGO_URL as string
    },
    loggerLevel: parsedEnv.LOGGER_LEVEL as LogLevel
}

export default config;