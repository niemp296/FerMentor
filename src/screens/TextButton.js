import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';

import { SIZES, COLORS, FONTS } from '../../constants';

const TextButton = ({ label, customContainerStyle, customLableStyle, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.green,
                ...customContainerStyle
            }}
            onPress={onPress}
        >
            <Text style={{ color: COLORS.white, ...FONTS.hr, ...customLableStyle}}>{label}</Text>
        </TouchableOpacity>
    )
}

export default TextButton;