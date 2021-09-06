import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import React, { Component } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, Dimensions,ImageBackground } from 'react-native';
import Header from '../components/Header';
import OpenedMenu from '../components/OpenedMenu';
import Footer from '../components/Footer';
import { WebView } from 'react-native-webview';

import lang from '../Languages';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default class DigitalMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpened: false, 
            menu_url:'',
        }
        this.openMenu = this.openMenu.bind(this); // on every menu page
        this.closeMenuAction = this.closeMenu.bind(this); // on every menu page
        this.state.menu_url =  this.props.navigation.getParam('menu_url',null);
    }

    openMenu = () => {
        this.setState({ isMenuOpened: true });
    }
    closeMenu = () => {
        this.setState({ isMenuOpened: false });
    }
    tabNavigator = (new_props) => {
        return (
            <>
                <Header cart={this.props.navigation.state.params.custom_order == 1 ? true : false} table_id = {this.props.navigation.state.params.table_id} restaurant_id = {this.props.navigation.state.params.restaurant_id} navigation={this.props.navigation} goBack={true} onOpenMenu={() => this.openMenu()} />
                <OpenedMenu opened={this.state.isMenuOpened} navigation={this.props.navigation} onClose={() => this.setState({ isMenuOpened: false })} />
                {this.state.menu_url
                    ?
                        <View style ={{flex:1}}>
                            <WebView style={{ flex: 1, width: '100%', height: '100%' }} source={{ uri: this.state.menu_url.indexOf('.pdf') > -1 ? 'https://docs.google.com/gview?url=' + this.state.menu_url : this.state.menu_url }} />
                        </View>
                    : null
                }
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
                    </Stack.Navigator>
                </NavigationContainer>

                <Footer onCloseMenu={() => this.setState({ isMenuOpened: false })} navigation={this.props.navigation} activeRoute="offers" />
            </>
        )
    }
}