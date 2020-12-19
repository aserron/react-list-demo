import { combineReducers } from 'redux'


import usersReducer from './features/users/usersSlice'
// import filtersReducer from './features/filters/filtersSlice'

export default function rootReducer(state = {}, action) {
    // always return a new object for the root state
    return {
        // the value of `state.todos` is whatever the todos reducer returns
        todos: usersReducer(state.users, action),
        // For both reducers, we only pass in their slice of the state
        // filters: filtersReducer(state.filters, action)
    }
}