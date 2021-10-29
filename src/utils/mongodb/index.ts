import { Db, MongoClient, MongoClientOptions } from "mongodb"

let db: Db
let client: MongoClient

export async function getMongoClient(): Promise<MongoClient> {
    if (!process.env.MONGODB_URI) {
        throw new Error("Please add your Mongo URI to .env.local")
    }
    const uri = process.env.MONGODB_URI || ""
    const options = { useUnifiedTopology: true, useNewUrlParser: true, }
    if (process.env.NODE_ENV === "development") {
        // In development mode, use a global variable so that the value  
        // is preserved across module reloads caused by HMR (Hot Module Replacement).  
        if (!client) {
            client = new MongoClient(uri, options as MongoClientOptions)
            client = await client.connect()
        }
    } else {
        // In production mode, it's best to not use a global variable. 
        client = new MongoClient(uri, options as MongoClientOptions)
        client = await client.connect()
    }
    return client
    // Export a module-scoped MongoClient promise. By doing this in a
    // separate module, the client can be shared across functions.export default clientPromise
}

export async function getMongoDb(): Promise<Db> {
    if (!db) {
        let c = await getMongoClient()
        db = c.db(process.env.MONGODB_DATABASE)
        return db
    }
    return db
}