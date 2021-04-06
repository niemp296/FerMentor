import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Unorderedlist from 'react-native-unordered-list';
import { icons, COLORS, SIZES, FONTS } from '../../constants';

const RecipeDetail = ({ route, navigation }) => {
    const [recipe, setRecipe] = React.useState(null);
    React.useEffect(() => {
        let { item } = route.params;
        setRecipe(item)
    })

    // id: 2,
    // name: "Mom's Homemade Wine",
    // serving: 20,
    // yield: "1 gallon",
    // prepTime: "10 mins",
    // rating: 4.5,
    // difficulty: "Easy",
    // author: "BigOven",
    // description: "Try this Mom's Homemade Wine recipe or contribute your own",
    // ingredients: ["2 12-oz cans Frozen Grape Juice","4 c Sugar","1 ts Dry yeast","Water","1 Balloon","1 Glass gallon jug"],
    // directions: ["Dissolve yeast in 1 cup of warm water. Mix all other ingredients together in the gallon jug. Pour yeast/water mixture into jug. Fill jug halfway full with warm water. Shake well to mix ingredients and dissolve sugar. Fill the jug to the lower neck with water. Put a toy balloon on the neck of the jug. Poke a small hole in the balloon with a needle. Place in an area that will not be disturbed for three weeks. The balloon will inflate from the gas while fermenting. When the balloon starts to deflate the wine is finished. Do not move the jug while fermenting. This recipe came from my great grand mother in Germany. It was passed on by my grandmother, to mother, then me. I hope that you enjoy it. It is a little potent for wine! Posted to MM-Recipes Digest V4 #335 by Sexylegs@2-hot.com (Mary Lu) on Dec 26, 1997"],
    // notes: ""

    function renderBackArrow_Saved() {
        return (
            <View style={styles.arrowSavedBox}>
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
                <TouchableOpacity
                        //TODO: onPress: save recipe 
                >
                    <Image
                        source={icons.heart}
                        resizeMode="contain"
                        style={styles.saved}
                    >
                    </Image>
                </TouchableOpacity>
            </View>
        )
    }

    function renderHeader() {
        return (
            <Text style={styles.title}>{recipe?.name}</Text>
        )
    }

    function renderInfoChild(bold, detail) {
        return (
            <Text style={styles.detailItem}>{bold}   <Text style={{fontWeight: "400"}} key={bold}>{detail}</Text>
            </Text>             
        )
    }

    function renderDetailInfo() {
        var myloop = [];
        var title = ['Serving:', 'Yield:', 'Prep Time:', 'Rating:', 'Difficulty:', 'Author:']
        var info = [recipe?.serving, recipe?.yield, recipe?.prepTime, recipe?.rating, recipe?.difficulty, recipe?.author]
        for (let i = 0; i < title.length; i++) {
          myloop.push(
            renderInfoChild(title[i], info[i])
          );
        }
        return myloop
    }

    function renderBar(text) {
        return (
            <View style={styles.bar}>
                <Text style={styles.barText}>{text}</Text>
            </View>
        )
    }

    function renderIngredient() {
        const listItems = recipe?.ingredients.map(( item ) =>
            <Unorderedlist color={COLORS.primary}>
                <Text style={styles.bulletText}>{item}</Text>
            </Unorderedlist>
        );
        return (
            <View style={{paddingHorizontal: SIZES.padding * 3}}>
                {listItems}
            </View>
        )
    }

    function renderText(description,text) {
        if (description == true) {
            if (text != "") {
                return (
                    <Text style={styles.description}>{text}</Text>
                )
            }
        } else {
            if (text == "") {
                text = "None"
            }
            return (
                <Text style={styles.normalText}>{text}</Text>
            )
        }   
    }

    function renderInstruction() {
        var myloop = []
        for (let i = 0; i < recipe?.directions.length; i++) {
            myloop.push(
                <Text style={styles.step}>Step {i + 1}: <Text style={{fontWeight:'400'}} key={i}>{recipe?.directions[i]}</Text></Text>
            );
        }
        return (
            <View style={{paddingHorizontal: SIZES.padding * 3}}>
                {myloop}
            </View>
        )
    }

    return (
       <SafeAreaView style={styles.container}>
           <ScrollView >
                {renderBackArrow_Saved()}
                {renderHeader()}
                {renderDetailInfo()}
                {renderText(true,recipe?.description)}
                {renderBar('INGREDIENTS')}
                {renderIngredient()}
                {renderBar('INSTRUCTION')}
                {renderInstruction()}
                {renderBar('NOTES')}
                {renderText(false,recipe?.notes)}
           </ScrollView>
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    backArrow: {
        padding: SIZES.padding * 3,
        marginHorizontal: SIZES.padding,
        width: 10,
        height: 10,
    },
    title: {
        color: COLORS.secondary,
        ...FONTS.h3,
        fontWeight: "600",
        paddingHorizontal: SIZES.padding * 3,
        paddingBottom: SIZES.padding * 2
    },
    saved: {
        width: 30,
        height: 30,
        right: 0,
        paddingTop: SIZES.padding * 6,
        marginRight: SIZES.padding * 3,
        tintColor: COLORS.primary,
        // position: "absolute"
    },
    arrowSavedBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between'   
    },
    detailItem: {
        ...FONTS.body4,
        paddingHorizontal: SIZES.padding * 3,
        fontWeight: "700",
        color: COLORS.primary,
    },
    bar: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '85%',
        height: '3%',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        marginHorizontal: SIZES.padding * 3,
        marginVertical: SIZES.padding * 2
    },
    barText: {
        ...FONTS.h3,
        color: COLORS.lightYellow,
        textAlign: 'center'
    },
    description: {
        ...FONTS.body4,
        color: COLORS.primary,
        paddingHorizontal: SIZES.padding * 3,
        paddingTop: SIZES.padding * 2
    },
    normalText: {
        ...FONTS.body4,
        color: COLORS.primary,
        paddingHorizontal: SIZES.padding * 3,
        paddingBottom: SIZES.padding * 6
    },
    bullet: {
        paddingLeft: SIZES.padding * 3,
    },
    bulletText: {
        ...FONTS.body4,
        color: COLORS.primary,
    },
    step: {
        ...FONTS.body4,
        color: COLORS.primary,
        fontWeight: '700'
    }
})

export default RecipeDetail;