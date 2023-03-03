import { createAction, createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions';
import { NewsItem } from '../screens/NewsListScreen';

// export type NewsAction = ActionType<typeof actions>;
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

const getNewsListRequest = createAction(actions.GET_NEWS_LIST_REQUEST);
const getNewsListSuccess = createAction<{ items: NewsItem[] }>(actions.GET_NEWS_LIST_SUCCESS);
const getNewsListFailure = createAction(actions.GET_NEWS_LIST_FAILURE);
const clipNewsItem = createAction<{ item: NewsItem }>(actions.CLIP_NEWS_ITEM);
const clippedTabFocus = createAction(actions.CLIPPED_TAB_FOCUS);
const clipItemReset = createAction<{ savedItems: NewsItem[] }>(actions.CLIP_ITEM_RESET);

export const newsReducer = createReducer(initialState, builder => {
    builder
        .addCase(getNewsListRequest, state => {
            return { ...state, loading: false };
        })
        .addCase(getNewsListSuccess, (state, action) => {
            return { ...state, loading: false, newsList: action.payload.items };
        })
        .addCase(getNewsListFailure, state => {
            return { ...state, loading: false };
        })
        .addCase(clipNewsItem, (state, action) => {
            const hasFavoriteList =
                state.favoriteNews.filter(item => item.link === action.payload.item.link).length > 0;
            if (hasFavoriteList) {
                return {
                    ...state,
                    favoriteNews: state.favoriteNews.filter(item => item.link !== action.payload.item.link),
                };
            }

            return {
                ...state,
                favoriteNews: [...state.favoriteNews, action.payload.item],
            };
        })
        .addCase(clippedTabFocus, state => {
            return {
                ...state,
                isInitFocusTabOnce: true,
            };
        })
        .addCase(clipItemReset, (state, action) => {
            return {
                ...state,
                favoriteNews: action.payload.savedItems,
            };
        })
        .addDefaultCase(state => {
            return {
                ...state,
            };
        });
});
