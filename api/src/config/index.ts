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

interface Config {
    mongo: {
        url: string
    }
}

const config: Config = {
    mongo: {
        url: parsedEnv.MONGO_URL as string
    }
}

export default config;