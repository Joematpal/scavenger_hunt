import { GameState } from "./scavengerHuntSlice"

export abstract class ScavengerHuntAPI {
    public async save(gameState: GameState): Promise<GameState> {
        return gameState
    }
    public async load(gameId: string): Promise<GameState> {
        return {} as GameState
    }
}

export class ScavengerHuntREST extends ScavengerHuntAPI {
    fetcher = fetch

    constructor(fetcher?: typeof fetch) {
        super()
        if (fetcher) {
            this.fetcher = fetcher
        }
    }

    public async save(gameState: GameState): Promise<GameState> {
        const resp = await this.fetcher(`/api/gameState/${gameState.gameId}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameState),
        })
        return await resp.json() as GameState

    }

    public async load(gameId: string): Promise<GameState> {

        const resp = await fetch(`/api/gameState/${gameId}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

        let json = await resp.json()
        
        return json as GameState
    }
}