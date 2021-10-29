import { Satellite } from '@mui/icons-material'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../store'
import { ScavengerHuntREST } from './scavengerHuntAPI'
// import { fetchCount } from './counterAPI'

export type Level = {
    type: 'camera'
    prompt: string
    completed: boolean
}

export type GameState = {
    gameId: string
    level: number
    status: 'idle' | 'loading' | 'failed'
    lastSaved: number
    levels: { [key: number]: Level }
}

const initialState: GameState = {
    gameId: "61734110e82b19532cf47be7",
    level: 0,
    status: 'idle',
    lastSaved: 0,
    levels: {
        1: {
            type: 'camera',
            prompt: "test",
            completed: false
        }
    }
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount: number): Promise<number> => {
        // const response = await fetchCount(amount)
        // The value we return becomes the `fulfilled` action payload
        return 0
    }
)

export const save = createAsyncThunk(
    "save/async",
    async (state: GameState): Promise<GameState> => {
        const api = new ScavengerHuntREST()
        return await api.save(state)
    }
)

interface Success {
    message: string
    accuracy: number
}

interface PhotoCheck {
    gameId: string
    level: number
    formData: FormData
}

export const checkPhoto = createAsyncThunk(
    "check-photo/async",
    async ({ gameId, level, formData }: PhotoCheck): Promise<Success> => {
        let resp = await fetch(`/api/v1/photos/${gameId}/level/${level}`, {
            method: 'POST',
            body: formData
        })

        return await resp.json() as Success
    }
)

export const load = createAsyncThunk(
    "load/async",
    async (state: GameState): Promise<GameState> => {
        const api = new ScavengerHuntREST()
        return await api.load(state.gameId)
    }
)

export const start = createAsyncThunk(
    "start/async",
    async (state: GameState): Promise<GameState> => {
        const api = new ScavengerHuntREST()
        state.level = 1
        console.log("start/async")
        return await api.save(state)
    }
)

export const scavengerHuntSlice = createSlice({
    name: 'scavenger_hunt',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        increment(state) {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.level += 1
        },
        decrement(state) {
            state.level -= 1
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount(state, action: PayloadAction<number>) {
            state.level += action.payload
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.level += action.payload
            })
            .addCase(load.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(load.fulfilled, (state, action) => {
                state.status = 'idle'

                Object.assign(state, action.payload)
            })
            .addCase(save.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(save.fulfilled, (state, action) => {
                state.status = 'idle'

                Object.assign(state, action.payload)
            })
            .addCase(start.pending, (state)=> {
                state.status = 'loading'
            })
            .addCase(start.fulfilled, (state, action) => {
                state.status = 'idle'
                
                Object.assign(state, action.payload)
            })
    },
})

export const { increment, decrement, incrementByAmount } = scavengerHuntSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLevel = (state: AppState) => state.scavengerHunt.level
export const selectGameState = (state: AppState) => state.scavengerHunt

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState())
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount))
//     }
//   }

export default scavengerHuntSlice.reducer