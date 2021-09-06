import React, { Component } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, Modal, Linking } from 'react-native';
import styles from '../styles.js';

import lang from '../Languages';
import Header from '../components/Header';
import OpenedMenu from '../components/OpenedMenu';
import Footer from '../components/Footer';
import HTML from 'react-native-render-html';

class DespreNoi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpened: false, // on every menu page
            terms:null,
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

    componentDidMount(){
        fetch('https://client.picoly.app/api/getStatics', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({terms: responseJson.despre});
            }).catch((error) => {
                this.setState({blockedRequest: false});
                alert(JSON.stringify(error));
        });
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
                            <Text style={styles.goBackText}>{lang.strings.aboutUsText}</Text>
                        </TouchableOpacity>
                        <View style={{height:20,width:20}}></View>
                        {this.state.terms ?
                        <HTML html={this.state.terms}
                            onLinkPress={(ev, href, htmlAttribs) => Linking.openURL(href)}
                            tagsStyles = {{p : {fontFamily: 'OpenSans-Regular', fontSize:14},li : {fontFamily:'Tahoma', fontSize:14}, strong: {fontFamily: 'OpenSans-SemiBold'}}}
                        />
                        : null}
                    </ScrollView>
                </View>
                <Footer onCloseMenu={() => this.setState({isMenuOpened: false})} navigation={this.props.navigation} activeRoute="" />
            </View>
        )
    }
}

export default DespreNoi;