import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import colors from '../../constants/colors';

const IoniconsHeaderButton = (props: any) => {
    return <HeaderButton 
                    {...props} 
                    IconComponent={Ionicons} 
                    iconSize={23}
                    color={Platform.OS === 'android' ? 'white' : colors.primary}  />
    
}

export default IoniconsHeaderButton
