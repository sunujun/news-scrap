import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = (key: string) => {
    return AsyncStorage.getItem(key);
};

export const setItem = (key: string, value: string) => {
    return AsyncStorage.setItem(key, value);
};
