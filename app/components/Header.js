import React, { Component, createRef } from 'react';
import { View, Image, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles';
import SvgBurger from '../../assets/images/burger-menu.svg';
import OpenedMenu from './OpenedMenu';
import emitter from 'tiny-emitter/instance';

import lang from '../Languages';

import { connect } from 'react-redux';
import { setRestaurant } from '../redux_components/actions';

import SendCommand from '../screens/Modals/SendCommand';

import CartIcon from '../../assets/images/cart.svg';
import GoBack from '../../assets/images/goBack.svg';

import cart from '../cart';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
            cartProducts:false,
            time:0,
        }
        this.refSendCommandModal = createRef();
    }

    // cartButton() {
    //     let cart_products = cart.data.items.length>0 ? true : false;
    //     // if (this.props.cart && cart_products == false) {
    //         if (this.props.navigation.state.routeName != 'Dashboard' && this.props.navigation.state.routeName != 'Feedback' && this.props.navigation.state.routeName != 'Help' && this.props.navigation.state.routeName != 'Confidentialitate' && this.props.navigation.state.routeName != 'DespreNoi' && this.props.restaurant && this.props.restaurant.restaurant && this.props.restaurant.restaurant.restaurant && this.props.restaurant.restaurant.restaurant.custom_order_popup == 1) {
    //         return (
    //             <View style={{ flex: 1, alignItems: 'flex-end', }}>
    //                 <TouchableOpacity
    //                     style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
    //                     onPress={() => { this.refSendCommandModal.current.toggleModal() }}>
    //                     <CartIcon />
    //                     <Text style={{ paddingLeft: 10, color: '#fff' }}>{lang.strings.command}</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         )
    //     }
    //     // else if(cart_products == true){
    //     //     return (
    //     //         <View style={{ flex: 1, alignItems: 'flex-end', }}>
    //     //             <TouchableOpacity
    //     //                 style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
    //     //                 onPress={() => { this.props.navigation.navigate('CartView') }}>
    //     //                 <CartIcon />
    //     //                 <Text style={{ paddingLeft: 10, color: '#fff' }}>{lang.strings.command}</Text>
    //     //             </TouchableOpacity>
    //     //         </View>
    //     //     )
    //     // }
    // }

    cartButton() {
        // alert(JSON.stringify(this.props.navigation.state.routeName));
        let cart_products = cart.data.items.length>0 ? true : false;
        // if (this.props.cart && cart_products == false) {
        if (cart_products == false && this.props.navigation.state.routeName != 'Dashboard' && this.props.navigation.state.routeName != 'Feedback' && this.props.navigation.state.routeName != 'Help' && this.props.navigation.state.routeName != 'Confidentialitate' && this.props.navigation.state.routeName != 'DespreNoi' && this.props.restaurant && this.props.restaurant.restaurant && this.props.restaurant.restaurant.restaurant && this.props.restaurant.restaurant.restaurant.custom_order_popup == 1) {
            return (
                <View style={{ flex: 1, alignItems: 'flex-end', }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => { this.refSendCommandModal.current.toggleModal() }}>
                        <CartIcon />
                        <Text style={{ paddingLeft: 10, color: '#fff' }}>{lang.strings.command}</Text>
                    </TouchableOpacity>
                </View>
            )
            }   else if(this.props.navigation.state.routeName != 'Dashboard' && this.props.navigation.state.routeName != 'Feedback' && this.props.navigation.state.routeName != 'Help' && this.props.navigation.state.routeName != 'Confidentialitate' && this.props.navigation.state.routeName == 'DigitalMenu' && this.props.restaurant && this.props.restaurant.restaurant && this.props.restaurant.restaurant.restaurant && this.props.restaurant.restaurant.restaurant.custom_order_popup == 1){
                return (
                    <View style={{ flex: 1, alignItems: 'flex-end', }}>
                       <TouchableOpacity
                           style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                           onPress={() => { this.refSendCommandModal.current.toggleModal() }}>
                           <CartIcon />
                           <Text style={{ paddingLeft: 10, color: '#fff' }}>{lang.strings.command}</Text>
                       </TouchableOpacity>
                   </View>
               )
            }
         else if(cart_products == true && this.props.navigation.state.routeName != 'Dashboard' && this.props.navigation.state.routeName != 'Feedback' && this.props.navigation.state.routeName != 'Help' && this.props.navigation.state.routeName != 'Confidentialitate'){
            return (
                <View style={{ flex: 1, alignItems: 'flex-end', }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => { this.props.navigation.navigate('CartView') }}>
                        <CartIcon />
                        <Text style={{ paddingLeft: 10, color: '#fff' }}>{lang.strings.command}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        
    }
    backListener = null;

    componentDidMount(){
        emitter.on('cart-update',()=>{
            
            this.setState({
                time:Date.now(),
            })
        });
        this.backListener =this.props.navigation.addListener('didFocus', () => {

            this.setState({
                time:Date.now(),
            })
        });
    }
    componentWillUnmount(){
        emitter.off('cart-update');
        if(this.backListener && this.backListener.remove)
            this.backListener.remove();
    }
    render() {
        if (this.props.cartHeader) {
            return (
                <View style={styles.mainHeaderContainer}>
                    <SendCommand table_id = {this.props.table_id} restaurant_id = {this.props.restaurant_id} ref={this.refSendCommandModal} />

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                        <GoBack />
                        <Text style={styles.goBack}>{lang.strings.back}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else
            return (
                <View>
                    <View style={styles.mainHeaderContainer} key = {this.state.time}>
                        <SendCommand table_id = {this.props.table_id} restaurant_id = {this.props.restaurant_id} ref={this.refSendCommandModal} />

                        {this.props.goBack ?
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                                <GoBack />
                                <Text style={styles.goBack}>{lang.strings.back}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Dashboard')}>
                                <Image style={{ width: '35%', height: 50, resizeMode: 'contain' }} source={require('../../assets/images/logo.png')} />
                            </TouchableWithoutFeedback>
                        }
                            {this.cartButton()}

                        <TouchableOpacity style={{ padding: 8, paddingLeft: 30, alignItems: 'flex-end' }} onPress={() => this.props.onOpenMenu()}>
                            <SvgBurger width="20" height="20" />
                        </TouchableOpacity>
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);