import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import lang from '../Languages';
import styles from '../styles.js';
import QRCodeScanner  from 'react-native-qrcode-scanner';
import { RNCamera as Camera } from "react-native-camera";
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { setRestaurant } from '../redux_components/actions';
import emitter from 'tiny-emitter/instance';


class ScanQr extends Component {

    onSuccess (e) {
        fetch('https://client.picoly.app/api/connectWithVerification', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: e.data,
                version: 'major-update',
                device: 'android',
                lang:lang.strings.getLanguage(),
            })
        }).then((response) => response.json())
            .then((responseJson) => {
              // alert(JSON.stringify(responseJson));
                if(responseJson.update){
                    Alert.alert(
                        lang.strings.titleUpdate,
                        lang.strings.textUpdate,
                        [
                            {
                            text: lang.strings.giveUp,
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                            },
                            {text: lang.strings.updateApp, onPress: () => Linking.openURL(responseJson.link)},
                        ],
                        {cancelable: false},
                    );
                } else{
                  this.props.setRestaurant(responseJson);
                  global.restaurant_id = responseJson.restaurant.id;
                  global.table_id = responseJson.table.id;
                  //restaurant_connect
                  emitter.emit('restaurant_connect', responseJson.restaurant.id,responseJson.table.id);
                  const resetAction = StackActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
                    });
                  this.props.navigation.dispatch(resetAction);
              }
            }).catch((error) => {
                alert(error);
        });
    }
    render() {
        return(
            <QRCodeScanner
                ref={(node) => { this.scanner = node }}
                onRead={(e) => this.onSuccess(e)}
                showMarker={true}
                // cameraProps={{useCamera2Api: true, flashMode: Camera.Constants.FlashMode.auto }}
                // reactivateTimeout={300}
                vibrate={true}
                topContent={
                    <View style={[styles.qrCodeBackground,{zIndex:10}]}>
                         <Image style={{width:'40%',height:50,resizeMode:'contain'}} source={require('../../assets/images/logo.png')} />
                    </View>
                    }
                bottomContent={
                    <View style={styles.qrCodeBackground}>
                         <TouchableOpacity style={styles.welcomeDemoButon} onPress={() => this.props.navigation.goBack()}>
                            <Text style={styles.welcomeDemoButonText}>{lang.strings.back}</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.qrCodeSkip} onPress={() => this.props.navigation.navigate('Dashboard')}>
                            <Text style={styles.qrCodeSkipText}>Skip!</Text>
                        </TouchableOpacity> */}
                    </View>
                    
                    }
                />

            
            )
    }
}

const mapStateToProps = state => ({
    restaurant: state.restaurant
});
const mapDispatchToProps = dispatch => ({
    setRestaurant: (data) => dispatch(setRestaurant(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScanQr);