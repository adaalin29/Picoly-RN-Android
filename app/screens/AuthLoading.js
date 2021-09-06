import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import lang from '../Languages';


class AuthLoading extends Component {
    constructor() {
        super();
    }
    componentDidMount(){
        this.getData();
      //   lang.getnew().then(() => {
      //     this.forceUpdate()
      // })
    }
    storeData = async () => {
        try {
          await AsyncStorage.setItem('first_time_getwaiter', 'yes')
        } catch (e) {
          // saving error
        }
    }
    
    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('first_time_getwaiter')
          // const in_app = await AsyncStorage.getItem('in_app')
          // const table_id = await AsyncStorage.getItem('restaurant_id')
          // const restaurant_id = await AsyncStorage.getItem('table_id')
          // alert(restaurant_id);
          if(value !== null) {
            // if(in_app ==null || in_app =='no'){
              const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
                });
                this.props.navigation.dispatch(resetAction);
            // }
            // const resetAction = StackActions.reset({
            //   index: 0,
            //   actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
            // });
            // this.props.navigation.dispatch(resetAction);
          }
          else{
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'FirstTime' })],
              });
              this.props.navigation.dispatch(resetAction);
          }
        } catch(e) {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
              });
              this.props.navigation.dispatch(resetAction);
        }
    }

    render() {
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator />
            </View>
        )
    }
}

export default AuthLoading;