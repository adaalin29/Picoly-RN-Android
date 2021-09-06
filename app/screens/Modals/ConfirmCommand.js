import React, { Component } from 'react';
import { View, Modal, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles';
import lang from '../../Languages';

import Cancel from '../../../assets/images/cancel.svg';
import FlashMessage from "react-native-flash-message";

export default class ConfirmCommand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            products:[],
            message:null,
            table_id:null,
            restaurant_id:null,
            total:0,
        }
    }

    toggleModal(products,message,table_id,restaurant_id,total) {
        const show = this.state.showModal;
        this.setState({
             showModal: !show,
            products:products,
            message:message,
            table_id:table_id,
            restaurant_id:restaurant_id,
            total:total,
             });
    }

    sendCommand(){
        if(this.state.products.length>0){
            this.setState({blockedRequest: true});
        fetch('https://client.picoly.app/api/sendcommand', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                restaurant_id: this.state.restaurant_id,
                table_id:  this.state.table_id,
                message:this.state.message,
                products:this.state.products,
                total:this.state.total,
                message:this.state.message,
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
                    this.props.comandaFinalizata(responseJson.success);
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
                alert(JSON.stringify(error));
        });
        }else{
            this.myLocalFlashMessage.showMessage({
                message: lang.strings.error,
                description: lang.strings.emptyCart,
                type: "warn",
                backgroundColor: "#E32340",
            });
        }
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
                        <Text style={styles.cartModalMessage}>{lang.strings.checkCommand}</Text>
                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 100 }}>
                            <TouchableOpacity
                                style={[styles.cartModalButton, { marginRight: 10 }]}
                                onPress={() => { this.toggleModal() }}>

                                <Text style={styles.cartModalButtonText}>{lang.strings.no}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cartModalButton}
                                onPress={() => {this.sendCommand()}}>

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