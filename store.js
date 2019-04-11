import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import Router from 'next/router'
import axios from 'axios';

const exampleInitialState = {
    items: [],
    total_count: 0,
};

export const actionTypes = {
    QUERY: 'QUERY',
    MORE: 'MORE',
};

export const instance = axios.create({ baseURL: 'http://127.0.0.1:8080' })

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
    switch (action.type) {
        case actionTypes.QUERY:
            return Object.assign({}, state, {
                items: action.payload.items,
                total_count: action.payload.total_count,
            });
        case actionTypes.MORE:
            console.log([...state.items, ...action.payload.items]);
            return Object.assign({}, state, {
                items: [...state.items, ...action.payload.items],
                total_count: action.payload.total_count,
            });
        default:
            return state
    }
};

// ACTIONS
export const onSearch = ({ query, offset = 0, limit = 20 }) => dispatch => {
    return instance.get(`/api/v1/search?query=${query}&offset=${offset}&limit=${limit}`)
        .then(({ data }) => {
            Router.push({
                pathname: '/',
                query: { search: query }
            });
            const { items, total_count } = data;
            return dispatch({ type: actionTypes.QUERY, payload: { items, total_count } });
        })
        .catch(error => console.log(error));
};

export function initializeStore (initialState = exampleInitialState) {
    return createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}
