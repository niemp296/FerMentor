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
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { CheckCircle, EyeOff, Eye, Key } from "react-native-feather";
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import { Line } from 'react-native-svg';
import { Button, colors, Input } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { auth } from "../../backend/firebase";

const SignUp = ({ navigation }) => {

    const [data, setData] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        check_textInputChange: false,
        secureTextEntry: true,   
    });
    
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

    const handleNameChange = (val) => {
        setData({
            ...data,
            name: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirmPassword: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Sign In'
        })
    }, [navigation]);

    const register = () => {
        auth.createUserWithEmailAndPassword(data.email, data.password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: data.name,
                photoURL: "https://www.exceptionaldentistry.com/assets/images/smiles-1.jpg"
            })
        })
        .catch(error => alert(error.message));      
    };

    function renderBackArrow() {
        return (
            <TouchableOpacity
                    onPress={() => navigation.navigate("SignIn")}
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
            <ScrollView> 
            <View style={styles.header}>
                <Text style={styles.textHeader}>Sign Up</Text>
            </View>
            <SafeAreaView style={styles.footer}>         
                <Text style={styles.textFooter}>FULL NAME</Text>
                <View style={styles.box}>
                    <FontAwesome
                        name="user-o"
                        color={COLORS.primary}
                        size={20}
                    />
                    <TextInput
                        placeholder="Full Name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleNameChange(val)}
                    />
                </View>
                <Text style={styles.textFooter, {paddingTop: SIZES.padding * 3}}>EMAIL ADDRESS</Text>
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
                <View style={styles.password}>
                    <Text style={styles.textFooter}>CONFIRM PASSWORD</Text>
                </View>
                <View style={styles.box}>
                    <FontAwesome
                        name="lock"
                        color={COLORS.primary}
                        size={20}
                    />
                    <TextInput
                        placeholder="Confirm Your Password"
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        onChangeText={(val) => handleConfirmPasswordChange(val)}
                        onSubmitEditing={register}
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
                    style={styles.button}
                    onPress={() => register()}
                >
                    <View style={styles.signIn}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </View>
                </TouchableOpacity>
                
            </SafeAreaView>     
            </ScrollView>      
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    backArrow: {
        padding: SIZES.padding * 3,
        marginHorizontal: SIZES.padding,
        width: 10,
        height: 10,
        tintColor: COLORS.white
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: SIZES.padding * 3,
        paddingBottom: SIZES.padding * 5,
        paddingTop: SIZES.padding * 3,
        color: COLORS.primary
    },
    footer: {
        flex: 4,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: SIZES.radius * 4,
        borderTopRightRadius: SIZES.radius * 4,
        paddingHorizontal: SIZES.padding * 3,
        paddingVertical: SIZES.padding * 5,
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
        paddingBottom: SIZES.padding * 20,
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
        justifyContent: 'center',
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

export default SignUp;
