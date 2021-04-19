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

const Profile = ({ navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    // use for sign out later
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('SignIn')
        });
    };

    const user = auth?.currentUser

    function renderPicture() {
        return (
            <View style={styles.profile}>
                <Avatar rounded source={{ uri: user.photoURL}} size="large"/>
            </View>
        )
    }

    function renderLogOut() {
        return (
            <View style={styles.logOut}>
                <Text style={styles.resetPasswordText}>RESET YOUR PASSWORD</Text>
                <TouchableOpacity onPress={signOutUser}>
                    <Text style={styles.username}>LOG OUT</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderEmail() {
        return (
            <View style={styles.infoContainer}>
                <Image
                    source={icons.mail}
                    resizeMode="contain"
                    style={styles.mail} 
                />
                <Text style={styles.emailText}>{user.email}</Text>
            </View>
        )
    }

    function renderName() {
        return (
            <View style={styles.usernameView}>
                <Text style={styles.username}>{user.displayName.toUpperCase()}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderPicture()}
            {renderName()}
            {renderEmail()}
            {renderLogOut()}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    profile: {
        alignItems: 'center',
        paddingTop: SIZES.padding * 3,
        paddingBottom: SIZES.padding * 2
    },
    username: {
        ...FONTS.h3,
        color: COLORS.secondary,
    },
    resetPasswordText: {
        ...FONTS.h3,
        color: COLORS.primary,
        padding: SIZES.padding
    },
    usernameView: {
        alignItems: 'center'
    },
    logOut: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: SIZES.padding * 3
    },
    mail: {
        width: 30,
        height: 50,
        padding: SIZES.padding
    },
    emailText: {
        ...FONTS.h4,
        color: COLORS.primary,
        padding: SIZES.padding * 1.5
    },
    infoContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent:'center',
        padding: SIZES.padding * 3
    }

})

export default Profile;
