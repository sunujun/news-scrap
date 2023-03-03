import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Webview from 'react-native-webview';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { RootStackScreenProps } from '../navigation/types';
import { clipNewsItem } from '../actions';
import { useAppDispatch, useAppSelector } from '../store/store';

export const NewsDetailScreen = () => {
    const navigation = useNavigation();
    const routes = useRoute<RootStackScreenProps<'NewsDetail'>['route']>();
    const dispatch = useAppDispatch();
    const onPressBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);
    const onPressFavorite = useCallback(() => {
        dispatch(clipNewsItem(routes.params.newsItem));
    }, [dispatch, routes.params.newsItem]);
    const isClipped =
        useAppSelector(state => state.news.favoriteNews.filter(item => item.link === routes.params.newsItem.link))
            .length > 0;

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Group>
                    <Header.Button iconName="arrow-back" onPress={onPressBack} />
                    <Spacer horizontal space={12} />
                    <View style={{ maxWidth: 200 }}>
                        <Header.Title title="NEWS_DETAIL"></Header.Title>
                    </View>
                </Header.Group>
                <Header.Button iconName={isClipped ? 'heart' : 'heart-outline'} onPress={onPressFavorite} />
            </Header>
            <Webview style={{ flex: 1 }} source={{ uri: routes.params.newsItem.link }} />
        </View>
    );
};
