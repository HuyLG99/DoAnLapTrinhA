import React from 'react';

import { ImageBackground,View,StyleSheet} from 'react-native';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { boxImg, coinImg } from '../shared/imageURL';


const Box =({onPress,name})=>{
    return(
        <ImageBackground style={styles.box} source={{uri:boxImg}}  >
            {/* <ImageBackground style={styles.coin} source={{uri:coinImg}}  > */}
                <View style={{backgroundColor:'#f2cc09'}}>
                    <Button
                        onPress={onPress}
                        buttonStyle={styles.btn}
                        icon={
                            <Icon
                            name={name}
                            size={50}
                            color="white"
                            />}/>
                </View>
            {/* </ImageBackground> */}
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    btn:{
        height:60,
        width:60,
        backgroundColor:'#f2cc09',
    },
    box:{
        resizeMode:'center',
        justifyContent:'center',
        alignItems:'center',
        width:80,
        height:80,
    },
    coin:{
        resizeMode:'center',
        justifyContent:'center',
        alignItems:'center',
        width:"auto",
        height:70,
    }
})

export default Box