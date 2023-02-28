const defaultNewsReducer = {
    favoriteNews: [],
    newsList: [],
    loading: false,
    isInitFocusTabOnce: false,
};

export const newsReducer = (state = defaultNewsReducer, action) => {
    switch (action.type) {
    }

    return {
        ...state,
    };
};
