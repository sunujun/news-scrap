import React from 'react';
import { View } from 'react-native';
import { Header } from '../components/Header/Header';

export const NewsDetailScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title="NEWS_DETAIL" />
            </Header>
        </View>
    );
};
