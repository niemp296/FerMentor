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
import { Avatar } from 'react-native-elements';

const Home = ({  navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    // use for sign out later
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('SignIn')
        });
    };
    
    React.useEffect(() => {
        let timeout = setTimeout(() => {
          setIsLoading(false);
        }, 1000)
    
        return () => clearTimeout(timeout);
      }, [])

    const user = auth?.currentUser?.displayName

    function renderHeader() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Hi, {user}!
                </Text>
                <TouchableOpacity onPress={signOutUser} style={{right:0}}>
                    <Avatar rounded source={{ uri: auth?.currentUser?.photoURL}}/>
                </TouchableOpacity>
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
        padding: SIZES.padding * 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between' 
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