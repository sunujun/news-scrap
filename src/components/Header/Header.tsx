import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, useWindowDimensions } from 'react-native';
import { Spacer } from '../Spacer';
import { Title } from './Title';
import { HeaderButton } from './HeaderButton';
import { Group } from './Group';

export const Header = ({ children }: { children: React.ReactNode }) => {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();

    return (
        <View style={{ paddingTop: insets.top }}>
            <View
                style={{
                    width: width,
                    flexDirection: 'row',
                    height: 56,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    alignItems: 'center',
                }}>
                <Spacer horizontal={true} space={12} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>{children}</View>
                <Spacer horizontal={true} space={12} />
            </View>
        </View>
    );
};

Header.Title = Title;
Header.Button = HeaderButton;
Header.Group = Group;
