import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#263D42", //dark green
    secondary: "#D05454", //red

    //colors
    white: "#FFFFFF", 
    lightWhite: "#F2EFEF", 
    darkYellow: "#F6B816", // for rating
    lightYellow: "#FCF4DA", // for save button
    black: "#000000",
    lightBlue: "#B7CAD4", // for search

};

export const SIZES = {
    //globale sizes
    font: 20,
    radius: 10,
    padding: 10,
    
    //font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    //app dimension
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.largeTitle, lineHeight: 53},
    h1: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h1, lineHeight: 45, fontWeight:"600"},
    h2: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h2, lineHeight: 32, fontWeight:"600"},
    h3: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h3, lineHeight: 30, fontWeight:"600"},
    h3: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h4, lineHeight: 22, fontWeight:"600"},
    body1: { fontFamily: "Poppins-Regular", fontSize: SIZES.body1, lineHeight: 36},
    body2: { fontFamily: "Poppins-Regular", fontSize: SIZES.body2, lineHeight: 30},
    body3: { fontFamily: "Poppins-Regular", fontSize: SIZES.body3, lineHeight: 22},
    body4: { fontFamily: "Poppins-Regular", fontSize: SIZES.body4, lineHeight: 22},
    body5: { fontFamily: "Poppins-Regular", fontSize: SIZES.body5, lineHeight: 32},

};

const appTheme = { COLORS, SIZES, FONTS };
export default appTheme; 