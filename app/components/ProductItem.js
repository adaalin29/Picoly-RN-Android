import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from '../styles';
import ProductArrow from '../../assets/images/productArrow.svg';
export default class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state ={
        }
    }
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress()} style={{ flex: 1, padding: 15, paddingTop: 0, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{flexDirection: 'row', padding: 10, backgroundColor: '#F5F6FA', borderRadius: 5}}>
                    {
                        this.props.imgSource ?
                            <View>
                                <Image style={{ width: 130, height: 130, resizeMode: 'cover' }} source={this.props.imgSource} />
                            </View>
                        :
                            <></>
                    }
                    <View style={{ flex: 1, paddingLeft: this.props.imgSource ? 10 : 0 }}>
                        <Text style={styles.foodTitile}>{this.props.title}</Text>
                        <Text style={styles.foodDescription}>{this.props.description}</Text>
                        <Text style={styles.foodPrice}>{this.props.price} {this.props.currency}</Text>
                    </View>

                    <View style={{ alignSelf: 'flex-end', paddingBottom: 10, paddingRight: 10 }}>
                        <ProductArrow />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}