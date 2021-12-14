import { combineReducers } from 'redux'
import authReducer from './auth-reducer'
import { materialReducer } from './material-reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    material: materialReducer
})

export default rootReducer
