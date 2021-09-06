import React, { Component } from 'react';
import { NativeModules, Platform } from 'react-native';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from '../styles.js';
import lang from '../Languages';

import SvgQr from '../../assets/images/qr-code.svg';
// import { SvgUri } from 'react-native-svg-uri';

class Welcome extends Component {
    setScanned = async () => {
        try {
          await AsyncStorage.setItem('in_app', 'no')
        } catch (e) {
          // saving error
        }
    }
    componentDidMount(){
        this.setScanned();
    }
    render() {
        return(
            <View style={styles.welcomeContainer}>
                <View style={styles.welcomeContent}>
                    <Image style={{width:'80%',height:80,resizeMode:'contain'}} source={require('../../assets/images/logo.png')} />

                    <SvgQr />
                    <Image source={require('../../assets/images/qr-code.svg')} />

                    <Text style={styles.welcomeTextMare}>{lang.strings.welcomeTitle}</Text>
                    <Text style={styles.welcomeTextMic}>{lang.strings.welcomeScan}</Text>
                    <TouchableOpacity style={styles.welcomeScaneazaButon} onPress={() => this.props.navigation.navigate('ScanQr')}>
                        <Text style={styles.welcomeScaneazaButonText}>{lang.strings.scan}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.welcomeDemoButon} onPress={() => this.props.navigation.navigate('Dashboard')}>
                        <Text style={styles.welcomeDemoButonText}>{lang.strings.demo}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Welcome;