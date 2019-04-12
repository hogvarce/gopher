import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const defaultServer = 'http://127.0.0.1:8080';

const initialState = {
    items: [],
    total_items: 0,
    limit: 20,
};

export const actionTypes = {
    QUERY: 'QUERY',
    SERVER: 'SERVER',
    SET_SERVER: 'SET_SERVER',
    SEARCH_MOVIES: 'SEARCH_MOVIES',
};

// REDUCERS
export const search = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.QUERY:
            return Object.assign({}, state, {
                items: action.payload.items,
                total_items: action.payload.total_items,
                limit: action.payload.limit,
            });
        default:
            return state
    }
};

export const server = (state = { url: defaultServer }, action) => {
    switch (action.type) {
        case actionTypes.SERVER:
            const { server } = action.payload;
            localStorage.setItem('server', server);
            return {
                ...state,
                url: server,
            };
        case actionTypes.SET_SERVER:
            const { newServer } = action.payload;
            return {
                ...state,
                url: newServer || defaultServer,
            };
        default:
            return state
    }
};

export const movies = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_MOVIES:
            return Object.assign({}, state, {
                items: action.payload.items,
                total_items: action.payload.total_items,
                limit: action.payload.limit,
            });
        default:
            return state
    }
};

// ACTIONS
export const onSearch = ({ query, offset = 0, limit = 20 }) => (dispatch, getState) => {
    const { server: { url } } = getState();
    return axios.get(`${url}/api/v1/search?query=${query}&offset=${offset}&limit=${limit}`)
        .then(({ data }) => {
            const { items, total_items } = data;
            return dispatch({ type: actionTypes.QUERY, payload: { items, total_items, limit } });
        })
        .catch(error => console.log(error));
};

export const onSearchMovies = ({ offset = 0, limit = 20, genres = [] }) => (dispatch, getState) => {
    let genresQuery = '';
    if (genres.length)
        genres.forEach(genre => genresQuery += `&genres=${genre}`);
    const { server: { url } } = getState();
    return axios.get(`${url}/api/v1/media_items?offset=${offset}&limit=${limit}${genresQuery}`)
        .then(({ data }) => {
            const { items, total_items } = data;
            return dispatch({ type: actionTypes.SEARCH_MOVIES, payload: { items, total_items, limit } });
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
        payload: { newServer },
    });
};

export function initializeStore (initialState = initialState) {
    return createStore(
        combineReducers({ search, server, movies }),
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}
