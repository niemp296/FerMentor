import React from 'react';
import { VirtualizedList } from 'react-native';
import { ScrollView } from 'react-native';
import { 
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants';

const Tracking = ({ navigation }) => {

    // Dummy Data
    const BrewData = [
        {
            brew_id: 1,
            recipe_id: 1,
            sensor_id: 1,
            name: "Muscadine Wine",
            yield: "1 gallon",
            type: 'Dry Stout',
            startDate: "Feb 30, 2021",
            temp: 52,
            alcohol: 10.6,
            status: "current"   
        },
        {
            brew_id: 2,
            recipe_id: 2,
            sensor_id: 1,
            name: "Mom's Wine",
            yield: "1 gallon",
            type: 'Dry Stout',
            startDate: "Feb 30, 2021",
            temp: 52,
            alcohol: 5.3,
            status: "current"
        },
        {
            brew_id: 3,
            recipe_id: 3,
            sensor_id: 1,
            name: "Clover Wine",
            yield: "1 gallon",
            type: 'Dry Stout',
            startDate: "Jan 30, 2021",
            temp: 52, //if -100, N/A
            alcohol: 5.3,
            status: "current"
        },
        {
            brew_id: 4,
            recipe_id: 3,
            sensor_id: 1,
            name: "Homemade Wine",
            yield: "1 gallon",
            type: 'Dry Stout',
            startDate: "Jan 30, 2020",
            temp: -100, //if -100, N/A
            alcohol: 5.3,
            status: "past"
        }
    ]

    const [brewList, setBrew] = React.useState(BrewData)

    function renderBrewItem(item, status) {
        if (item.status == status) {
            return (
                <TouchableOpacity
                    style={{marginBottom: SIZES.padding * 1}}
                    //onPress -> navigate to tracking detail
                    onPress={() => navigation.navigate("Recipes")}
                >
                    <View style={styles.brewBlock}>
                        <View style={styles.brewContainer} key={item.id}>
                            <Text style={styles.brewTitle}>{item.name}</Text>
                            <Text style={styles.brewBody}>Type: {item.type}</Text>
                            <Text style={styles.brewBody}>Yield: {item.yield}</Text>
                            <Text style={styles.brewBody}>Start Date: {item.startDate}</Text>
                        </View>
                        <View style={styles.brewContainer}>
                            <View style={styles.ratingPosition} key={item.alcohol}>
                                <View style={styles.icon} key={item.time}>
                                    <Image
                                        source={icons.time}
                                        resizeMode="contain"
                                        style={styles.rating} 
                                    />
                                    <Text>{Math.floor((new Date().getTime() - new Date(item.startDate))/(1000*60*60*24))} day(s)</Text>
                                </View>
                                <View style={styles.icon} key={item.temp}>
                                    <Image
                                        source={icons.temp}
                                        resizeMode="contain"
                                        style={styles.rating} 
                                    />
                                    {item.temp != -100 ? <Text>{item.temp} F</Text>
                                                        : <Text> _ _ F</Text>}
                                </View>
                                <View style={styles.icon} key={item.alcohol}>
                                    <Image
                                        source={icons.alcohol}
                                        resizeMode="contain"
                                        style={styles.rating} 
                                    />
                                    <Text>{item.alcohol} %</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    function renderCurrentBrew() {
        const renderItem = ({ item }) => (
            renderBrewItem(item, "current")
        )
        return (
            <FlatList
                data={brewList}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingBottom: 30
                }}
            />
        )
    }

    function renderPastBrew() {
        const renderItem = ({ item }) => (
            renderBrewItem(item, "past")
        )
        return (
            <FlatList
                data={brewList}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingBottom: 30
                }}
            />
        )
    }

    function renderAddBrew() {
        return (
            <TouchableOpacity
                style={styles.addContainer}
                onPress={() => navigation.navigate("AddBrew")}
            >
                <Image
                    source={icons.add}
                    resizeMode="contain"
                    style={styles.addIcon} 
                /> 
            </TouchableOpacity>
        )
    }

    function renderBrewStatus(status) {
        return (
            <View style={styles.brewStatus}>
                <Text style={styles.brewStatusText} key={status}>{status == "current" ? "CURRENT BREWS" 
                                                                        : "PAST BREWS"} </Text>
                {status == "current" ? renderAddBrew()  : []}                                                        
            </View>
        )
    }

    function renderBrewList() {

        return (
            <View style={styles.listBlocks}>
                {renderBrewStatus("current")}
                {renderCurrentBrew()}
                {renderBrewStatus("past")}
                {renderPastBrew()}
                
            </View>
        )
    }

    function renderSensorStation() {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("SensorStation")}
            >
                <View style={styles.stationBox} key={'sensor'}>
                    <Text style={styles.stationText}>SENSOR STATION</Text>
                </View>
            </TouchableOpacity>
        )
    }
    function renderHeader() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText} key={'tracker'}>Homebrew Tracker</Text>
                {renderSensorStation()}
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {renderHeader()}
                {renderBrewList()}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.padding * 3
    },
    headerText: {
        ...FONTS.h1,
        color: COLORS.secondary,
        paddingBottom: SIZES.padding
    },
    stationBox: {
        borderRadius: SIZES.radius,
        borderColor: COLORS.lightBlue,
        borderWidth: 1,
        padding: SIZES.padding /2
    },
    stationText: {
        ...FONTS.h4,
        color: COLORS.secondary,
        lineHeight: 21,
        fontWeight: "800"
    },
    brewTitle: {
        ...FONTS.h4,
        color: COLORS.black,
        fontWeight: "600",
        paddingBottom: SIZES.padding,
        paddingRight:SIZES.padding *11
    },
    brewBody: {
        ...FONTS.body4,
        color: COLORS.primary,
        fontWeight: "400",
        paddingRight:SIZES.padding *11
    },
    brewBlock: {
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        padding: SIZES.padding * 3,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1
    },
    listBlocks: {
        backgroundColor: COLORS.lightWhite,
        paddingHorizontal: SIZES.padding * 2,
        paddingTop: SIZES.padding,
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
        width: SIZES.width * 0.3,
        justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: SIZES.padding,
        paddingBottom: SIZES.padding *4.5,
        flexDirection: 'column'
    },
    icon: {
        flexDirection:'row',
        padding: SIZES.padding
    },
    brewStatus: {
        padding: SIZES.padding,
        flexDirection:'row'
    },
    addIcon: {
        width: 10,
        height: 10,
        height: 50,
        width: SIZES.width * 0.15,  
    },
    addContainer: {
        right: 0,
        position: 'absolute',
        bottom: 0,
    },
    brewStatusText: {
        ...FONTS.h3,
        color: COLORS.secondary
    }
});

export default Tracking;
