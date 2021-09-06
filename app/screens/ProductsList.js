import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import React, { Component } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, Dimensions,ImageBackground } from 'react-native';
import Header from '../components/Header';
import OpenedMenu from '../components/OpenedMenu';
import Footer from '../components/Footer';
import styles from '../styles.js';
import Arrow from '../../assets/images/right-arrow.svg';

import ConfirmCommandOrder from '../screens/Modals/ConfirmCommandOrder';

import { connect } from 'react-redux';
import { setRestaurant } from '../redux_components/actions';



import lang from '../Languages';

import Products from './Products';
import ProductDetails from './ProductsDetails';
import CartView from './CartView';
import CartFooter from '../components/CartFooter';

import cart from '../cart';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

class ProductsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpened: false, // on every menu page,
            products: [],
            deals:[],
            categories:[],
            layout:null,
            time:0,
        }
        this.openMenu = this.openMenu.bind(this); // on every menu page
        this.closeMenuAction = this.closeMenu.bind(this); // on every menu page
        this.state.layout =  this.props.navigation.getParam('layout',null);
        this.state.deals = this.props.navigation.getParam('deals',null);
        
        this.state.categories =  this.props.navigation.getParam('categories',[]);
        this.refFooterCart = React.createRef();

        
    }
    openMenu = () => {
        this.setState({ isMenuOpened: true });
    }
    closeMenu = () => {
        this.setState({ isMenuOpened: false });
    }
    backListener = null;
    
    componentDidMount(){
        this.backListener =this.props.navigation.addListener('didFocus', () => {
            this.setState({
                    time:Date.now(),
                })
            setTimeout(()=>{
                this.setState({
                    time:Date.now(),
                })
            },500);
        });
    }
    componentWillUnmount(){
        if(this.backListener && this.backListener.remove)
            this.backListener.remove();
    }

    tabNavigatorRef = null;
    tabNavigator = (new_props) => {
        return (
            <>
                <Header  key = {this.state.time} cart={this.props.restaurant.restaurant.restaurant.custom_order ==1 ? true : false} table_id = {this.props.restaurant.restaurant.table.id} restaurant_id = {this.props.restaurant.restaurant.restaurant.id} navigation={this.props.navigation} goBack={true} onOpenMenu={() => this.openMenu()} />
                <OpenedMenu opened={this.state.isMenuOpened} navigation={this.props.navigation} onClose={() => this.setState({ isMenuOpened: false })} />
                {this.state.layout ==2
                    ?
                        this.state.deals
                            ?
                                this.state.deals.map((item,index) =>{
                                    lang.translateModel(item, ['title','description']);
                                    return(
                                        <View style={styles.offerItemContainer,{paddingLeft:20,paddingRight:20,marginTop:20,}} key={index}>
                                            <Image style={styles.offerImage} source={
                                                item.image ? 
                                                {uri: 'https://client.picoly.app/storage/'+item.image}
                                                :
                                                require('../../assets/images/offer1.png')
                                                } />
                                                <TouchableOpacity onPress={() => {if(this.refSendCommand) this.refSendCommand.toggleModal();}} style = {{justifyContent:'space-between',flexDirection:'row',alignItems:'center',}}>
                                                <View>
                                                    <Text style={styles.offerTitle}>{item.title}</Text>
                                                    <Text style={styles.offerDesc}>{item.description}</Text>
                                                </View>
                                                <Arrow></Arrow>
                                            </TouchableOpacity>
                                            <ConfirmCommandOrder table_id = {this.props.restaurant.restaurant.table.id} restaurant_id = {this.props.restaurant.restaurant.restaurant.id} deal = {item} ref={(ref)=>this.refSendCommand = ref} />
                                        </View> 
                                    )
                                })
                            :
                            <View style={{flex: 1}}>
                                <Text style={styles.offerTitle}>{lang.strings.menuNot}</Text>
                            </View>
                    :
                    this.state.categories
                        ?
                        <View style ={{flex:1}}>

                            <Tab.Navigator tabBarOptions={{ scrollEnabled: true, allowFontScaling: true, labelStyle: { fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#E32340', textTransform: 'none' }, activeTintColor: '#E32340', inactiveTintColor: 'gray', indicatorStyle: { backgroundColor: '#E32340' } }}>
                                {this.state.categories.map((category,index)=>{
                                    lang.translateModel(category, ['category']);
                                    return(
                                        <Tab.Screen name={category.category}>
                                            {props => <Products {...props} category={category} layout = {this.state.layout} />}
                                        </Tab.Screen>
                                    )
                                })}
                            </Tab.Navigator>
                            {/* <CartFooter products={'test'} ref={this.refFooterCart} navigation={this.props.navigation} /> */}
                        </View>
                        :
                        <View style={{flex: 1}}>
                            <Text style={styles.offerTitle}>{lang.strings.menuNot}</Text>
                        </View>
                }
                <CartFooter ref={this.refFooterCart} navigation={new_props.navigation} />
            </>
        )
    }
    render() {
        return (
            <>
                <NavigationContainer>
                    <Stack.Navigator headerMode={'none'} >
                        <Stack.Screen name={'ProductList'}>
                            {(props) => this.tabNavigator(props)}
                        </Stack.Screen>
                        <Stack.Screen name={'ProductDetails'} component={ProductDetails} />
                        <Stack.Screen name={'CartView'} component={CartView} />
                    </Stack.Navigator>
                </NavigationContainer>

                <Footer onCloseMenu={() => this.setState({ isMenuOpened: false })} navigation={this.props.navigation} activeRoute="offers" />
            </>
        )
    }
}

const mapStateToProps = state => ({
    restaurant: state.restaurant
});
const mapDispatchToProps = dispatch => ({
    setRestaurant: (data) => dispatch(setRestaurant(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
