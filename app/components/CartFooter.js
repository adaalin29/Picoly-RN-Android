import React, { Component, createRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';
import cart from '../cart';
import emitter from 'tiny-emitter/instance';

import styles from '../styles';
import lang from '../Languages';

import FooterCart from '../../assets/images/footerCart.svg';

export default class CartFooter extends Component {
    constructor(props) {
        super(props);
        this.currency = 'LEI';
        this.state = {
            products: cart.data.items,
            total:cart.data.total,
        }
        
    }
    updateCart(product) {
        cart.add(product);
        this.setState({
            total:cart.data.total,
            products:cart.data.items,
        });
    } 
    backListener = null;
    componentDidMount(){
        emitter.on('cart-update',()=>{
            this.setState({
                products:cart.data.items,
                total:cart.data.total,
            });
        })
        this.backListener =this.props.navigation.addListener('focus',()=>{
            this.setState({
                total:cart.data.total,
                products:cart.data.items,
            });
        });
    }
    componentWillUnmount(){
        emitter.off('cart-update');
        if(this.backListener){
            this.backListener();
        }
    }

    render() {
        return (
            (this.state.products.length ?
                (
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('CartView', {products:this.state.products})}
                        useNativeDriver={true}
                        animation={this.state.products.length ? 'fadeInLeft' : 'fadeOutRight'}
                        style={{ flexDirection: 'row', width: '100%', height: 60, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, backgroundColor: '#E32340', position: 'absolute', bottom: 0 }}>

                        <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FooterCart />
                            <Text style={[styles.footerCartText, { paddingLeft: 10 }]}>{lang.strings.openCart}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.footerCartText}>{lang.strings.total}: </Text>
                            <Text style={styles.footerCartText}>{this.state.total} {this.currency}</Text>
                        </View>
                    </TouchableOpacity>
                )
                :
                    <></>
            )
        )
    }
}