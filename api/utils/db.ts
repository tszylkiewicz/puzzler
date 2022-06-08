import { connect, connection, disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server'
import config from '../src/config'

class MongoDBConnection {
    private static _instance: MongoDBConnection
    private _mongoServer?: MongoMemoryServer

    static getInstance(): MongoDBConnection {
        if (!MongoDBConnection._instance) {
            MongoDBConnection._instance = new MongoDBConnection();
        }
        return MongoDBConnection._instance;
    }

    public async open(): Promise<void> {
        try {
            if (config.mongo.url === 'inmemory') {
                console.log('Connecting to in memory Mongo DB')
                this._mongoServer = await MongoMemoryServer.create();
                connect(this._mongoServer.getUri(), { dbName: "puzzler" });
            } else {
                console.log(`Connecting to Mongo DB: ${config.mongo.url}`)
                connect(config.mongo.url);
            }

            connection.on('connected', () => {
                console.info('Mongo DB connected')
            })

            connection.on('disconnected', () => {
                console.info('Mongo DB disconnected')
            })

            connection.on('error', (err) => {
                console.error(`Mongo:  ${String(err)}`)
                if (err.name === "MongoNetworkError") {
                    setTimeout(function () {
                        connect(config.mongo.url).catch(() => { })
                    }, 5000)
                }
            })
        } catch (err) {
            console.error(`db.open: ${err}`)
            throw err
        }
    }

    public async close(): Promise<void> {
        try {
            await disconnect()
            if (config.mongo.url === 'inmemory') {
                await this._mongoServer!.stop()
            }
        } catch (err) {
            console.error(`db.open: ${err}`)
            throw err
        }
    }
}

export default MongoDBConnection.getInstance()