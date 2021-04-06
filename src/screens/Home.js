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

const Home = ({ navigation }) => {

    // Dummy Datas
    const user = "RICH"

    function renderHeader() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    HEY, {user}.
                </Text>
            </View>
        )
    }

    function renderBlock(title) {
        if (title == "Recipes") {
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate("Recipes")}
                >
                    <View style={{paddingHorizontal: SIZES.padding * 3}}>
                        <Text style={styles.blockTitle}>{title}</Text>
                        <Image
                            source={images.recipes}
                            resizeMode="cover"
                            style={styles.blockImage}
                        />
                    </View>
                </TouchableOpacity>
            )
        } else if (title == "Discussion") {
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate("Discussion")}
                >
                    <View style={styles.blockPadding}>
                        <Text style={styles.blockTitle}>{title}</Text>
                        <Image
                            source={images.discussion}
                            resizeMode="cover"
                            style={styles.blockImage}
                        />
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate("Conversion")}
                >
                    <View style={styles.blockPadding}>
                        <Text style={styles.blockTitle}>{title}</Text>
                        <Image
                            source={images.conversion}
                            resizeMode="cover"
                            style={styles.blockImage}
                        />
                    </View>
                </TouchableOpacity>
            )
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderBlock("Recipes")}
            {renderBlock("Discussion")}
            {renderBlock("Conversion")}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    header: {
        padding: SIZES.padding * 3
    },
    headerText: {
        ...FONTS.h1
    },
    blockImage: {
        width: "100%",
        height: 155,
        borderRadius: SIZES.radius
    },
    blockTitle: {
        ...FONTS.h2,
        color: COLORS.secondary,
        paddingBottom: SIZES.padding
    },
    blockPadding: {
        paddingHorizontal: SIZES.padding * 3, 
        paddingTop: SIZES.padding * 2
    }
    

})

export default Home;