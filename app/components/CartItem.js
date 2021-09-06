import React, { Component, createRef } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

import styles from '../styles';
import cart from '../cart';

import X from '../../assets/images/x.svg';

export default class CartITem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        }
        this.refAnimation = createRef();
        this.currency = 'LEI';
    }
    async removeItem() {
        await this.refAnimation.bounceOutRight().then(()=>{
            cart.updateCantitate(this.props.index,0);
        });
        this.setState({ visible: false });

    }

    hasDescription() {
        console.log(this.props.description);
        if (this.props.description)
            return (
                <Text style={styles.cartItemDescription}>{this.props.description}</Text>
            )
        else 
            return null;
    }

    render() {
        return (
            (this.state.visible &&
                (
                    <Animatable.View ref={ref => this.refAnimation = ref} animation={this.state.visible ? 'fadeInLeft' : 'fadeOutRight'} useNativeDriver style={{ flex: 1, padding: 20, backgroundColor: '#F5F6FA', borderRadius: 5, margin: 20, marginTop: 0 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 5 }}>
                            <Text style={styles.cartItemTitle}>{this.props.title}</Text>
                            <TouchableOpacity onPress={() => { this.removeItem() }}>
                                <X />
                            </TouchableOpacity>
                        </View>

                        {this.hasDescription()}

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.cartItemQuantity}>{this.props.quantity} x</Text>
                            <Text style={styles.cartItemPrice}>{this.props.price} {this.currency}</Text>
                        </View>
                    </Animatable.View>
                )
            )
        )
    }
}