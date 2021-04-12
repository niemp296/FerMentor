import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    Dimensions,
    Platform,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { CheckCircle, EyeOff, Eye, Key } from "react-native-feather";
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import { Line } from 'react-native-svg';
import { Button, Input } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { auth } from "../../backend/firebase";

const SignIn = ({ navigation }) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true
    });

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser)
            if (authUser) {
                navigation.replace('Home');
            }
        });
        return unsubscribe;
    }, []);
    
    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const signIn = () => {
        if ( data.email.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }
        auth.signInWithEmailAndPassword(data.email, data.password)
        .catch((error) => alert(error))
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Welcome to FerMentor!</Text>
            </View>
            <View style={styles.footer}>
            <ScrollView> 
                <Text style={styles.textFooter}>EMAIL ADDRESS</Text>
                <View style={styles.box}>
                    <FontAwesome
                        name="user-o"
                        color={COLORS.primary}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        autoFocus
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ?
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <CheckCircle
                            color={COLORS.primary}
                            size={20}
                        />
                    </Animatable.View>
                    : null }
                </View>
                <View style={styles.password}>
                    <Text style={styles.textFooter}>PASSWORD</Text>
                </View>
                <View style={styles.box}>
                    <FontAwesome
                        name="lock"
                        color={COLORS.primary}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >   
                        {data.secureTextEntry ?
                        <EyeOff 
                            color={COLORS.primary}
                            size={20}
                        />
                        :
                        <Eye 
                            color={COLORS.primary}
                            size={20}
                        />}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    // style={styles.forgotPassword}
                    //onPress: forgot password
                >
                    <View style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => signIn()}
                >
                    <View style={styles.signIn}>
                        <Text style={styles.buttonText}>SIGN IN</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.signUp}>
                    <Text style={styles.accountText}>Don't have your account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={styles.signUpText}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: SIZES.padding * 3,
        paddingBottom: SIZES.padding * 5
    },
    footer: {
        flex: 4,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: SIZES.radius * 4,
        borderTopRightRadius: SIZES.radius * 4,
        paddingHorizontal: SIZES.padding * 3,
        paddingVertical: SIZES.padding * 5
    },
    textHeader: {
        color: COLORS.white,
        ...FONTS.h1
    },
    textFooter: {
        ...FONTS.h4,
        color: COLORS.primary,
        fontWeight: "600"
    },
    box: {
        flexDirection: 'row',
        marginTop: SIZES.padding,
        borderBottomColor: COLORS.lightBlue,
        paddingBottom: SIZES.padding/2,
        borderBottomWidth: 1
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : - 12,
        paddingLeft: SIZES.padding,
        color: COLORS.primary,
        ...FONTS.body3
    },
    password: {
        paddingTop: SIZES.padding * 3
    },
    button: {
        paddingTop: SIZES.padding * 3,
        alignItems: 'center',
    },
    signIn: {       
        width: '40%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius *3,
        backgroundColor: COLORS.primary
    },
    buttonText: {
        color: COLORS.lightYellow,
        ...FONTS.h3
    },
    forgotPassword: {
        alignItems: 'flex-end',
        paddingTop: SIZES.padding * 2
    },
    forgotPasswordText: {
        color: COLORS.primary,
        ...FONTS.body3
    },
    signUp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    accountText: {
        color: COLORS.primary,
        ...FONTS.body3
    },
    signUpText: {
        color: COLORS.secondary,
        ...FONTS.body3
    }
});

export default SignIn;
