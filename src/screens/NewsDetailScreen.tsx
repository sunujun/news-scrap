import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Webview from 'react-native-webview';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { RootStackScreenProps } from '../navigation/types';

export const NewsDetailScreen = () => {
    const navigation = useNavigation();
    const routes = useRoute<RootStackScreenProps<'NewsDetail'>['route']>();
    const onPressBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

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
            </Header>
            <Webview style={{ flex: 1 }} source={{ uri: routes.params.newsItem.link }} />
        </View>
    );
};
