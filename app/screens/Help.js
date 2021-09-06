import React, { Component } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, Modal } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from '../styles.js';
import lang from '../Languages';

import Header from '../components/Header';
import OpenedMenu from '../components/OpenedMenu';
import Footer from '../components/Footer';

class Help extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpened: false, // on every menu page
            swiperIndex: 0,
        }

        this.openMenu = this.openMenu.bind(this); // on every menu page
        this.closeMenuAction = this.closeMenu.bind(this); // on every menu page
    }

    // on every menu page
    openMenu = () => {
        this.setState({isMenuOpened: true});
    }
    closeMenu = () => {
        this.setState({isMenuOpened: false});
    }
    renderPagination = (index, total, context) => {
        return (
            <View style={styles.paginationStyle}>
                <TouchableOpacity onPress={() => index == 2 ?  this.props.navigation.navigate('Dashboard') : this._swiper.scrollBy(1, true)}>
                    <Text style={styles.helpTreciPeste}>{index == 2 ? lang.strings.further : lang.strings.continue}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <Header navigation={this.props.navigation} onOpenMenu={() => this.openMenu()} />
                <OpenedMenu opened={this.state.isMenuOpened} navigation={this.props.navigation} onClose={() => this.setState({isMenuOpened: false})}/>
                <View style={{flex: 1}}>
                    <ScrollView contentContainerStyle={{padding: 20}}>
                        <TouchableOpacity style={styles.goBackContainer} onPress={() => this.props.navigation.goBack()}>
                            <Image style={styles.goBackImage} source={require('../../assets/images/icon-arrow-left.png')} />
                            <Text style={styles.goBackText}>{lang.strings.help}</Text>
                        </TouchableOpacity>
                        <View style={styles.swiperContainer}>
                            <Swiper ref={swiper => this._swiper = swiper} paginationStyle={{marginBottom: -60}} 
                                style={{height: '100%'}}
                                dotStyle={{width: 15, height: 15, borderRadius: 10}}
                                activeDotStyle={{width: 15, height: 15, borderRadius: 10}}
                                dotColor='rgba(215,216,217,0.5)' 
                                // renderPagination={this.renderPagination}
                                showsPagination={true}
                                activeDotColor={"#D7D8D9"}
                                loop={false}
                                onIndexChanged={(index) => this.setState({swiperIndex:index})}
                                >
                                <View style={styles.swiperSlide}> 
                                    <View style={styles.swiperImageCont}>
                                        <Image resizeMode="contain" source={require('../../assets/images/slide1.png')} style={{width: '100%', height: '100%'}} />
                                    </View>
                                    <Text style={styles.slideTitle}>{lang.strings.helpTitle1}</Text>
                                    <Text style={styles.slideDesc}>{lang.strings.helpText1}</Text>
                                </View>
                                <View style={styles.swiperSlide}> 
                                    <View style={styles.swiperImageCont}>
                                        <Image resizeMode="contain" source={require('../../assets/images/slide2.png')} style={{width: '100%', height: '100%'}} />
                                    </View>
                                    <Text style={styles.slideTitle}>{lang.strings.helpTitle2}</Text>
                                    <Text style={styles.slideDesc}>{lang.strings.helpText2}</Text>
                                </View>
                                <View style={styles.swiperSlide}>  
                                    <View style={styles.swiperImageCont}>
                                        <Image resizeMode="contain" source={require('../../assets/images/slide3.png')} style={{width: '100%', height: '100%'}} />
                                    </View>
                                    <Text style={styles.slideTitle}>{lang.strings.helpTitle3}</Text>
                                    <Text style={styles.slideDesc}>{lang.strings.helpText3}</Text>
                                </View>
                            </Swiper>
                        </View>
                        <View style={styles.paginationStyle}>
                            <TouchableOpacity onPress={() => this.state.swiperIndex == 2 ?  this.props.navigation.navigate('Dashboard') : this._swiper.scrollBy(1, true)}>
                                <Text style={styles.helpTreciPeste}>{this.state.swiperIndex == 2 ? lang.strings.further : lang.strings.continue}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    </View>
                <Footer onCloseMenu={() => this.setState({isMenuOpened: false})} navigation={this.props.navigation} activeRoute="help" />
            </View>
        )
    }
}

export default Help;
