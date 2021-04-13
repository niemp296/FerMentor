import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    TextInput
} from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants';
import { TabView, TabBar } from 'react-native-tab-view';
import convert from 'convert-units';
import Constants from 'expo-constants';
import { Picker } from '@react-native-community/picker';

const measures = convert().measures();
const MeasureView = ({measure, value, setValue}) => {
    const units = convert().possibilities(measure);
    const [fromUnit, setFromUnit] = React.useState(units[0]);
    const [toUnit, setToUnit] = React.useState(units[0]);
    const [valueConverted, setValueCoverted] = React.useState('0');
    
    React.useEffect(() => {
        setValueCoverted(
            convert(+value)
            .from(fromUnit)
            .to(toUnit)
            .toFixed(2))
    }, [value, fromUnit, toUnit])

    return (
        <View style={{flex:1}}>
            <View style={styles.row}>
                <Picker style={styles.column} 
                        selectedValue={fromUnit}
                        onValueChange={setFromUnit}
                >
                    {units.map( (unit, indx) => (
                        <Picker.Item 
                            label={unit}
                            value={unit}
                            key={indx}
                        />
                    ))}
                </Picker>
                <View style={styles.column}>
                    <TextInput 
                        value={value}
                        onChangeText={setValue}
                        keyboardType='numeric'
                        style={styles.input}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <Picker style={styles.column} 
                        selectedValue={toUnit}
                        onValueChange={setToUnit}
                >
                    {units.map( (unit, indx) => (
                        <Picker.Item 
                            label={unit}
                            value={unit}
                            key={indx}
                        />
                    ))}
                </Picker>
                <View style={styles.column}>
                    <Text style={styles.results}>
                        {valueConverted}
                    </Text>
                </View>
            </View>
        </View>
    )
}
function unCamelCase(value) {
    return value.replace(/([A-Z])/g, ' $1')
}

const Conversion = ({ navigation }) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState(measures.map(m => ({key: m, title: unCamelCase(m)})));
    const [value, setValue] = React.useState('0');
    const renderScene = ({route}) => {
        return <MeasureView 
                    measure={route.key}
                    value={value}
                    setValue={setValue}
                />
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
                    <Text style={styles.titleText}>UNIT CONVERTER</Text>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderBackArrow()}
            <TabView 
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: Dimensions.get('window').width}}
            renderTabBar={(props) => (
                <TabBar {...props} 
                scrollEnabled 
                tabStyle={{width: 'auto'}}
                style={{backgroundColor: COLORS.primary}}
                indicatorStyle={{backgroundColor: COLORS.white}}/>
            )}
            >

            </TabView>
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
        marginRight: SIZES.padding * 2 ,
        ...FONTS.h2,
        color: COLORS.secondary
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    column: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
    },
    input: {
        height: 40,
        borderColor: COLORS.primary,
        borderBottomWidth: 1,
        ...FONTS.h2,
        textAlign: 'center',
    },
    results: {
        height: 40,
        borderColor: COLORS.primary,
        borderBottomWidth: 1,
        textAlign: 'center',
        ...FONTS.h2
    }
    
})

export default Conversion;