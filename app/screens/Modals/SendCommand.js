import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, KeyboardAvoidingView } from 'react-native';

import styles from '../../styles';
import lang from '../../Languages';

import Cancel from '../../../assets/images/cancel.svg';

import FlashMessage from "react-native-flash-message";

export default class SendCommand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            nameInput: null,
            messageInput: null,
        }
    }

    toggleModal(text) {
        const show = this.state.showModal;
        this.setState({ showModal: !show });
        if(text)
            alert(text);
    }

    sendOrder(){
        if(this.state.nameInput == null || this.state.messageInput == null){
            this.myLocalFlashMessage.showMessage({
                message: lang.strings.error,
                description: lang.strings.fields,
                type: "default",
                backgroundColor: "#E32340",
              });
        }else{
            this.setState({blockedRequest: true});
        fetch('https://client.picoly.app/api/sendorder', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                restaurant_id: global.restaurant_id,
                table_id:  global.table_id,
                orderName:this.state.nameInput,
                orderMessage:this.state.messageInput,
                lang:lang.strings.getLanguage(),
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                //alert(JSON.stringify(responseJson));
                if(responseJson.success){
                    this.setState({
                        nameInput:null,
                        messageInput:null,
                    });
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
                alert(JSON.stringify(error));
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
                    {/* <KeyboardAvoidingView behavior='position' style = {{ flex: 1, width: '100%'}}> */}
                        <KeyboardAvoidingView keyboardVerticalOffset={-90} behavior='position' style={{ width: '80%', textAlign: 'center', backgroundColor: '#fff', padding: 30, borderRadius: 5 }}>
                            <TouchableOpacity onPress={() => this.toggleModal()} style={{ alignSelf: 'flex-end' }}>
                                <Cancel />
                            </TouchableOpacity>

                            <Text style={styles.cartModalTitle}>{lang.strings.writeUs}</Text>
                            <Text style={styles.cartModalMessage}>{lang.strings.completeForm}</Text>

                            <TextInput
                                placeholder={'Nume'}
                                placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                                numberOfLines={1}
                                onChangeText={text => this.setState({ nameInput: text })}
                                returnKeyType="next"
                                onSubmitEditing={() => { this.messageTextInput.focus(); }}
                                blurOnSubmit={false}
                                style={{ width: '100%', backgroundColor: '#EEEEEE', paddingLeft: 10 }}>
                            </TextInput>

                            <TextInput
                                placeholder={'Mesaj'}
                                placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                                numberOfLines={8}
                                multiline={true}
                                onChangeText={text => this.setState({ messageInput: text })}
                                ref={(input) => { this.messageTextInput = input; }}
                                returnKeyType="done"
                                onSubmitEditing={() => { this.sendOrder() }}
                                style={{ width: '100%', backgroundColor: '#EEEEEE', paddingLeft: 10, marginTop: 10,textAlignVertical: 'top'}}>
                            </TextInput>

                            <TouchableOpacity
                                onPress={() => { this.sendOrder() }}
                                style={{ width: '100%', height: 50, backgroundColor: '#E32340', borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                                <Text style={styles.sendButtonText}>{lang.strings.send}</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                        {/* </KeyboardAvoidingView> */}
                </ScrollView>
                <FlashMessage style = {{zIndex:999}} ref={ref => this.myLocalFlashMessage = ref} position="top" />
            </Modal>
        )
    }
}