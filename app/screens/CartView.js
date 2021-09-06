import React, { Component, createRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';

import lang from '../Languages';

import styles from '../styles';
import Header from '../components/Header';
import cart from '../cart';
import emitter from 'tiny-emitter/instance';

import ConfirmCommand from './Modals/ConfirmCommand';

import { connect } from 'react-redux';
import { setRestaurant } from '../redux_components/actions';

import CartItem from '../components/CartItem';

class CartView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            otherDetailsMessage: null,
            products: cart.data.items,
            total:cart.data.total,
        }
        

        this.currency = 'LEI';
        this.refConfirmCommandModal = createRef();
    }
    componentDidMount(){
        // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        emitter.on('cart-update',()=>{
            this.setState({
                products:cart.data.items,
                total:cart.data.total,
            });
        })
    }
    // _keyboardDidShow = (e) => {
    //     console.log("show")
    //     if (this.mainView) {
    //         this.mainView.setNativeProps({style:{
    //             flex: 1,
    //             backgroundColor: '#fff',
    //             paddingBottom: e.endCoordinates.height + 20,
    //         }})
    //     }
    //     if (this.flatList) {
    //         setTimeout(() => {
    //             this.flatList.scrollToEnd({animated: true});
    //         }, 10)
    //     }
    // }
    
    //   _keyboardDidHide = (e) => {
    //       console.log("hide")
    //     if (this.mainView) {
    //         this.mainView.setNativeProps({style:{
    //             flex: 1,
    //             backgroundColor: '#fff',
    //             paddingBottom: 20,
    //         }})
    //     }
    //     if (this.flatList) {
    //         setTimeout(() => {
    //             this.flatList.scrollToEnd({animated: true});
    //         }, 600)
    //     }
    //   }
    
    comandaFinalizata(){
        cart.empty();
        setTimeout(() => {
            this.props.navigation.goBack();
        }, 1200);
    }
    componentWillUnmount(){
        // this.keyboardDidShowListener.remove();
        // this.keyboardDidHideListener.remove();
        emitter.off('cart-update');
    }
    flatListHeader() {
        lang.translateModel(this.props.restaurant.restaurant.table, ['table_name']);
        lang.translateModel(this.props.restaurant.restaurant.table, ['category']);
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.cartTitle}>{this.props.restaurant.restaurant.table.table_name} {this.props.restaurant.restaurant.table.name} {this.props.restaurant.restaurant.table.category}</Text>
            </View>
        )
    }
    sendCommand(){
        if(this.refConfirmCommandModal.current){
            this.refConfirmCommandModal.current.toggleModal(this.state.products,this.state.otherDetailsMessage,this.props.restaurant.restaurant.table.id,this.props.restaurant.restaurant.restaurant.id,this.state.total);
        }
    }


    flatListFooter() {
        return (
            <View>
                <Text style={styles.otherDetails}>{lang.strings.otherDetails}</Text>
                <TextInput
                    style={[styles.otherDetailsInput,{textAlignVertical: 'top'}]}
                    multiline={true}
                    numberOfLines={3}
                    value={this.state.otherDetailsMessage}
                    returnKeyType="done"
                    onSubmitEditing={() => { this.sendCommand() }}
                    onChangeText={text => this.setState({ otherDetailsMessage: text })}>
                </TextInput>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20 }}>
                    <Text style={styles.cartTotal}>{lang.strings.total}:</Text>
                    <Text style={styles.cartTotalPrice}>{this.state.total} {this.currency}</Text>
                </View>
                {this.state.products.length > 0
                ?
                    <TouchableOpacity style={styles.sendButton} onPress={() => this.sendCommand() }>
                        <Text style={styles.sendButtonText}>{lang.strings.sendOrder}</Text>
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
        )
    }

    mainView = null
    flatList = null
    render() {
        return (
            <View ref={ref => this.mainView = ref} style={{ flex: 1, backgroundColor: '#fff' }}>
                <ConfirmCommand ref={this.refConfirmCommandModal} comandaFinalizata = {(success)=>this.comandaFinalizata()} />
                <Header navigation={this.props.navigation} onOpenMenu={() => this.openMenu()} cartHeader={true} />
                
                <FlatList
                    onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                    onLayout={() => this.flatList.scrollToEnd({animated: true})}
                    removeClippedSubviews={false} 
                    keyboardShouldPersistTaps={'handled'}
                    ref={ref => this.flatList = ref}
                    key = {this.state.total}
                    ListHeaderComponent={this.flatListHeader()}
                    style={{ flexGrow:1, flexShrink:1, backgroundColor: '#fff' }}
                    keyExtractor={(item, index) => item.id.toString()}
                    data={this.state.products}
                    renderItem={({ item,index }) => <CartItem title={item.name} description={item.description} quantity={item.quantity} price={item.price} index = {index} />}
                    ListFooterComponent={this.flatListFooter()}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(CartView);