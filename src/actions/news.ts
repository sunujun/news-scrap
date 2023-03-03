import { createAsyncAction } from 'typesafe-actions';
import { Dispatch } from 'redux';
import { NewsItem } from '../screens/NewsListScreen';
import { getItem, setItem } from '../utils/asyncStorageUtils';
import { RootState } from '../store/store';

export const STORAGE_KEY = '@MAIN/NEWS_LIST/FAVORITE';

export const GET_NEWS_LIST_REQUEST = 'GET_NEWS_LIST_REQUEST' as const;
export const GET_NEWS_LIST_SUCCESS = 'GET_NEWS_LIST_SUCCESS' as const;
export const GET_NEWS_LIST_FAILURE = 'GET_NEWS_LIST_FAILURE' as const;

export const CLIP_NEWS_ITEM = 'CLIP_NEWS_ITEM';
export const CLIPPED_TAB_FOCUS = 'CLIPPED_TAB_FOCUS';

export const CLIP_ITEM_RESET = 'CLIP_ITEM_RESET';

export const getNewsListAsync = createAsyncAction(GET_NEWS_LIST_REQUEST, GET_NEWS_LIST_SUCCESS, GET_NEWS_LIST_FAILURE)<
    undefined,
    any,
    any
>();

export const getNewsList = (query: string) => {
    return (dispatch: Dispatch) => {
        // client id : IwtpAQPCMR_z7z67ce4e
        // client secret : zDOSWMqbrt
        const { request, success, failure } = getNewsListAsync;
        dispatch(request());
        fetch(`https://openapi.naver.com/v1/search/news.json?query=${decodeURIComponent(query)}`, {
            headers: {
                'X-Naver-Client-Id': 'IwtpAQPCMR_z7z67ce4e',
                'X-Naver-Client-Secret': 'zDOSWMqbrt',
            },
        })
            .then(result => {
                return result.json();
            })
            .then(result => {
                dispatch(success(result));
            })
            .catch(ex => {
                dispatch(failure(ex));
            });
    };
};

export const clipNewsItem = (newsItem: NewsItem) => {
    return (dispatch: Dispatch, getState: () => RootState) => {
        dispatch({
            type: CLIP_NEWS_ITEM,
            payload: {
                item: newsItem,
            },
        });
        const lastFavoriteList = getState().news.favoriteNews;
        setItem(STORAGE_KEY, JSON.stringify(lastFavoriteList));
    };
};

export const clippedTabFocus = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        const isInitOnce = getState().news.isInitFocusTabOnce;
        dispatch({
            type: CLIPPED_TAB_FOCUS,
        });
        if (isInitOnce) {
            return;
        }
        const saveItemsString = await getItem(STORAGE_KEY);
        let savedItems;
        if (saveItemsString !== null) {
            savedItems = JSON.parse(saveItemsString);
        }
        dispatch({
            type: CLIP_ITEM_RESET,
            payload: {
                savedItems,
            },
        });
    };
};
