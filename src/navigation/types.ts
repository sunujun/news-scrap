import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NewsItem } from '../screens/NewsListScreen';

type RootStackParamList = {
    NewsTab: BottomTabScreenProps<NewsTabParamList>;
    NewsDetail: { newsItem: NewsItem };
};

type NewsTabParamList = {
    NewsList: undefined;
    FavoriteNewsList: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type NewsTabScreenProps<T extends keyof NewsTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<NewsTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>;

// TODO: 이 코드의 역할은 무엇일까요
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
