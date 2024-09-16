// Import Libraries for making a component
import React from 'react';
import { Text, View, Image } from 'react-native';
import HeaderSection from './HeaderSection';
import Button from './Button';

// Make a component
const HeaderToActives = (props) => {
    const { textStyle, HeaderContainerStyle, 
            profilePicStyle, buttonStyle, 
            buttonTextStyle } = styles;

    const navigation = props.navigation;
    return (
        <View style={HeaderContainerStyle}>
            <HeaderSection>
                <Button 
                    textStyle={buttonTextStyle}
                    buttonStyle={buttonStyle}
                    onPress={() => {navigation.navigate('ActivesScreen', {
                        data: props.totalState
                    })}}>
                    Actives
                </Button>
            </HeaderSection>
            <HeaderSection>
                <Text style={textStyle}>{props.HeaderText}</Text>
            </HeaderSection>
            <HeaderSection>
                <Button onPress={() => {navigation.navigate('ProfileScreen', {
                        data: props.totalState
                    })}}>
                    <Image 
                    style={profilePicStyle}
                    source={{uri: props.imgUrl}} 
                    />  
                </Button>
            </HeaderSection>
        </View>
    );
};

const styles = {
    HeaderContainerStyle: {
        flexDirection: 'row',
        backgroundColor: '#F8F8F8', 
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60, 
        paddingTop: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 26
    },
    profilePicStyle: {
        height: 40,
        width: 40
    },
    buttonStyle: {
        backgroundColor: '#F8F8F8',
        borderRadius: 5,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
    },
    buttonTextStyle: {
        alignSelf: 'center',
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    }
};

// Make the component available to other parts of the app
export default HeaderToActives;
