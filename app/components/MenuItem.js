import React from 'react';
import { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

import styles from '../styles';

import lang from '../Languages';

export default class MenuItem extends Component {
    constructor(props) {
        super(props);
    }

    buttonText = (title) => {
        console.log("BUTOANE: ", lang.strings.openOffers, lang.strings.openServicies);
        if (title.toLowerCase().includes('menu'))
            return lang.strings.openMenu
        else if (title.toLowerCase().includes('offers'))
            return lang.strings.openOffers
        else if (title.toLowerCase().includes('servicies'))
            return lang.strings.openServicies
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 15, paddingTop: 0, minHeight: 200 }}>
                <ImageBackground style={{ flex: 1 }} source={this.props.imgSource} imageStyle={{ flex: 1, borderRadius: 5, resizeMode: 'cover' }}>
                        <View style={{flex: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                            <Text style={[styles.menuItemTitle, {opacity: 1}]}>{this.props.title}</Text>
                            <Text style={[styles.menuItemDescription, {opacity: 1, width: '75%'}]}>{this.props.description}</Text>
                            <TouchableOpacity
                                onPress={() => this.props.onPress()}>
                                <Text style={[styles.menuItemButton, {opacity: 1}]}>{this.buttonText(this.props.title)}</Text>
                            </TouchableOpacity>
                        </View>
                </ImageBackground>
            </View>
        )
    }
}