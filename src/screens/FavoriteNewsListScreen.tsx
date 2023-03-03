import React, { useCallback, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { clippedTabFocus } from '../actions';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { Typography } from '../components/Typography';
import { useAppDispatch, useAppSelector } from '../store/store';
import { NewsItem } from './NewsListScreen';

export const FavoriteNewsListScreen = () => {
    const navigation = useNavigation();
    const data = useAppSelector(state => state.news.favoriteNews);
    const dispatch = useAppDispatch();
    const isFocused = useIsFocused();
    const onPressItem = useCallback(
        (newsItem: NewsItem) => {
            navigation.navigate('NewsDetail', { newsItem });
        },
        [navigation],
    );

    useEffect(() => {
        if (isFocused) {
            dispatch(clippedTabFocus());
        }
    }, [dispatch, isFocused]);

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title="FAVORITE_NEWS_LIST" />
            </Header>
            <FlatList
                style={{ flex: 1 }}
                data={data}
                renderItem={({ item }) => {
                    return (
                        <Button onPress={() => onPressItem(item)}>
                            <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 8 }}>
                                <Typography fontSize={24} numberOfLines={1}>
                                    {item.title}
                                </Typography>
                                <Typography fontSize={16} numberOfLines={2} color="gray">
                                    {item.description}
                                </Typography>
                            </View>
                        </Button>
                    );
                }}
            />
        </View>
    );
};
