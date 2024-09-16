import React, { Component } from 'react';
import { View, StyleSheet,Image,Text, ScrollView,Dimensions } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import HeaderToActives from './HeaderToActives';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import * as firebase from 'firebase';


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            major: '',
            meetingsLeft: '',
            points: '',
            standing: '',
            name: '',
            year: '',
            pc: '',
            img: '',
        }
    }

    componentWillMount(){
       const { navigation } = this.props;
       const uniqname = navigation.getParam('uniq', 'NO-ID')
       console.log(this.state.data);
       url = 'https://firestore.googleapis.com/v1/projects/ktpoints-68071/databases/(default)/documents/users/';
       apiCall = url.concat(uniqname);
       this.setState({url: apiCall});
       console.log(this.state.url);
       fetch(apiCall)
       .then((response) => {
           if (!response.ok) throw Error(response.statusText);
           return response.json();
         })
         .then((data) => {
           this.setState({
               major: data['fields']['major']['stringValue'],
               meetingsLeft: data['fields']['meetings_left']['integerValue'],
               points: data['fields']['points']['integerValue'],
               standing: data['fields']['standing']['stringValue'],
               name: data['fields']['name']['stringValue'],
               year: data['fields']['year']['stringValue'],
               pc: data['fields']['pledge_class']['stringValue']
           })
         });
        
        var storage = firebase.storage();
        console.log(storage)
        var storageRef = storage.ref('profile_pictures/edknight.jpg');
        var gsUrl = 'gs://ktpoints-68071.appspot.com/profile_pictures/'
        gsUrl = gsUrl.concat(uniqname)
        gsUrl = gsUrl.concat('.jpg')
        console.log(gsUrl)
        var gsReference = storage.refFromURL(gsUrl)
        gsReference.getDownloadURL().then((data) => {
            this.setState({img: data})
        })
    }
    
    static navigationOptions = {
        title: 'Profile',
        headerStyle: {
            backgroundColor: '#2c3e50',
        },
        headerTintColor: '#fff',
        headerLeft: null
    };

    render() {
        const barWidth = Dimensions.get('screen').width - 30;
        return (
            <ScrollView>
                <View>
                    <HeaderToActives HeaderText={this.state.name} 
                            navigation={this.props.navigation}
                            totalState={this.props.navigation.state.params.data}/>
                    <Card>
                        <CardSection>
                            <Image 
                            style={{height: 300, flex: 1, width: null}}
                            source={{uri: this.state.img}}
                            />
                        </CardSection>
                    </Card>
                    <Card>
                        <CardSection>
                            <Text style = {styles.text_style}>Major: {this.state.major} 
                            </Text>
                        </CardSection>

                        <CardSection>
                            <Text style = {styles.text_style}>Grade: {this.state.year} 
                            </Text>
                        </CardSection>

                        <CardSection>
                            <Text style = {styles.text_style}>Standing: {this.state.standing}
                            </Text>
                        </CardSection>

                        <CardSection>
                            <Text style = {styles.text_style}>Pledge Class: {this.state.pc}
                            </Text>
                        </CardSection>
                    </Card>
                    <Card>
                        <CardSection>
                            <Text style = {styles.text_style}>Current Points: {this.state.points}</Text>
                        </CardSection>
                    
                        <CardSection>
                            <Text style = {styles.text_style}>Meetings Left: {this.state.meetingsLeft}</Text>
                        </CardSection>
                    </Card>
                    <Card>
                        <CardSection>
                            <Text style = {styles.text_style}> Points Progress: 
                            </Text>
                        </CardSection>

                        <CardSection> 
                            <ProgressBarAnimated
                            backgroundColor={'#fff'}
                            maxValue={100}
                            width={barWidth}
                            value={this.state.points}
                            backgroundColorOnComplete="#7CFC00"
                            />
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
    },
    buttonText:{
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '700'
    }, 
    loginButton:{
      backgroundColor:  '#2c3e50',
       color: '#fff'
    },
    text_style:{
         fontSize: 24,
         textAlign: 'center',
         color: '#fff'
      }
});

export default Profile;