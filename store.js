import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios';

const defaultServer = 'http://127.0.0.1:8080';

const exampleInitialState = {
    items: [],
    total_count: 0,
    server: defaultServer,
    limit: 20,
};

export const actionTypes = {
    QUERY: 'QUERY',
    SERVER: 'SERVER',
    SET_SERVER: 'SET_SERVER',
};

// export const instance = axios.create({ baseURL: 'http://127.0.0.1:8080' })

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
    switch (action.type) {
        case actionTypes.QUERY:
            return Object.assign({}, state, {
                items: action.payload.items,
                total_count: action.payload.total_count,
                limit: action.payload.limit,
            });
        case actionTypes.SERVER:
            const { server } = action.payload;
            localStorage.setItem('server', server);
            return {
                ...state,
                server,
            };
        case actionTypes.SET_SERVER:
            const { newServer } = action.payload;
            return {
                ...state,
                server: newServer || defaultServer,
            };
        default:
            return state
    }
};

// ACTIONS
export const onSearch = ({ query, offset = 0, limit = 20 }) => (dispatch, getState) => {
    const { server } = getState();
    return axios.get(`${server}/api/v1/search?query=${query}&offset=${offset}&limit=${limit}`)
        .then(({ data }) => {
            const { items, total_count } = data;
            return dispatch({ type: actionTypes.QUERY, payload: { items, total_count, limit } });
        })
        .catch(error => console.log(error));
};

export const setServer = ({ server }) => dispatch => {
    return dispatch({
        type: actionTypes.SERVER,
        payload: { server },
    });
};

export const getServer = () => dispatch => {
    const newServer = localStorage.getItem('server');
    return dispatch({
        type: actionTypes.SET_SERVER,
        payload: {newServer },
    });
};

export function initializeStore (initialState = exampleInitialState) {
    return createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}
