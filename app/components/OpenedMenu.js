import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import lang from '../Languages';
import styles from '../styles';
import SvgClose from '../../assets/images/icon-close.svg';
import AsyncStorage from '@react-native-community/async-storage';
import emitter from 'tiny-emitter/instance';
import { StackActions, NavigationActions } from 'react-navigation';
import {Picker} from '@react-native-community/picker';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class OpenedMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            translateAnim: new Animated.Value(0),
            language: null,
        }
        this.closeMenuAction = this.closeMenuAction.bind(this);
    }

    closeMenuAction = () => {
        this.props.onClose();
    }

    componentDidUpdate(){
        var to = this.props.opened ? 1 : 0 ;
        Animated.timing(this.state.translateAnim, {
            toValue: to,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    navigateTo = (path) => {
        this.props.navigation.navigate(path);
        this.props.onClose();
    }
    async setSelectedLanguage(savedLanguage){
            AsyncStorage.setItem('savedLanguage',savedLanguage);
            lang.strings.setLanguage(savedLanguage);
            this.setState({
                language:savedLanguage,
            });
            this.forceUpdate()
    }
    componentDidMount(){
        var vthis = this;
        emitter.on('app_reload',()=>{            
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                         routeName: 'Feedback',
                         params: {reloadAppConst: true},
                        })
                ],
            });
            vthis.props.navigation.dispatch(resetAction);
        });
    }



    render () {
        const menuTranslate = this.state.translateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-viewportWidth - 200, 0],
        });
        return (
            <Animated.View style={[styles.headerOpenedMenuContainer,{transform:[
                {translateX : menuTranslate}
            ]}]}>
               <Image style={styles.headerOpenedMenuBackgroundImage} source={require('../../assets/images/opened-menu-backbound.png')} />
               <TouchableOpacity onPress={this.closeMenuAction} style={styles.headerOpenedMenuCloseImage}>
                    <SvgClose width="100%" height="30" />
                </TouchableOpacity>
               <View style={styles.headerOpenedMenuContent}>
                    <Image style={{width:'70%',height:80,resizeMode:'contain'}} source={require('../../assets/images/logored.png')} />
                    <TouchableOpacity onPress={() => this.navigateTo('ScanQr')}>
                        <Text style={styles.headerOpenedMenuText}>{lang.strings.rescanCode}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.navigateTo('DespreNoi')}>
                        <Text style={styles.headerOpenedMenuText}>{lang.strings.aboutApp}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.navigateTo('Confidentialitate')}>
                        <Text style={styles.headerOpenedMenuText}>{lang.strings.policy}</Text>
                    </TouchableOpacity>
                    {lang.activeLanguages
                        ?
                            <View style = {styles.languageContainer}>
                                <Picker
                                    style={styles.languagePicker}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setSelectedLanguage(itemValue)
                                    }>
                                                <Picker.Item label={lang.strings.selectLanguage} />
                                    {lang.activeLanguages.map((item,index) => {
                                            return(
                                                <Picker.Item label={item.name} value={item.abbr} />
                                                
                                            )
                                        })}
                                </Picker>
                            </View>
                        :null
                    }
                </View>
            </Animated.View>
        )
    }
}

export default OpenedMenu;