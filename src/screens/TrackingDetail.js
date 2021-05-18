import React from 'react';
import {
    Animated, Image, SafeAreaView,


    StyleSheet, Text,

    TouchableOpacity, View
} from 'react-native';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryScatter } from "victory-native";
import { COLORS, FONTS, icons, SIZES, VictoryTheme } from '../../constants';
import TextButton from './TextButton';

const Tracking = ({ route, navigation }) => {

    const scrollX = new Animated.Value(0);
    const numberOfCharts = [1, 2, 3];
    //dummy temp
    const chartData = [
        {x: 1, y: 2.5},
        {x: 1.5, y: 2},
        {x: 2, y: 2.3},
        {x: 2.5, y: 1.4},
        {x: 3, y: 1.5},
        {x: 3.5, y: 2.3},
        {x: 4, y: 2.8},
    ]
    const options = [
        {
            id: 1,
            label: "1 hr"
        },
        {
            id: 2,
            label: "3 Days"
        },
        {
            id: 3,
            label: "1 Week"
        },
        {
            id: 4,
            label: "1 Month"
        },
        {
            id: 5,
            label: "3 Months"
        },
    ]
    const [batch, setBatch] = React.useState(null);
    const [chartOptions, setChartOptions] = React.useState(options)
    const [selectedOption, setSeclectedOption] = React.useState(options[0])
    const [temperatureValue, setTemperatureValue] = React.useState(50);
    React.useEffect(() => {
        let { item } = route.params;
        setBatch(item)
    })

    function optionOnClickHandler(option) {
        setSeclectedOption(option)
    }

    function handleIncreaseTemp(temp) {
        setTemperatureValue(temp+1)
    }

    function handleDecreaseTemp(temp) {
        setTemperatureValue(temp-1)
    }

    function renderTimeLabel() {
        return (
            <View style={{flexDirection:'row', flex: 1}}>
                <Image
                    source={icons.temp}
                    resizeMode="cover"
                    style={{
                        width: 25,
                        height: 25,
                        marginTop:5
                    }}
                />
                <View style={{paddingTop: SIZES.padding}}>
                    <Text style={{...FONTS.h4}}>Temp</Text>
                </View>
            </View>
        )
    }

    function renderDots() {
        const dotPosition = Animated.divide(scrollX, SIZES.width)
        return (
            <View style={{height: 30, marginTop: 30}}>
                <View
                    style={styles.dot}
                >
                    {numberOfCharts.map((item, index) => {
                        
                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: "clamp"
                        })
                        const dotSize = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            extrapolate: "clamp"
                        })
                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.lightBlue, COLORS.secondary, COLORS.lightBlue],
                            extrapolate: "clamp"
                        })

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: SIZES.padding/2,
                                    width: dotSize,
                                    height: dotSize,
                                    backgroundColor: dotColor
                                }}
                            />
                        )

                    })}

                </View>
            </View>
        )
    }

    function renderChart() {
        return (
            <View
                style={{
                    margin: SIZES.padding * 2,
                    // paddingBottom: SIZES.padding*2,
                    alignItems: 'center',
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
                    ...styles.shadow
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}>
                    {renderTimeLabel()}
                </View>
                {/* Chart */}
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    scrollEnabledThrottle={16}
                    snapToAlignment="center"
                    snapToInterval={SIZES.width - 40}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0}
                    onScroll={Animated.event([
                        {nativeEvent:{contentOffset: {x: scrollX}}}
                    ], {useNativeDriver: false})}
                >
                    {
                        numberOfCharts.map((item, index) => (
                            <View
                                key={`chart-${index}`}
                            >
                                <View style={{marginTop: -25}}>
                                    <VictoryChart
                                        theme={VictoryTheme}
                                        height={220}
                                        width={SIZES.width - 40}
                                    >
                                        <VictoryLine
                                            style={{
                                                data: {
                                                    stroke: COLORS.secondary
                                                },
                                                parent: {
                                                    border: "1px solid #ccc"
                                                }
                                            }}
                                            data={chartData}
                                            categories={{
                                                x: ["15 MIN", "30 MIN", "45 MIN", "60 MIN"],
                                                y: ["20", "40", "60", "80"]
                                            }}
                                        />
                                        <VictoryScatter 
                                            data={chartData}
                                            size={7}
                                            style={{
                                                data: {
                                                    fill: COLORS.secondary
                                                }
                                            }}
                                        />
                                        <VictoryAxis 
                                            style={{
                                                grid: {
                                                    stroke: "transparent"
                                                }
                                            }}
                                        />
                                        <VictoryAxis
                                            dependentAxis
                                            style={{
                                                axis: {
                                                    stroke: "transparent"
                                                },
                                                grid: {
                                                    stroke: "grey"
                                                }
                                            }}
                                        />
                                    </VictoryChart>
                                </View>
                            </View>
                        ))
                    }
                    
                </Animated.ScrollView>
                {/* Option */}
                <View
                    style={{
                        width: "100%",
                        paddingHorizontal: SIZES.padding,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    {
                        options.map((option) => {
                            return (
                                <TextButton 
                                    key={`option-${option.id}`}
                                    label={option.label}
                                    customContainerStyle={{
                                        height: 30,
                                        width: 60,
                                        borderRadius: 15,
                                        backgroundColor: selectedOption.id == option.id ? COLORS.primary : COLORS.lightBlue
                                    }}
                                    customLableStyle={{
                                        color: selectedOption.id == option.id ? COLORS.white : COLORS.gray,
                                        ...FONTS.body5
                                    }}
                                    onPress={() => optionOnClickHandler(option)}
                                />
                            )
                        })
                    }
                </View>
                {/* Dots*/}
                {renderDots()}
            </View>
        )
    }
    function renderIcon() {
        return (
            <View style={styles.brewContainer} key={'container'}>
                <View style={styles.ratingPosition} key={batch?.alcohol}>
                    <View style={styles.icon} key={batch?.alcohol}>
                        <Image
                            source={icons.alcohol}
                            resizeMode="contain"
                            style={styles.rating} 
                        />
                        <Text stye={styles.textIcon}>{batch?.alcohol} %</Text>
                    </View>
                    <View style={styles.icon} key={batch?.time}>
                        <Image
                            source={icons.time}
                            resizeMode="contain"
                            style={styles.rating} 
                        />
                        <Text stye={styles.textIcon}>{Math.floor((new Date().getTime() - new Date(batch?.startDate))/(1000*60*60*24))} day(s)</Text>
                    </View>
                    <View style={styles.icon} key={batch?.temp}>
                        <Image
                            source={icons.sensor}
                            resizeMode="contain"
                            style={styles.rating} 
                        />
                        <Text stye={styles.textIcon}>Sensor {batch?.sensor_id}</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderReceipt(item) {
        return (
            <TextButton 
                key={`option-${item?.id}`}
                label={'RECIPE'}
                customContainerStyle={{
                    height: 40,
                    width: 100,
                    borderRadius: SIZES.radius,
                    backgroundColor:  COLORS.primary,
                    margin: SIZES.padding *2
                }}
                customLableStyle={{
                    color: COLORS.white,
                    ...FONTS.h4
                }}
                onPress={() => navigation.navigate("RecipeDetail", {
                    item
                })}
            />
        )
    }

    function renderTempControll() {
        return (
            <View style={styles.controlContainer}>
                <View style={styles.tempContainer}>
                    <Text style={styles.temperature}>{temperatureValue}°F</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => handleIncreaseTemp(temperatureValue)}
                    >
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => handleDecreaseTemp(temperatureValue)}
                    >
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderTitle() {
        return (
            <View style={styles.title} key={'title'}>
                <Text style={styles.nameText} key={batch?.name}>{batch?.name}</Text>
                <Text style={styles.dateText} key={batch?.startDate}>Start Date: {batch?.startDate}</Text>
            </View>
        )
    }

    function renderBackArrow() {
        return (
            <TouchableOpacity
                    onPress={() => navigation.goBack()}
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

    function renderHeader() {
        return (
            <View style={styles.header}>
                {renderTitle()}
                {renderIcon()}
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderBackArrow()}
            {renderHeader()}
            {renderTempControll()}
            {renderChart()}
            {renderReceipt(batch?.recipe_id)}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    brewContainer:{
        flexDirection: 'column'
    },
    rating: {
        width: 20,
        height: 20,
        marginHorizontal: SIZES.padding * 0.5 
    },
    ratingPosition: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        right: 0,
        width: SIZES.width * 0.4,
        justifyContent: 'center',
        paddingHorizontal: SIZES.padding,
        paddingBottom: SIZES.padding *3,
        flexDirection: 'column'
    },
    icon: {
        flexDirection:'row',
        padding: SIZES.padding
    },
    backArrow: {
        padding: SIZES.padding * 3,
        marginHorizontal: SIZES.padding,
        width: 10,
        height: 10,
        tintColor: COLORS.primary
    },
    title: {
        flexDirection: 'column',
        paddingHorizontal: SIZES.padding *3,
    },
    nameText: {
        ...FONTS.h2,
        color: COLORS.secondary
    },
    dateText: {
        ...FONTS.body3,
        color: COLORS.lightBlue
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between'  
    },
    textIcon: {
        ...FONTS.body3,
        color: COLORS.primary
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1
    },
    dot: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },      
    temperature: {
        color: COLORS.primary,
        textAlign: 'center',
        ...FONTS.largeTitle,
    },
    tempContainer: {
        width: 200,
        height: 200,
        borderRadius: 200/2,
        backgroundColor: COLORS.lightYellow,
        borderColor: COLORS.primary,
        borderWidth: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 60/2,
        backgroundColor: COLORS.lightYellow,
        borderColor: COLORS.primary,
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: SIZES.padding * 2
    },
    buttonText: {
        color: COLORS.primary,
        textAlign: 'center',
        ...FONTS.h1,
    },
    controlContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding * 3,
        paddingVertical: SIZES.padding
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: SIZES.padding * 3,
    }

});

export default Tracking;
