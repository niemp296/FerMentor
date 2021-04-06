import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants';

const Discussion = ({ navigation }) => {

    function renderBackArrow() {
        return (
            <TouchableOpacity
                    onPress={() => navigation.navigate("Home")}
            >
                <Image
                    source={icons.arrow}
                    resizeMode="contain"
                    style={styles.backArrow}
                >

                </Image>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderBackArrow()}
            <Text>Discussion</Text>
        </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    backArrow: {
        padding: SIZES.padding * 3,
        width: 10,
        height: 10,
    }
})

export default Discussion;