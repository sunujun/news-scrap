import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from '../actions';
import { NewsItem } from '../screens/NewsListScreen';

export type NewsAction = ActionType<typeof actions>;
export type NewsState = {
    favoriteNews: NewsItem[];
    newsList: NewsItem[];
    loading: boolean;
    isInitFocusTabOnce: boolean;
};

const initialState: NewsState = {
    favoriteNews: [],
    newsList: [],
    loading: false,
    isInitFocusTabOnce: false,
};

export const newsReducer = createReducer<NewsState, NewsAction>(initialState, {
    [actions.GET_NEWS_LIST_REQUEST]: state => ({
        ...state,
        loading: true,
    }),
    [actions.GET_NEWS_LIST_SUCCESS]: (state, action) => ({
        ...state,
        loading: false,
        newsList: action.payload.items,
    }),
    [actions.GET_NEWS_LIST_FAILURE]: state => ({
        ...state,
        loading: false,
    }),
});
