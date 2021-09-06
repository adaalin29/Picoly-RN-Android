import React, { Component } from 'react';
import { View, Modal, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles';
import lang from '../../Languages';

import Cancel from '../../../assets/images/cancel.svg';

import FlashMessage from "react-native-flash-message";

export default class ConfirmCommandService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            service:[],
        }
        if(this.props.service) this.state.service =  this.props.service;
    }

    toggleModal() {
        const show = this.state.showModal;
        this.setState({ showModal: !show });
    }

    sendDeals(){
        this.setState({blockedRequest: true});
        fetch('https://client.picoly.app/api/sendservice', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                restaurant_id: this.props.restaurant_id,
                table_id:  this.props.table_id,
                serviceTitle:this.state.service.name,
                serviceDescription:this.state.service.description,
                servicePrice:this.state.service.price,
                lang:lang.strings.getLanguage(),
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success){
                    this.myLocalFlashMessage.showMessage({
                        message: lang.strings.success,
                        description: lang.strings.commandFlash,
                        type: "success",
                      });
                    setTimeout(() => {
                        this.toggleModal()
                    }, 1200);
                }
                else{
                    this.setState({blockedRequest: false});
                    if(responseJson.error == lang.strings.notTable){
                        this.setState({isConfirmModalVisible: false});
                        Alert.alert(
                            lang.strings.notTable,
                            lang.strings.reScan,
                            [
                              {
                                text: lang.strings.giveUp,
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              {text: lang.strings.scanButton, onPress: () => this.props.navigation.navigate('ScanQr')},
                            ],
                            {cancelable: false},
                          );
                    }
                    else{
                        alert(responseJson.error);
                    }
                }
            }).catch((error) => {
                this.setState({blockedRequest: false});
        });
    }
    render() {
        return (
            <Modal
                animationType="slide"
                visible={this.state.showModal}
                transparent={true}
                onRequestClose={() => { this.toggleModal() }}>

                <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.75)' }}>
                    <View style={{ width: '80%', backgroundColor: '#FFF', padding: 30, borderRadius: 5 }}>
                        <TouchableOpacity onPress={() => this.toggleModal()} style={{ alignSelf: 'flex-end', paddingBottom: 50 }}>
                            <Cancel />
                        </TouchableOpacity>
                        <Text style={styles.cartModalTitle}>{lang.strings.confirmCommand}</Text>
                        <Text style={styles.cartModalMessage}>{lang.strings.checkCommandOrder}</Text>
                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 100 }}>
                            <TouchableOpacity
                                style={[styles.cartModalButton, { marginRight: 10 }]}
                                onPress={() => { this.toggleModal() }}>

                                <Text style={styles.cartModalButtonText}>{lang.strings.no}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cartModalButton}
                                onPress={() => {this.sendDeals();}}>

                                <Text style={styles.cartModalButtonText}>{lang.strings.yes}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <FlashMessage style = {{zIndex:999}} ref={ref => this.myLocalFlashMessage = ref} position="top" />
            </Modal>
        )
    }
}