import React from 'react';
import { View } from 'react-native';
import { Header } from '../components/Header/Header';

export const FavoriteNewsListScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title="FAVORITE_NEWS_LIST" />
            </Header>
        </View>
    );
};
