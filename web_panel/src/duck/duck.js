import axios from 'axios';
import { fromJS } from 'immutable';

export const BASE_URL = '/ads/api/';

// types

export const NAMESPACE = 'config';
const FETCH_RESTRICTIONS = `${NAMESPACE}/FETCH_RESTRICTIONS`;
const FETCH_APPCATEGORIES = `${NAMESPACE}/FETCH_APPCATEGORIES`;
const FETCH_USERS = `${NAMESPACE}/FETCH_USERS`;

// reducer
const initialState = fromJS({
  restrictions: [],
  appCategories: [],
  users: []
});

export function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_RESTRICTIONS:
      return state.set('restrictions', fromJS(action.payload || {}));
    case FETCH_APPCATEGORIES:
      return state.set('appCategories', fromJS(action.payload || {}));
    case FETCH_USERS:
      return state.set('users', fromJS(action.payload || {}));
    default:
      return state;
  }
}

// actions
const restrictionsReceived = (payload) => ({
  type: FETCH_RESTRICTIONS,
  payload
});

const appCategoriesReceived = (payload) => ({
  type: FETCH_APPCATEGORIES,
  payload
});

const usersReceived = (payload) => ({
  type: FETCH_USERS,
  payload
});


// public actions

const fetchRestrictions = () => (dispatch) => {
  return axios.get(`${BASE_URL}restriction/`)
    .then((response) => dispatch(restrictionsReceived(response.data)));
}

const fetchAppCategories = () => (dispatch) => {
  return axios.get(`${BASE_URL}applicationcategories/`)
    .then((response) => dispatch(appCategoriesReceived(response.data)));
}

const fetchUsers = () => (dispatch) => {
  return axios.get(`${BASE_URL}users/`)
    .then((response) => dispatch(usersReceived(response.data)));
}

export const actions = { fetchRestrictions, fetchAppCategories, fetchUsers };

// selectors

export const getRestrictions = state => {
  return state[NAMESPACE].get('restrictions').toJS();
}

export const getAppCategories = state => {
  return state[NAMESPACE].get('appCategories').toJS();
}

export const getUsers = state => {
  return state[NAMESPACE].get('users').toJS();
}

export const selectors = { getRestrictions, getAppCategories, getUsers };
