import { StyleSheet } from "react-native"

const primaryColor = '#55847A'
const secondary = 'white'
const black = 'black'
const regularFont = 'Outfit-Medium'

const Styles = StyleSheet.create({
        viewOne:{
            backgroundColor: primaryColor,
            borderRadius: 500,
            height: 200,
            width: 200,
            position: 'absolute',
            top: -100,
            left: -100,
            opacity: 0.5
        },
       viewTwo: {
            backgroundColor: primaryColor,
            borderRadius: 500,
            height: 200,
            width: 200,
            position: 'absolute',
            top: -130,
            left: -30,
            opacity: 0.5
        },
        mainImage:{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.9,
            justifyContent:'center',
            alignItems:'center',
            position:'relative',
            top:40,
            marginTop:20
        },
        mainTitle:{
            fontSize: 25,
            fontFamily: 'Outfit-Medium',
            color: 'black',
            textAlign: 'center', 
        },
        subTitle:{
            fontSize:14,
            fontFamily:'Poppins-Medium',
            color:'black',
            textAlign:'center',
            
        },
        purpose:{
            fontFamily:'Poppins-Medium',
            fontSize:14,
            textAlign:'center',
            color:primaryColor
        },
        forgot:{
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
            textAlign: 'center',
            color: '#55847A'
        },
        TO:{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.2
        },
        TI: {
                height:'20%',
                width:'80%'
              },
        MainText:{
            fontFamily: 'Poppins-Medium',
            fontSize: 23,
            color: 'black',
            textAlign: 'center',
        },
        pentagon:{
            position: "absolute",
            opacity: 0.9,
            top: 250,
            width: 0,
            borderStyle: "solid",
            borderLeftWidth: 200,
            borderLeftColor: "transparent",
            borderRightWidth: 200,
            borderRightColor: "transparent",
            borderTopWidth: 25,
            borderTopColor: "#55847A",
          }

        
     })
export { primaryColor, secondary, regularFont, black ,Styles }