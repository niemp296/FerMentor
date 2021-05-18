import React from 'react';
import { DynamicColorIOS } from 'react-native';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Linking
} from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants';

const Discussion = ({ navigation }) => {

    function renderJoinForum() {
        return (
            <View style={styles.discussionContainer}>
                <Image
                    source={images.FBjoin}
                    resizeMode="contain"
                    style={styles.discussionImage}
                />
                <TouchableOpacity
                    onPress={() => {Linking.openURL('https://facebook.com')}}
                    style={styles.FBContainer}
                >
                    <Image
                        source={icons.facebook}
                        resizeMode="contain"
                    />
                    <View key={'click-link'} style={{flexDirection:'column'}}>
                        <Text style={styles.discussionText} key={'join'}>Click here to join our</Text>
                        <Text style={styles.discussionText} key={'fb'}>Facebook group!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
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
                    <Text style={styles.titleText}>DISCUSSION</Text>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderBackArrow()}
            {renderJoinForum()}
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
    },
    discussionImage: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    discussionText: {
        ...FONTS.h3,
        color: COLORS.primary
    },
    discussionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.padding * 3
    },
    FBContainer: {
        flexDirection: 'row',
        padding: SIZES.padding * 3
    }
})

export default Discussion;