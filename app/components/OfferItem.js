import React from 'react';
import { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from '../styles';
import ProductArrow from '../../assets/images/productArrow.svg';

export default class OfferItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 20, paddingTop: 0 }}>
                <Image style={{ width: '100%', height: 200, resizeMode: 'cover', borderRadius: 5 }} source={this.props.imgSource} />
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.productDetailsTitle}>{this.props.title}</Text>
                        <Text style={[styles.offerDescription]}>{this.props.description}</Text>
                    </View>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingTop: 15 }} onPress={() => this.props.onPress()}>
                        <ProductArrow />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}