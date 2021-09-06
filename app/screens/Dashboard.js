import React, { Component } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, Modal , Alert} from 'react-native';
import styles from '../styles.js';
import lang from '../Languages';
import CheckLanguage from '../components/CheckLanguage';

import SvgWaiter from '../../assets/images/icon-waiter.svg';
import SvgDrinks from '../../assets/images/icon-drinks.svg';
import SvgCancelOrder from '../../assets/images/icon-cancel-order.svg';
import SvgPaycheck from '../../assets/images/icon-paycheck.svg';
import SvgClose from '../../assets/images/icon-close.svg';

import Header from '../components/Header';
import OpenedMenu from '../components/OpenedMenu';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { setRestaurant } from '../redux_components/actions';
import AsyncStorage from '@react-native-community/async-storage';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            action: '',
            notToSee: false,
            isModalVisible: false,
            isConfirmModalVisible: false,
            blockedRequest: false,
            messageRequest: lang.strings.alreadyCalled,
            isPayTypeVisible:false,
            isMenuOpened: false, // on every menu page
        }

        this.openMenu = this.openMenu.bind(this); // on every menu page
        this.closeMenuAction = this.closeMenu.bind(this); // on every menu page
        this.closePayTypeModal = this.closePayTypeModal.bind(this);
    }
    callWaiter(){
        this.setState({blockedRequest: true});
        fetch('https://client.picoly.app/api/callWaiter', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                version: 'major-update',
                restaurant_id: this.props.restaurant.restaurant.restaurant.id,
                table_id:  this.props.restaurant.restaurant.table.id,
                lang:lang.strings.getLanguage(),
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                //alert(JSON.stringify(responseJson));
                
                if(responseJson.success){
                    this.props.setRestaurant(responseJson);
                    this.openModal();
                    this.setState({messageRequest: lang.strings.alreadyCalled});
                    setTimeout(() => {
                        this.setState({blockedRequest: false});
                    }, 120000);
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

    setNotToSee(){
        var inv = !this.state.notToSee;
        this.setState({notToSee : inv});
    }

    openModal = () => {
        this.setState({isConfirmModalVisible: false});
        this.setState({isModalVisible: true});
    }

    sendRequest(){
        if(this.state.action == 'bill'){      
            this.requestBill();
        }
        if(this.state.action == 'request'){        
            this.callWaiter();
        }
        if(this.state.action == 'turn'){
            this.oneMoreTurn();
        }
        if(this.state.action == 'cancel'){
            this.cancelOrder();
        }
    }

    cereNota(tip){
        this.state.isPayTypeVisible = false;
        this.requestBill(tip);
    }

    requestBill(tip){
        this.setState({blockedRequest: true});
        fetch('https://client.picoly.app/api/requestBill', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                version: 'major-update',
                restaurant_id: this.props.restaurant.restaurant.restaurant.id,
                table_id:  this.props.restaurant.restaurant.table.id,
                pay_type: tip,
                lang:lang.strings.getLanguage(),
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                
                if(responseJson.success){
                    this.props.setRestaurant(responseJson);
                    this.setState({isConfirmModalVisible: false});     
                    this.setState({messageRequest: lang.strings.alreadyCalled});
                    setTimeout(() => {
                        this.setState({blockedRequest: false});
                    }, 120000);         
                   this.props.navigation.navigate('Feedback', {reloadAppConst: true}, 'feedKey');
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
                alert(JSON.stringify(error));
        });
    }

    cancelOrder(){
        this.setState({blockedRequest: true});
        fetch('https://client.picoly.app/api/cancelOrder', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                version: 'major-update',
                restaurant_id: this.props.restaurant.restaurant.restaurant.id,
                table_id:  this.props.restaurant.restaurant.table.id,
                lang:lang.strings.getLanguage(),
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                
                if(responseJson.success){
                    this.props.setRestaurant(responseJson);
                    this.openModal();
                    setTimeout(() => {
                        this.setState({blockedRequest: false});
                    }, 120000);
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

    oneMoreTurn(){
        this.setState({blockedRequest: true});
        fetch('https://client.picoly.app/api/oneMoreTurn', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                version: 'major-update',
                restaurant_id: this.props.restaurant.restaurant.restaurant.id,
                table_id:  this.props.restaurant.restaurant.table.id,
                lang:lang.strings.getLanguage(),
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                
                if(responseJson.success){
                    this.props.setRestaurant(responseJson);
                    this.openModal();
                    setTimeout(() => {
                        this.setState({blockedRequest: false});
                    }, 120000);
                }
                else{
                    this.setState({blockedRequest: false});
                    if(responseJson.error == lang.strings.notTable){
                        this.setState({isConfirmModalVisible: false});
                        console.log(lang.strings.giveUp);
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

    // on every menu page
    openMenu = () => {
        this.setState({isMenuOpened: true});
    }
    closeMenu = () => {
        this.setState({isMenuOpened: false});
    }

    closePayTypeModal = () => {
        this.setState({isPayTypeVisible: false});
    }

    showPayType = () => {
        if(!this.props.restaurant.restaurant){
        Alert.alert(
            lang.strings.scanCode,
            lang.strings.actionQr,
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
          return;
        }

        if(this.state.blockedRequest){
            Alert.alert(
                lang.strings.pleaseWait,
                this.state.messageRequest,
                [
                  {
                    text: lang.strings.alright,
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
              );
            return;
        }
        this.setState({isPayTypeVisible: true});
    }


    closeModal = () => {
        this.setState({isModalVisible: false});
    }

    openConfirmModal = (actiune) => {
        if(!this.props.restaurant.restaurant)
        Alert.alert(
            lang.strings.scanCode,
            lang.strings.actionQr,
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

        else{
            this.setState({action: actiune});
            if(actiune == 'request' && this.state.blockedRequest){
                Alert.alert(
                    lang.strings.pleaseWait,
                    this.state.messageRequest,
                    [
                      {
                        text: lang.strings.alright,
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                    ],
                    {cancelable: false},
                  );
                return;
            }
            if(actiune == 'turn' && this.state.blockedRequest){
                Alert.alert(
                    lang.strings.pleaseWait,
                    this.state.messageRequest,
                    [
                      {
                        text: lang.strings.alright,
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                    ],
                    {cancelable: false},
                  );
                return;
            }
            if(actiune == 'cancel' && this.state.blockedRequest){
                Alert.alert(
                    lang.strings.pleaseWait,
                    this.state.messageRequest,
                    [
                      {
                        text: lang.strings.alright,
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                    ],
                    {cancelable: false},
                  );
                return;
            }
            if(actiune == 'bill' && this.state.blockedRequest){
                Alert.alert(
                    lang.strings.pleaseWait,
                    this.state.messageRequest,
                    [
                      {
                        text: lang.strings.alright,
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                    ],
                    {cancelable: false},
                  );
                return;
            }
           // this.state.action = action;
            if(this.state.notToSee){
                setTimeout(() => {
                    this.sendRequest();
                }, 500);
               
            }
            else{
                this.setState({isConfirmModalVisible: true});
            }
            
        }
    }
    closeConfirmModal = () => {
        this.setState({isConfirmModalVisible: false});
    }
    // setScanned = async () => {
    //     try {
    //       await AsyncStorage.setItem('in_app', 'yes')
    //     } catch (e) {
    //       // saving error
    //     }
    // }
    // setRestaurant = async () => {
    //     try {
    //       await AsyncStorage.setItem('restaurant_id', this.props.restaurant.restaurant.restaurant.id)
    //     } catch (e) {
    //       // saving error
    //     }
    // }
    // setTable = async () => {
    //     try {
    //       await AsyncStorage.setItem('table_id', props.restaurant.restaurant.table.id)
    //     } catch (e) {
    //       // saving error
    //     }
    // }

    // componentDidMount(){
    //     this.setScanned();
    //     this.setRestaurant();
    //     this.setTable();
    // }
    render() {
        return(
            <View style={{flex: 1}}>
                <Header navigation={this.props.navigation} onOpenMenu={() => this.openMenu()} />
                <OpenedMenu opened={this.state.isMenuOpened} navigation={this.props.navigation} onClose={() => this.setState({isMenuOpened: false})}/>
                <View style={{flex: 1}}>
                    <ScrollView>
                        <View style={styles.subHeaderContainer}>
                            <Image style={styles.subHeaderImageBackground} source={require('../../assets/images/header-waves.png')} />
                            <View style={styles.subHeaderTextOver}>
                                {this.props.restaurant.restaurant ? 
                                <Text style={styles.welcomeTextNumeRestaurant}>{this.props.restaurant.restaurant.restaurant.name}</Text>                          
                                :
                                <Text style={styles.welcomeTextMare}>{lang.strings.welcome}</Text>
                                }
                                <Text style={styles.welcomeTextMic}>{lang.strings.dashboardSubtitle}</Text>
                            </View>
                        </View>
                        <View style={styles.dashboardMenuItems}>
                            <TouchableOpacity
                                onPress={() => this.openConfirmModal('request')} 
                                style={styles.dashboardMenuItem}>
                                    
                                <SvgWaiter width={70} height={70} style={this.state.blockedRequest ? {opacity:0.3} : null} />
                                <Text style={[styles.dashboardMenuItemText,this.state.blockedRequest ? {opacity:0.3} : null]}>{lang.strings.callWaiter}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dashboardMenuItem}  onPress={() => this.openConfirmModal('turn')} >
                            <SvgDrinks width={60} height={60} style={this.state.blockedRequest ? {opacity:0.3} : null} />
                                <Text style={[styles.dashboardMenuItemText,this.state.blockedRequest ? {opacity:0.3} : null]}>{lang.strings.anotherTime}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dashboardMenuItem} onPress={() => this.openConfirmModal('cancel')} >
                            <SvgCancelOrder width={70} height={70} style={this.state.blockedRequest ? {opacity:0.3} : null} />
                                <Text style={[styles.dashboardMenuItemText,this.state.blockedRequest ? {opacity:0.3} : null]}>{lang.strings.cancelCommand}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dashboardMenuItem} onPress={() => this.showPayType()} >
                            <SvgPaycheck width={50} height={60}  style={this.state.blockedRequest ? {opacity:0.3} : null} />
                                <Text style={[styles.dashboardMenuItemText,this.state.blockedRequest ? {opacity:0.3} : null]}>{lang.strings.paycheck}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

                <Footer navigation={this.props.navigation} activeRoute="waiter" onCloseMenu={() => this.setState({isMenuOpened: false})} />

                <Modal transparent={true}
                    visible={this.state.isModalVisible}
                    onRequestClose={this.closeModal}
                    >
                    <View style={styles.waiterCalledModal}>
                        <View style={styles.waiterCalledModalContainer} >
                            <TouchableOpacity onPress={this.closeModal} style={styles.waiterCalledModalClose}>
                            <SvgClose width="100%" height="30" />
                            </TouchableOpacity>
                            <Text style={styles.waiterCalledModalTextMare}>{lang.strings.thankYou}</Text>
                            <Text style={styles.waiterCalledModalTextMic}>{lang.strings.freeWaiter}</Text>
                        </View>
                    </View>
                </Modal>
                <Modal transparent={true}
                    visible={this.state.isConfirmModalVisible}
                    onRequestClose={this.closeConfirmModal}
                    >
                    <View style={styles.waiterCalledModal}>
                        <View style={styles.waiterCalledModalContainer} >
                        <TouchableOpacity onPress={this.closeConfirmModal} style={styles.waiterCalledModalClose}>
                        <SvgClose width="100%" height="30" />
                            </TouchableOpacity>
                            <Text style={styles.waiterCalledModalTextMare}>{lang.strings.confirmCommand}</Text>
                            <Text style={styles.waiterCalledModalTextMic}>
                                {this.state.action == 'bill' ? lang.strings.sureNote : null}
                                {this.state.action == 'request' ? lang.strings.sureWaiter : null}
                                {this.state.action == 'turn' ? lang.strings.sureTry : null}
                                {this.state.action == 'cancel' ? lang.strings.sureCancel : null}                               
                            </Text>
                            <View style={styles.waiterCalledModalButtons}>
                                <TouchableOpacity style={styles.waiterCalledModalButton} onPress={() => this.sendRequest()}>
                                    <Text style={styles.waiterCalledModalButtonText}>{lang.strings.yes}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.waiterCalledModalButton} onPress={() => this.closeConfirmModal()}>
                                    <Text style={styles.waiterCalledModalButtonText}>{lang.strings.no}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this.setNotToSee()} style={{marginTop: 20,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>                   
                                    <View style={styles.confirmModalThickBox}>
                                        {this.state.notToSee ?
                                        <Image style={styles.confirmModalThickBoxImage} source={require('../../assets/images/tick.png')} />
                                        : null}
                                        </View>
                                <Text style={styles.waiterCalledModalSmallText}>{lang.strings.noShow}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal transparent={true}
                    visible={this.state.isPayTypeVisible}
                    onRequestClose={this.closePayTypeModal}
                    >
                    <View style={styles.waiterCalledModal}>
                        <View style={styles.waiterCalledModalContainer} >
                        <TouchableOpacity onPress={this.closePayTypeModal} style={styles.waiterCalledModalClose}>
                        <SvgClose width="100%" height="30" />
                            </TouchableOpacity>
                            <Text style={styles.waiterCalledModalTextMare}>{lang.strings.askNote}</Text>
                            <Text style={styles.waiterCalledModalTextMic}>{lang.strings.howPay}</Text>
                            <View style={styles.waiterCalledModalButtons}>
                                <TouchableOpacity style={styles.waiterCalledModalButton} onPress={() => this.cereNota('cash')}>
                                        <Text style={styles.waiterCalledModalButtonText}>{lang.strings.cash}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.waiterCalledModalButton} onPress={() => this.cereNota('card')}>
                                    <Text style={styles.waiterCalledModalButtonText}>{lang.strings.card}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

}
const mapStateToProps = state => ({
    restaurant: state.restaurant
});
const mapDispatchToProps = dispatch => ({
    setRestaurant: (data) => dispatch(setRestaurant(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);