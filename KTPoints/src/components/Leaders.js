import React, { Component } from 'react';
import { View, StyleSheet,Image,Text, ScrollView,Dimensions, TouchableOpacity } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Header from './Header';
import Button from './Button';
import * as firebase from 'firebase';

class Leaders extends Component{
    constructor(props) {
        super(props)
        this.state = {
            sorted_members:[],
            major: '',
            meetingsLeft: '',
            points: '',
            standing: '',
            name: '',
            year: '',
            pc: '',
            url: '',
            tasks: [],
            img: '',
            uniqname: ''
        }
    }
    componentWillMount() {
        url = 'https://firestore.googleapis.com/v1/projects/ktpoints-68071/databases/(default)/documents/users/';
        //this.setState({url: url});
        //console.log(this.state.url);
        fetch(url)
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
          })
          .then((data) => {
            //console.log(data);
            //console.log("This was data")
            sorted_members = data["documents"]
            sorted_members.sort(function(first, second) {
                //console.log(second["fields"]["points"]["integerValue"])
                //console.log(first["fields"]["points"]["integerValue"])
                return second["fields"]["points"]["integerValue"] - first["fields"]["points"]["integerValue"];
              });
            //console.log("Should be sorted now")
            //console.log(sorted_members)
            this.setState({
                sorted_members: sorted_members

            })
            //console.log(this.state.sorted_members)
          });
    }

    goToProfPage = (uniqname)  => {
        console.log("goToProfPage");
        const {navigate} = this.props.navigation;
        url = 'https://firestore.googleapis.com/v1/projects/ktpoints-68071/databases/(default)/documents/users/';
        url = url.concat(uniqname)
        fetch(url)
        .then((response)  => {
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
            pc: data['fields']['pledge_class']['stringValue'],
            uniqname: data['fields']['uniqname']['stringValue']
        })
        var storage = firebase.storage();
        var gsUrl = 'gs://ktpoints-68071.appspot.com/profile_pictures/'
        gsUrl = gsUrl.concat(this.state.uniqname)
        gsUrl = gsUrl.concat('.jpg')
        var gsReference = storage.refFromURL(gsUrl)
        gsReference.getDownloadURL().then((data) => {
            this.setState({img: data})
        })
        navigate('ProfileScreen', {
            data: this.state
            })
            
        });
    }


    static navigationOptions = {
        title: 'Leaderboard',
        headerStyle: {
            backgroundColor: '#2c3e50',
        },
        headerTintColor: '#fff',
    };

    render() {
        const listleaders = this.state.sorted_members
        .map(bro => (
          <View key={bro['fields']['name']['stringValue']}>
              <Card style={styles.containerStyle}>
              <TouchableOpacity onPress={() => {this.goToProfPage(bro['fields']['uniqname']['stringValue'])}}>
                  <CardSection style={styles.containerStyle}>
                      <Text style={styles.text_style}>{bro['fields']['name']['stringValue']}</Text>
                  </CardSection>
                  <CardSection style={styles.containerStyle}>
                       <Text style={styles.text_style}>{bro['fields']["points"]["integerValue"]}</Text>
                  </CardSection>
                  </TouchableOpacity>
              </Card>
          </View>
      ));
        return (
        <ScrollView>
            {listleaders}
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
        color: '#2c3e50',
        textAlign: 'center',
        fontWeight: '700'
    }, 
    loginButton:{
      backgroundColor:  '#2c3e50',
       color: '#fff'
    },
    text_style:{
         fontSize: 18,
         textAlign: 'center',
         color: '#fff'
      },
    header_text:{
        textDecorationLine: 'underline',
        fontSize: 24,
        textAlign: 'center',
        color: '#2c3e50'
    },
      headerContentStyle: {
        flex: 1,
        backgroundColor: '#2c3e50',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center' 
    },
    CategoryStyle: {
        fontSize: 18,
        fontWeight: '400',
        color: '#fff'
    },
    NumberStyle: {
        fontSize: 20,
        fontWeight: '200'
    },
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#2c3e50',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        borderColor: '#fff',
        position: 'relative'
    },

});

export default Leaders;