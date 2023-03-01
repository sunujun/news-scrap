import { createAsyncAction } from 'typesafe-actions';
import { Dispatch } from 'redux';

export const GET_NEWS_LIST_REQUEST = 'GET_NEWS_LIST_REQUEST' as const;
export const GET_NEWS_LIST_SUCCESS = 'GET_NEWS_LIST_SUCCESS' as const;
export const GET_NEWS_LIST_FAILURE = 'GET_NEWS_LIST_FAILURE' as const;

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
