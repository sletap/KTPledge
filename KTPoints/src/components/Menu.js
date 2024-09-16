import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import Header from './Header';

class Menu extends Component {
    static navigationOptions = {
        title: '',
        headerStyle: {
            backgroundColor: '#2c3e50',
        },
        headerTintColor: '#fff',
        headerLeft: null
    };



    render() {
        const {navigate} = this.props.navigation;
        return(
            <ScrollView>
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
                                    onPress={() => navigate('ProfileScreen', {
                                    data: this.props.navigation.state.params.data
                                    })}
                                >
                                    PROFILE
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
                                    onPress={() => navigate('ActivesScreen', {
                                    data: this.props.navigation.state.params.data
                                    })}
                                >
                                    ACTIVES
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
                                    onPress={() => navigate('LeadersScreen', {
                                    data: this.props.navigation.state.params.data
                                    })}
                                >
                                   LEADERS
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
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor: '#2c3e50',
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
      backgroundColor:  '#2c3e50',
      color: '#FFF'
    }
});

export default Menu;