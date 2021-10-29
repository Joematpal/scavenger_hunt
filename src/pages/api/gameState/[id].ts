import type { NextApiRequest, NextApiResponse } from 'next'
import type { GameState } from "@/modules/ScavengerHunt/scavengerHuntSlice"
import { getMongoDb } from 'utils/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GameState>
) {
    let { id } = req.query
    if (Array.isArray(id)) {
        id = id[0] as string
    }
    
    console.log("api", id, req.method)
    const db = await getMongoDb()
    
    if (req.method === "POST") {
        try {
            const gameState: GameState = req.body as GameState

            gameState.lastSaved = Math.round(new Date().getTime() / 1000)
            const query = { _id: new ObjectId(id) }

            const result = await db.collection("gameState").updateOne(query, { $set: Object.assign({}, gameState, query), upsert: true })

            result
                ? res.status(200).send(gameState)
                : res.status(304).send({} as GameState)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).send({} as GameState)
        }
    }

    if (req.method === "GET") {
        try {
            const gameState: GameState = req.body as GameState
            gameState.lastSaved = Math.round(new Date().getTime() / 1000)

            const query = { _id: new ObjectId(id) }

            const result = await db.collection("gameState").findOneAndUpdate(query, {$set: Object.assign({}, gameState, query)})
            result
                ? res.status(200).send(gameState)
                : res.status(304).send({} as GameState)
        } catch (error: any) {
            console.error(error.message)
            res.status(400).send({} as GameState)
        }
    }
}
