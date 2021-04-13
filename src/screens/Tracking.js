import React from 'react';
import { 
    SafeAreaView,
    View,
    Text,
    StyleSheet
} from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants';

const Tracking = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Homebrew Tracker</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.padding * 3
    },
    headerText: {
        ...FONTS.h1,
        color: COLORS.secondary
    }
});

export default Tracking;
