import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput
} from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants';
import { auth, db } from '../../backend/firebase';
import { ColorPropType } from 'react-native';
import { Animated } from 'react-native';

const Shop = ({ navigation }) => {

    //Dummy Data
    //price rating
    // const affordable = 1;
    // const fairPrice = 2;
    // const expensive = 3;

    const itemData = [
        {
            id: 1,
            name: "Pinter Bundle",
            price: 500,
            description: 'A Pinter Pack comes with everything you need to start Fresh Brewing - Fresh Press, Brewing Yeast, and Pinter Purifier',
            photo: "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F19695ed0-4eb8-4f2c-a5b1-eec34fe8fd9d.jpg?fit=scale-down&source=next&width=700",
            rating: 4.5,
            priceRating: 3,
            categories: [1],
            image: ["https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F19695ed0-4eb8-4f2c-a5b1-eec34fe8fd9d.jpg?fit=scale-down&source=next&width=700",
                    "https://cdn.shopify.com/s/files/1/0265/3428/1291/products/YellowPinterProductTransBG_345x345@2x.png?v=1599827317",
                    "https://cdn.shopify.com/s/files/1/0265/3428/1291/products/Cloudy_Nine_efb0f5d4-cc41-4445-9040-eb7531e6a4e6_345x345@2x.png?v=1615378496"  
            ]
        },
        {
            id: 2,
            name: "SLO Brew Kit",
            price: 100,
            description: "Some description",
            photo: "https://cdn.shopify.com/s/files/1/0168/3816/files/Asset_16_2x-100.jpg?v=1605671965",          
            rating: 3.5,
            priceRating: 2,
            categories: [2],
            image: ["https://cdn.shopify.com/s/files/1/0168/3816/files/Asset_16_2x-100.jpg?v=1605671965",
                "https://m.media-amazon.com/images/I/91GgLI6hVcL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/81XuC0punkL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/51i8FEzylrL._AC_.jpg"     
            ]
        },
        {
            id: 3,
            name: "Craft Brewing Kit",
            price: 100,
            description: "GERMAN-STYLE HEFEWEIZEN – This brewing kit lets you brew refreshing, silky smooth Hefeweizen. This Bavarian wheat beer recipe kit is honed to perfection and can be enjoyed year-round. Germans know Hefeweizen; now, you can too.",
            photo: "https://images-na.ssl-images-amazon.com/images/I/51YHwumU0RL._AC_SX466_.jpg",          
            rating: 5,
            priceRating: 2,
            categories: [1],
            image: ["https://images-na.ssl-images-amazon.com/images/I/51YHwumU0RL._AC_SX466_.jpg",
                "https://m.media-amazon.com/images/I/91GgLI6hVcL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/81XuC0punkL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/51i8FEzylrL._AC_.jpg"     
            ]
        },
        {
            id: 4,
            name: "Wine Kit",
            price: 30,
            description: "Some description",
            photo: "https://www.tenco.it/media/cache/89/ef/89ef7ef987d2d231e2eeff812cd866df.jpg",           
            rating: 3.5,
            priceRating: 1,
            categories: [2],
            image: ["https://www.tenco.it/media/cache/89/ef/89ef7ef987d2d231e2eeff812cd866df.jpg",
                "https://m.media-amazon.com/images/I/91GgLI6hVcL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/81XuC0punkL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/51i8FEzylrL._AC_.jpg"     
            ]
        },
    ]

    const categoryData = [
        {
            id: 1,
            name: "Beer"
        },
        {
            id: 2,
            name: "Wine"
        }, 
    ]


    const [itemList, setItems] = React.useState(itemData)
    const [categories, setCategories] = React.useState(categoryData)
    const [search, setSearch] = React.useState()
    const [filteredData, setFilteredData] = React.useState(itemData)

    const handleSearch = (val) => {
        if (val) {
            const newData = itemData.filter((item) => {
                const items = item.name ? 
                    item.name.toUpperCase() 
                    : ''.toUpperCase();
                const textData = val.toUpperCase();
                return items.indexOf(textData) > -1;
            });
            setFilteredData(newData);
            setSearch(val);
        } else {
            setFilteredData(itemList)
            setSearch(val)
        }      
    }

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name
        return ""
    }

    function renderSearch() {
        return (
            <View style={styles.searchBox}>  
                <View style={styles.search} key='search'>         
                    <TextInput
                        placeholder="Brew Kit Selector"
                        style={styles.titleText}
                        value={search}
                        autoCapitalize="none"
                        onChangeText={(val) => handleSearch(val)}
                    />
                    <TouchableOpacity
                        style={styles.searchIcon}
                    >
                        <Image
                            source={icons.search}
                            resizeMode="contain"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>  
            </View>
        )
    }

    function renderCart() {
        return (
            <TouchableOpacity
                style={styles.cart}
            >
                <Image
                    source={icons.cart}
                    resizeMode="contain"
                    style={styles.icon}
                />
            </TouchableOpacity>
        )
    }

    function renderHeader() {
        return (
            <View style={styles.header}>
                {renderSearch()}
                {renderCart()}
            </View>
        )

    }

    function renderTrending() {
        return (
            <View style={styles.trendingBox}>
                <Text style={styles.trendingText}>Trending</Text>
            </View>
        )
    }

    function renderItemList() {
        const renderItem = ({item}) => (
            <TouchableOpacity
                style={{marginBottom: SIZES.padding * 2}}
                onPress={() => navigation.navigate("ShopItemDetail", {
                    item
                })}
            >
                <View style={styles.itemBox}>
                    <Image
                        source={{uri: item.photo}}
                        resizeMode="cover"
                        style={styles.itemImage}
                    />
                    <View
                        style={{
                            position: "absolute",
                            bottom: SIZES.padding,
                            height: 50,
                            width: SIZES.width * 0.15,
                            backgroundColor: COLORS.white,
                            borderTopRightRadius: SIZES.radius,
                            borderBottomLeftRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow
                        }}
                    >
                        <Text style={{...FONTS.h4}}>$ {item.price}</Text>
                    </View>
                </View>
                {/*Item info*/}
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.detailInfo}>
                    <Image
                        source={icons.star}
                        style={styles.iconStar}
                    />
                    <Text style={styles.itemInfo}>{item.rating}</Text>
                    <View style={styles.infoText}>
                        {
                            item.categories.map((categoryId) => {
                                return (
                                    <View 
                                        style={{flexDirection: 'row'}}
                                        key={categoryId}
                                    >
                                        <Text style={styles.itemInfo}>{getCategoryNameById(categoryId)}</Text>
                                        <View style={{marginTop: -5}} key='dot'>
                                            <Text style={{...FONTS.h3, color: COLORS.lightBlue}}> . </Text>
                                        </View>
                                    </View>

                                )
                            })
                        }
                        {
                            [1, 2, 3].map((priceRating) => (
                                <Text
                                    key={priceRating}
                                    style={{
                                        ...FONTS.body3,
                                        color: (priceRating <= item.priceRating) ? COLORS.secondary : "#f7d9d9"
                                    }}
                                >$</Text>
                            ))
                        }
                    </View>
                </View>

            </TouchableOpacity>
        )

        return (
            <FlatList
                data={filteredData}
                keyExtractor={item=> `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={styles.itemContainer}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderTrending()}
            {renderItemList()}
        </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    titleText: {
        ...FONTS.h2,
        color: COLORS.primary,
    },
    searchBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        width: '85%',
        height: "100%",
        backgroundColor: COLORS.lightWhite,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    header: {
        flexDirection: 'row',
        height: 50,
        marginVertical: SIZES.padding * 3
    },
    cart: {
        width: 50,
        paddingRight: SIZES.padding*3,
        justifyContent: 'center'
    },
    icon: {
        width: 32,
        height: 32
    },
    searchIcon: {
        width: 50,
        // paddingRight: SIZES.padding*2,
        justifyContent: 'flex-end'
    },
    trendingText: {
        ...FONTS.h1,
        color: COLORS.primary
    },
    trendingBox: {
        paddingHorizontal: SIZES.padding *3
    },
    itemContainer: {
        paddingHorizontal: SIZES.padding * 3,
        paddingBottom: SIZES.padding*1.5
    },
    itemImage: {
        width: "100%",
        height: 200,
        borderRadius: SIZES.radius * 2.5
    },
    itemName:{
        ...FONTS.h3,
        color: COLORS.primary
    },
    itemInfo: {
        ...FONTS.body3,
        color: COLORS.primary
    },
    iconStar: {
        height: 20,
        width: 20,
        tintColor: COLORS.darkYellow,
        marginRight: 10
    },
    detailInfo: {
        marginTop: SIZES.padding,
        flexDirection: 'row'
    },
    itemBox: {
        paddingTop: SIZES.padding * 2,
        paddingBottom: SIZES.padding
    },
    infoText: {
        flexDirection: 'row',
        marginLeft: SIZES.padding
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
    }
    
})

export default Shop;