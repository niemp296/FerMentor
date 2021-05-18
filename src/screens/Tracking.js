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
            recipe_id: {
                id: 1,
                name: "Old-Fashioned Muscadine Wine",
                serving: 25,
                yield: "1 gallon",
                prepTime: "2 hrs",
                rating: 4.8,
                difficulty: "Hard",
                author: "AllRecipes",
                description: "Muscadine grapes are native to the United States, but if you've never heard of them, it's because muscadine grapes aren't commercially farmed like other grapes, and their wine isn't as sought after as wine from other varieties",
                ingredients: ["6 cups granulated sugar","3 quarts filtered water","1 quart mashed muscadine grapes","1 (1/4 ounce) packet active dry yeast (7 grams)"],
                directions: ["In a large, cleaned, and sanitized gallon-sized glass container, dissolve the sugar in the water. ",
                "Add the mashed grapes to the water and sprinkle the active dry yeast over the top, but don't stir. Cover the container with a clean cheesecloth or kitchen towel and place it in a dark and cool place, ideally between 68 F and 72 F. Let the mixture rest for 24 hours.",
                "Once a day has passed, stir the mixture well and cover again, placing it in a dark and cool place. From this moment on, you need to stir the mixture every day at the same time, for a full week.",
                "After seven days of stirring and resting, strain the liquids into another clean and sanitized gallon container with an air lock.",
                "Fill with additional water to come up to the top of the gallon container.",
                "Let the wine ferment for six weeks in a cool and dark place.",
                "After six weeks, strain again and place it in a clean gallon container.",
                "Cap lightly for three days to allow for any more fermentation to cease.",
                "Pour the wine into bottles with an airtight cap and store the wine in the fridge.",
                "Serve and enjoy."],
                notes: "Many people use scuppernongs interchangeably with muscadines but, in addition to the color, the flavor is different"
            },
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
            recipe_id: {
                id: 2,
                name: "Mom's Homemade Wine",
                serving: 20,
                yield: "1 gallon",
                prepTime: "10 mins",
                rating: 4.5,
                difficulty: "Easy",
                author: "BigOven",
                description: "Try this Mom's Homemade Wine recipe or contribute your own",
                ingredients: ["2 12-oz cans Frozen Grape Juice","4 c Sugar","1 ts Dry yeast","Water","1 Balloon","1 Glass gallon jug"],
                directions: ["Dissolve yeast in 1 cup of warm water. Mix all other ingredients together in the gallon jug. Pour yeast/water mixture into jug. Fill jug halfway full with warm water. Shake well to mix ingredients and dissolve sugar. Fill the jug to the lower neck with water. Put a toy balloon on the neck of the jug. Poke a small hole in the balloon with a needle. Place in an area that will not be disturbed for three weeks. The balloon will inflate from the gas while fermenting. When the balloon starts to deflate the wine is finished. Do not move the jug while fermenting. This recipe came from my great grand mother in Germany. It was passed on by my grandmother, to mother, then me. I hope that you enjoy it. It is a little potent for wine! Posted to MM-Recipes Digest V4 #335 by Sexylegs@2-hot.com (Mary Lu) on Dec 26, 1997"],
                notes: ""
            },
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
            recipe_id: {
                id: 3,
                name: "Red Clover Wine",
                serving: 25,
                yield: "1 gallon",
                prepTime: "2 hrs",
                rating: 0,
                difficulty: "Medium",
                author: "Dawn Marie",
                description: "",
                ingredients: ["3 quart Red Clover Blossoms (Unrinsed and free of grennery)","1 gallon Boiling Water","6 cup Sugar","1/2 cup Wheat Berries","1/3 cup Raisins","1/4 teaspoon Wine Yeast"],
                directions: ["Place the flower heads in a large food grade bucket, and pour the boiling water over them. Cover with a porous lid, and allow to soak for 4 days.",
                "Strain liquid into a large non-reactive pot. Bring to a boil over high-heat; then remove from the heat immediately.",
                "Return the heated liquid to the bucket. Add the sugar, wheat berries, raisins, and use a long non-reactive spoon to stir until the sugar is dissolved.",
                "When the liquid has cooled to lukewarm - sprinkle the yeast on top. Cover with a nylon stocking and a loose fitting lid, and allow to ferment for at least 14 days.",
                "Strain the liquid into a clean glass carboy and cover as appropriate. In 6 - 12 months the wine will be ready for bottling. During this time frame the wine will be clearing, and should be siphoned from the lees into another clean glass carboy about once every 3 months. When sufficiently clear, the wine may be siphoned into sterilized wine bottles and corked. Enjoy immediately, or store your wine on it's side for later consumption"],
                notes: "Amber in color the wine flavor is like sweet clover tea, reminiscent of clover honey - with a sweet wine aroma. It is best to collect Clover Blossoms after 11 AM when the morning dew has dried. Red Clover Blossoms and White clover blossoms can be used interchangeably - but must be free of all plant greenery."
            },
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
            recipe_id: {
                id: 3,
                name: "Red Clover Wine",
                serving: 25,
                yield: "1 gallon",
                prepTime: "2 hrs",
                rating: 0,
                difficulty: "Medium",
                author: "Dawn Marie",
                description: "",
                ingredients: ["3 quart Red Clover Blossoms (Unrinsed and free of grennery)","1 gallon Boiling Water","6 cup Sugar","1/2 cup Wheat Berries","1/3 cup Raisins","1/4 teaspoon Wine Yeast"],
                directions: ["Place the flower heads in a large food grade bucket, and pour the boiling water over them. Cover with a porous lid, and allow to soak for 4 days.",
                "Strain liquid into a large non-reactive pot. Bring to a boil over high-heat; then remove from the heat immediately.",
                "Return the heated liquid to the bucket. Add the sugar, wheat berries, raisins, and use a long non-reactive spoon to stir until the sugar is dissolved.",
                "When the liquid has cooled to lukewarm - sprinkle the yeast on top. Cover with a nylon stocking and a loose fitting lid, and allow to ferment for at least 14 days.",
                "Strain the liquid into a clean glass carboy and cover as appropriate. In 6 - 12 months the wine will be ready for bottling. During this time frame the wine will be clearing, and should be siphoned from the lees into another clean glass carboy about once every 3 months. When sufficiently clear, the wine may be siphoned into sterilized wine bottles and corked. Enjoy immediately, or store your wine on it's side for later consumption"],
                notes: "Amber in color the wine flavor is like sweet clover tea, reminiscent of clover honey - with a sweet wine aroma. It is best to collect Clover Blossoms after 11 AM when the morning dew has dried. Red Clover Blossoms and White clover blossoms can be used interchangeably - but must be free of all plant greenery."
            },
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
                    onPress={() => navigation.navigate("TrackingDetail", {item})}
                >
                    <View style={styles.brewBlock} key={item.name}>
                        <View style={styles.brewContainer} key={item.id}>
                            <Text style={styles.brewTitle} key={item.name}>{item.name}</Text>
                            <Text style={styles.brewBody} key={item.type}>Type: {item.type}</Text>
                            <Text style={styles.brewBody} key={item.yield}>Yield: {item.yield}</Text>
                            <Text style={styles.brewBody} key={item.startDate}>Start Date: {item.startDate}</Text>
                        </View>
                        <View style={styles.brewContainer} key={item.type}>
                            <View style={styles.ratingPosition} key={item.alcohol}>
                                <View style={styles.icon} key={item.time}>
                                    <Image
                                        source={icons.time}
                                        resizeMode="contain"
                                        style={styles.rating} 
                                        key={'time'}
                                    />
                                    <Text>{Math.floor((new Date().getTime() - new Date(item.startDate))/(1000*60*60*24))} day(s)</Text>
                                </View>
                                <View style={styles.icon} key={item.temp}>
                                    <Image
                                        source={icons.temp}
                                        resizeMode="contain"
                                        style={styles.rating} 
                                        key={'temp'}
                                    />
                                    {item.temp != -100 ? <Text>{item.temp} F</Text>
                                                        : <Text> _ _ F</Text>}
                                </View>
                                <View style={styles.icon} key={item.alcohol}>
                                    <Image
                                        source={icons.alcohol}
                                        resizeMode="contain"
                                        style={styles.rating} 
                                        key={'alcohol'}
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
            <View style={styles.brewStatus} key={'brew'}>
                <Text style={styles.brewStatusText} key={status}>{status == "current" ? "CURRENT BREWS" 
                                                                        : "PAST BREWS"} </Text>
                {status == "current" ? renderAddBrew()  : []}                                                        
            </View>
        )
    }

    function renderBrewList() {

        return (
            <View style={styles.listBlocks} key={'brewList'}>
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
                    <Text style={styles.stationText} key={'station'}>SENSOR STATION</Text>
                </View>
            </TouchableOpacity>
        )
    }
    function renderHeader() {
        return (
            <View style={styles.header} key={'header'}>
                <Text style={styles.headerText} key={'tracker'}>Homebrew Tracker</Text>
                {renderSensorStation()}
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView key={'scrollview'}>
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
