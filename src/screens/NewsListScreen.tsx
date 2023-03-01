import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getNewsList } from '../actions/news';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { SingleLineInput } from '../components/SingleLineInput';
import { Typography } from '../components/Typography';
import { NewsTabScreenProps } from '../navigation/types';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';

export interface NewsItem {
    title: string;
    originallink: string;
    link: string;
    description: string;
    pubDate: string;
}

export const NewsListScreen = () => {
    const navigation = useNavigation<NewsTabScreenProps<'NewsList'>['navigation']>();
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState('');
    const onSubmitEditing = useCallback(() => {
        if (query === '') {
            return;
        }
        dispatch(getNewsList(query));
    }, [dispatch, query]);

    const newsList = useAppSelector((state: RootState) => state.news.newsList);

    const onPressListItem = useCallback(
        (newsItem: NewsItem) => {
            navigation.navigate('NewsDetail', { newsItem });
        },
        [navigation],
    );

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title="NEWS_LIST" />
            </Header>
            <View style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 24, paddingVertical: 12 }}>
                    <SingleLineInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder="뉴스 검색어를 입력해 주세요"
                        onSubmitEditing={onSubmitEditing}
                    />
                </View>

                <FlatList
                    style={{ flex: 1 }}
                    data={newsList}
                    renderItem={({ item }) => {
                        return (
                            <Button onPress={() => onPressListItem(item)}>
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
        </View>
    );
};
