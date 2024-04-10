import { AppInitialStateType, slice } from './application-reducer'
import { appActions } from '../CommonActions/App'

let startState: AppInitialStateType

const appReducer = slice.reducer
const { setAppError, setAppStatus } = appActions

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false,
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppError({ error: 'some error' }))

    expect(endState.error).toBe('some error')
})

test('correct status message should be set', () => {
    const endState = appReducer(startState, setAppStatus({ status: 'loading' }))

    expect(endState.status).toBe('loading')
})
