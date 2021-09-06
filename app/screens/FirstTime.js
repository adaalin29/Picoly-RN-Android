import React, { Component } from 'react';
import { NativeModules, Platform } from 'react-native';
import { View, ScrollView, Image, Text, TouchableOpacity, Modal } from 'react-native';
import Swiper from 'react-native-swiper';
import lang from '../Languages';
import styles from '../styles.js';
import AsyncStorage from '@react-native-community/async-storage';

const deviceLanguage =
          Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
            : NativeModules.I18nManager.localeIdentifier;

class FirstTime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpened: false, // on every menu page
            swiperIndex:0,
        }

    }

    navigate(){
        this.storeData();
        this.props.navigation.navigate('Welcome');
    }

    storeData = async () => {
        try {
          await AsyncStorage.setItem('first_time_getwaiter', 'yes')
        } catch (e) {
          // saving error
        }
    }
    changeLang(newLang) {
        lang.strings.setLanguage(newLang);
        this.forceUpdate()
    }

    componentDidMount(){
        let language = deviceLanguage.substring(2,0);
        lang.getnew().then(() => {
            lang.strings.setLanguage(language);
            this.forceUpdate();
        })
    }

    renderPagination = (index, total, context) => {
        return (
            <TouchableOpacity onPress={() => this.navigate()}>
                {index == 2 
                    ? 
                        <Text style={styles.helpTreciPeste}>{lang.strings.continue}</Text>
                    : 
                        <Text style={styles.helpTreciPeste}>{lang.strings.skip}</Text>

                }
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <ScrollView contentContainerStyle={{padding: 20,flex:1,justifyContent:'center',alignItems:'center'}}>
                        <View style={styles.swiperContainer}>
                            <Swiper ref={swiper => this._swiper = swiper} 
                                style={{height: '100%'}}
                                dotStyle={{width: 15, height: 15, borderRadius: 10}}
                                // onIndexChanged={index => this.setState({ swiperIndex: index })}
                                // renderPagination={this.renderPagination}
                                paginationStyle={{marginBottom: -60}} 
                                activeDotStyle={{width: 15, height: 15, borderRadius: 10}}
                                dotColor='rgba(215,216,217,0.5)' 
                                activeDotColor={"#D7D8D9"}
                                loop={false}
                                onIndexChanged={(index) => this.setState({swiperIndex:index})}
                                >
                                <View style={styles.swiperSlide}> 
                                    <View style={styles.swiperImageCont}>
                                        <Image resizeMode="contain" source={require('../../assets/images/slide1.png')} style={{width: '100%', height: '100%'}} />
                                    </View>
                                    <Text style={styles.slideTitle}>{lang.strings.firstTimeTitle1}</Text>
                                    <Text style={styles.slideDesc}>{lang.strings.firstTimeDescription1}</Text>
                                </View>
                                <View style={styles.swiperSlide}> 
                                    <View style={styles.swiperImageCont}>
                                        <Image resizeMode="contain" source={require('../../assets/images/slide2.png')} style={{width: '100%', height: '100%'}} />
                                    </View>
                                    <Text style={styles.slideTitle}>{lang.strings.firstTimeTitle2}</Text>
                                    <Text style={styles.slideDesc}>{lang.strings.firstTimeDescription2}</Text>
                                </View>
                                <View style={styles.swiperSlide}>  
                                    <View style={styles.swiperImageCont}>
                                        <Image resizeMode="contain" source={require('../../assets/images/slide3.png')} style={{width: '100%', height: '100%'}} />
                                    </View>
                                    <Text style={styles.slideTitle}>{lang.strings.firstTimeTitle3}</Text>
                                    <Text style={styles.slideDesc}>{lang.strings.firstTimeDescription3}</Text>
                                </View>
                            </Swiper>
                        </View>
                        <TouchableOpacity onPress={() => this.navigate()}>
                            {this.state.swiperIndex == 2 
                                ? 
                                    <Text style={styles.helpTreciPeste}>{lang.strings.continue}</Text>
                                : 
                                    <Text style={styles.helpTreciPeste}>{lang.strings.skip}</Text>

                            }
                        </TouchableOpacity>
                    </ScrollView>
                    </View>
            </View>
        )
    }
}

export default FirstTime;
