import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import Header from './Header';

class Menu extends Component {
    
    render() {
        const {navigate} = this.props.navigation;
        return(
            <View>
                <Card>
                    <CardSection>
                        <View style={styles.buttonContainer}>
                            <Button 
                                buttonStyle={styles.loginButton}
                                textStyle={styles.buttonText}
                                onPress={() => navigate('MainScreen')}
                            >
                                MAIN
                            </Button>
                        </View>
                    </CardSection>
                </Card>


                <Card>
                    <CardSection>
                        <View style={styles.buttonContainer}>
                            <Button 
                                buttonStyle={styles.loginButton}
                                textStyle={styles.buttonText}
                                onPress={() => navigate('LoginScreen')}
                            >
                                LOG OUT
                            </Button>
                        </View>
                    </CardSection>
                </Card>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 20,
        flex: 1,
        width: null
    },
    buttonText:{
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20
    }, 
    loginButton:{
      backgroundColor:  '#2980b6',
      color: '#FFF'
    }
});

export default Menu;