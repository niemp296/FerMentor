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
import Recipes from './Recipes';

const Tracking = ({ route, navigation }) => {
    const [batch, setBatch] = React.useState(null);
    React.useEffect(() => {
        let { item } = route.params;
        setBatch(item)
    })

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
    }
});

export default Tracking;
