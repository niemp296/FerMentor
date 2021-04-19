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
import { auth, db } from '../../backend/firebase';

const Shop = ({ navigation }) => {

    function renderBackArrow() {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                        style={styles.backArrow}
                >
                    <Image
                        source={icons.arrow}
                        resizeMode="contain"
                        style={styles.arrowSize}
                    >
                    </Image>
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={styles.titleText}>SHOP YOUR KITS</Text>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderBackArrow()}
        </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    backArrow: {
        paddingLeft: SIZES.padding,
        justifyContent: 'center',
        width: 50,
    },
    arrowSize: {
        width: 50,
        height: 50,
    },
    header: {
        flexDirection: 'row',
    },
    titleText: {
        paddingVertical: SIZES.padding * 2,
        marginRight: SIZES.padding * 2,
        ...FONTS.h2,
        color: COLORS.secondary
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Shop;