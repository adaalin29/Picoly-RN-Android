import React, { Component } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, Dimensions,ImageBackground } from 'react-native';
import styles from '../styles.js';

import lang from '../Languages';

import Header from '../components/Header';
import OpenedMenu from '../components/OpenedMenu';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import cart from '../cart';

const heightWindow = Dimensions.get('window').height;

class Offers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpened: false, // on every menu page
            deals: [],
            menu: [],
            demo: false,
            showMenuRestaurant: true,
        }

        this.openMenu = this.openMenu.bind(this); // on every menu page
        this.closeMenuAction = this.closeMenu.bind(this); // on every menu page
    }

    componentDidMount =() =>{
        if(this.props.restaurant != null && this.props.restaurant.restaurant == null){
            this.setState({demo: true});
        }
        else{
            fetch('https://client.picoly.app/api/getDeals', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    restaurant_id: this.props.restaurant.restaurant.restaurant.id,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({menu:responseJson.menu});
                    // if(responseJson.menu_url != null || responseJson.menu_url.length > 0){
                    //     this.setState({urlMenu : responseJson.menu_url});
                    // }
                }).catch((error) => {
                    // alert(JSON.stringify(error));
            });
         }
         this.setState({defaultLanguage:lang.defaultLanguage});
    }

    // on every menu page
    openMenu = () => {
        this.setState({isMenuOpened: true});
    }
    closeMenu = () => {
        this.setState({isMenuOpened: false});
    }

    render() {
        const def_lang = lang.defaultLanguage;
        return(
            <View style={{flex: 1,justifyContent:'space-between'}}>
                {
                    !this.state.demo && this.props.restaurant && this.props.restaurant.restaurant && this.props.restaurant.restaurant.restaurant
                    ?
                    <Header cart_products = {cart.data.items.length>0 ? true : false} cart={this.props.restaurant && this.props.restaurant.restaurant.restaurant.custom_order ==1 ? true : false} table_id = {this.props.restaurant.restaurant.table.id} restaurant_id = {this.props.restaurant.restaurant.restaurant.id} navigation={this.props.navigation} onOpenMenu={() => this.openMenu()} />
                    :
                    <Header cart_products = {false} cart={false} table_id = {null} restaurant_id = {null} navigation={this.props.navigation} onOpenMenu={() => this.openMenu()} />
                }                
                <OpenedMenu opened={this.state.isMenuOpened} navigation={this.props.navigation} onClose={() => this.setState({isMenuOpened: false})}/>
                {this.state.demo ?
                 <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <View style={styles.swiperImageCont}>
                        <Image resizeMode="contain" source={require('../../assets/images/noqr.png')} style={{width: '100%', height: '100%'}} />
                    </View>
                    <Text style={[styles.slideTitle,{marginTop:10}]}>{lang.strings.menu}</Text>
                    <TouchableOpacity style={{marginTop:15}} onPress={() => this.props.navigation.navigate('ScanQr')}>
                        <Text style={styles.helpTreciPeste}>{lang.strings.offersScan}</Text>
                    </TouchableOpacity>
                </View>
                :
                this.state.showMenuRestaurant ? 
                <View style={{flex:1}}>
                            {this.state.menu && this.state.menu.length>0
                            ?
                                <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                                    {this.state.menu.map((menuItem,index)=>{
                                        lang.translateModel(menuItem, ['name','description']);
                                       return(
                                            <View style={styles.menuItemContainer}>
                                            <ImageBackground style={{ flex: 1 }} source={menuItem.image ? {uri: 'https://client.picoly.app/storage/'+menuItem.image} : require('../../assets/images/imgMenu.png')} imageStyle={{ flex: 1, borderRadius: 5, resizeMode: 'cover' }}>
                                                <View style={{ flex: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                                    <Text style={[styles.menuItemTitle, { opacity: 1 }]}>{menuItem.name}</Text>
                                                    <Text style={[styles.menuItemDescription, { opacity: 1, width: '75%' }]}>{menuItem.description}</Text>
                                                    {/* daca este digital menu schimb ruta */}
                                                    {menuItem.digital_menu
                                                        ?
                                                        <TouchableOpacity
                                                            style={{ alignItem: 'center', justifyContent: 'center' }}
                                                            onPress={() => this.props.navigation.navigate('DigitalMenu',{
                                                                menu_url:menuItem.menu_url,
                                                                table_id:this.props.restaurant.restaurant.table.id,
                                                                restaurant_id:this.props.restaurant.restaurant.restaurant.id,
                                                                
                                                            })}>
                                                            <Text style={[styles.menuItemButton, { opacity: 1 }]}>{lang.strings.openMenu}</Text>
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity
                                                            style={{ alignItem: 'center', justifyContent: 'center' }}
                                                            onPress={() => this.props.navigation.navigate('ProductsList',{
                                                                layout:menuItem.layout,
                                                                categories:menuItem.categories,
                                                                deals:menuItem.deals,
                                                            })}>
                                                            <Text style={[styles.menuItemButton, { opacity: 1 }]}>{lang.strings.openMenu}</Text>
                                                        </TouchableOpacity>
                                                    }
                                                </View>
                                            </ImageBackground>
                                            </View>
                                       )
                                    })}
                                </ScrollView>
                            :
                                <View style={{flex: 1}}>
                                    <Text style={styles.offerTitle}>{lang.strings.menuNot}</Text>
                                </View>
                            }
                        </View>
                    :
                        <ScrollView style={{flex:1}} contentContainerStyle={{paddingBottom: 20}}>
                            <View style={{flex:1,flexDirection: 'row',justifyContent: 'space-between',padding: 10,}}>
                                <TouchableOpacity style={[styles.welcomeDemoButon, this.state.showMenuRestaurant ? styles.btnOffersMenuActive : styles.btnOffersMenu]} onPress={() => this.setState({showMenuRestaurant: true})}>
                                    <Text style={this.state.showMenuRestaurant ? styles.helpTreciPesteActive : styles.helpTreciPeste}>{lang.strings.menu}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.welcomeDemoButon, this.state.showMenuRestaurant ? styles.btnOffersMenu : styles.btnOffersMenuActive]} onPress={() => this.setState({showMenuRestaurant: false})}>
                                    <Text style={this.state.showMenuRestaurant ? styles.helpTreciPeste : styles.helpTreciPesteActive}>{lang.strings.offers}</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                }
                
                <Footer onCloseMenu={() => this.setState({isMenuOpened: false})} navigation={this.props.navigation} activeRoute="offers" />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    restaurant: state.restaurant
});

export default connect(mapStateToProps)(Offers);
