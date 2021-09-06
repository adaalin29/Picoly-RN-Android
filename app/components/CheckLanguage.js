import React, { Component } from 'react';
import { NativeModules, Platform } from 'react-native';

const deviceLanguage =
          Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
            : NativeModules.I18nManager.localeIdentifier;

class CheckLanguage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let language = deviceLanguage.substring(2,0);
        return(language);
    }
}

export default CheckLanguage;
