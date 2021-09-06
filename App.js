import React from 'react';
import {
  Provider
} from 'react-redux';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import store from './app/redux_components/store';
import EStyleSheet from 'react-native-extended-stylesheet';
import NetInfo from "@react-native-community/netinfo";
import { NativeModules, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import lang from './app/Languages';

import SocketConfig from './app/SocketConfig';


// console.disableYellowBox = true;

import Navigator from './app/routes';
import styles from './app/styles';

const deviceLanguage =
          Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
            : NativeModules.I18nManager.localeIdentifier;

            
class GoOrder extends React.Component {
  
  constructor() {
    super();
    this.state = {
        network: null,
        storageLanguage:null,
        showLoading: true,
    }
  }

  changeLang(newLang) {
    lang.strings.setLanguage(newLang);
    this.forceUpdate()
  }
  getSavedLanguage = async () => {
    try {
        return await AsyncStorage.getItem('savedLanguage');
    } catch (error) {
        return null;
    }
  };
  // setSekectedLanguage(savedLanguage){
  //   AsyncStorage.setItem('savedLanguage',savedLanguage);
  // }
  componentDidMount(){
    vthis = this;
    let language = deviceLanguage.substring(2,0);
    this.getSavedLanguage().then(savedLanguage => {
      // alert(savedLanguage);
      if (savedLanguage!=null){
          language = savedLanguage;
      }
    });
    setTimeout(()=>{
      lang.getnew().then(() => {
        let foundLanguage = null;
        let defaultLanguage = null;
        lang.activeLanguages.map(item=>{
          if(item.abbr == language){
            foundLanguage = language;
          }
          if(item.default)
          defaultLanguage = item.abbr;
        });
        if(foundLanguage ==null)
          foundLanguage = defaultLanguage;
        lang.strings.setLanguage(foundLanguage);
        this.setState({showLoading: false});
        this.setState({time:123})
      })
    },1);
    NetInfo.addEventListener(state => {
        this.setState({network: state.isConnected})
    });
  }

  reload(){
    var i = this.state.network;
    this.setState({network: i});
  }

  render(){
    if(this.state.network == false){
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <View style={styles.swiperImageCont}>
              <Image resizeMode="contain" source={require('./assets/images/nointernet.png')} style={{width: '100%', height: '100%'}} />
          </View>
          <Text style={[styles.slideTitle,{marginTop:10}]}>Pentru a continua ai nevoie de o conexiune la internet.</Text>
          <TouchableOpacity style={{marginTop:15}} onPress={() => this.reload()}>
          <Text style={styles.helpTreciPeste}>Reîncearcă.</Text>
          </TouchableOpacity>
      </View>
      );
    }
    if(this.state.showLoading){
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="large" color="#E32340"/>
        </View>
      )
    } else{
      return(
          <Provider store={store}>
            <StatusBar backgroundColor="#E32340" barStyle="dark-content" />
            <Navigator key = {this.state.time} />
            <SocketConfig/>
          </Provider>
      );
    }
  }
}

EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!
  $mainRed: '#E32340',
  $gray: '#8A8A8A'
});

export default() =>   <GoOrder />;