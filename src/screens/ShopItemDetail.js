import React from 'react';
import { Animated } from 'react-native';
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

const ShopItemDetail = ({ route, navigation}) => {

    const scrollX = new Animated.Value(0)
    const [item, setItem] = React.useState(null);
    const [orderItems, setOrderItems] = React.useState([]);
    React.useEffect(() => {
        let { item } = route.params;
        setItem(item)
    })

    function editOrder(action, id, price) {
        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.id == id)
        if (action == "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    itemId: id,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }
        } else {
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * price
                }
            }
        }  
        setOrderItems(orderList)   
    }

    function getOrderQty(id) {
        let orderItem = orderItems.filter(a => a.id = id)
        if (orderItem.length > 0) {
            return orderItem[0].qty
        }
        return 0 
    }

    function getBasketItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)
        return itemCount
    }

    function sumOrder() {
        let total = orderItems.reduce((a, b) => a+ (b.total || 0), 0)
        return total.toFixed(2)
    }

    function renderBackArrow() {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                        onPress={() => navigation.goBack()}
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
                    <Text style={styles.titleText}>{item?.name}</Text>
                </View>
            </View>
        )
    }

    function renderImageList() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    {nativeEvent: {contentOffset: {x: scrollX}}}
                ], {useNativeDriver: false})}
            >
                {   item?.image.map((item, index) =>
                        <View key={`image-${index}`} style={{alignItems: 'center'}}>
                            <View style={{height: SIZES.height * 0.35}}>
                                <Image
                                    source={{uri: item}}
                                    resizeMode="cover"
                                    style={styles.imageList}
                                />
                             </View>
                        </View>
                )}
            </Animated.ScrollView>
        )
    }

    function renderQuanity() {
        return (
            <View style={styles.quantityBox}>
                <TouchableOpacity
                    style={styles.minus}
                    onPress={() => editOrder("-", item?.id, item?.price)}
                >
                    <Text style={{...FONTS.body1}}>-</Text>
                </TouchableOpacity>
                <View style={styles.quantityText}>
                    <Text style={{...FONTS.h2}}>{getOrderQty(item?.id)}</Text>
                </View>
                <TouchableOpacity
                    style={styles.plus}
                    onPress={() => editOrder("+", item?.id, item?.price)}
                >
                    <Text style={{...FONTS.body1}}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderDescription() {
        return (
            <View style={styles.descriptionBox}>
                <Text style={styles.descriptionText}>{item?.name} - ${item?.price}</Text>
                <Text style={{...FONTS.body3}}>{item?.description}</Text>
            </View>
        )
    }

    function renderDots() {
        const dotPosition = Animated.divide(scrollX, SIZES.width)
        return (
            <View style={{height: 30}}>
                <View
                    style={styles.dot}
                >
                    {item?.image.map((item, index) => {
                        
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

    function renderAddToCart() {
        return (
            <View style={styles.cartBox}>
                <View style={styles.cartItem}>
                    <Text style={{...FONTS.h3}}>{getBasketItemCount()} items</Text>
                    <Text style={{...FONTS.h3}}>${sumOrder()}</Text>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.buttonBox}
                        //onPress
                    >
                        <Text style={styles.cartText}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderBackArrow()}
            {renderImageList()}
            {renderDots()}
            {renderQuanity()}
            {renderDescription()}
            {renderAddToCart()}
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
    imageList: {
        width: SIZES.width,
        height: "100%"
    },
    quantityBox: {
        width: SIZES.width,
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    minus: {
        width: 50,
        backgroundColor: COLORS.lightWhite,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: SIZES.radius*2.5,
        borderBottomLeftRadius: SIZES.radius*2.5
    },
    plus: {
        width: 50,
        backgroundColor: COLORS.lightWhite,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: SIZES.radius*2.5,
        borderBottomRightRadius: SIZES.radius*2.5
    },
    quantityText: {
        width: 50,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    descriptionText: {
        marginVertical: SIZES.padding,
        textAlign: 'center',
        ...FONTS.h2
    },
    descriptionBox: {
        width: SIZES.width,
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: SIZES.padding * 3
    },
    dot: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: SIZES.padding
    },
    cartBox: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: SIZES.radius * 4,
        borderTopRightRadius: SIZES.radius * 4
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SIZES.padding * 2,
        paddingHorizontal: SIZES.padding * 3,
        borderBottomColor: COLORS.lightBlue,
        borderBottomWidth: 1
    },
    buttonView: {
        padding: SIZES.padding * 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonBox: {
        width: SIZES.width * 0.9,
        padding: SIZES.padding,
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
        borderRadius: SIZES.radius
    },
    cartText: {
        color: COLORS.white, 
        ...FONTS.h2
    }
})

export default ShopItemDetail;
