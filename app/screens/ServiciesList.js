import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import React, { Component } from 'react';

import lang from '../Languages';

import Header from '../components/Header';
import OpenedMenu from '../components/OpenedMenu';
import Footer from '../components/Footer';

import AllServicies from './AllServicies';
import ServiciesDetails from './ServiciesDetails';
 
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default class ServiciesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpened: false, // on every menu page,
        }
        this.openMenu = this.openMenu.bind(this); // on every menu page
        this.closeMenuAction = this.closeMenu.bind(this); // on every menu page
    }

    openMenu = () => {
        this.setState({ isMenuOpened: true });
    }
    closeMenu = () => {
        this.setState({ isMenuOpened: false });
    }

    render() {
        const tabNavigator = () => {
            return (
                <>
                    <Header navigation={this.props.navigation} cart={true} goBack={true} onOpenMenu={() => this.openMenu()} />
                    <OpenedMenu opened={this.state.isMenuOpened} navigation={this.props.navigation} onClose={() => this.setState({ isMenuOpened: false })} />

                    <Tab.Navigator tabBarOptions={{ scrollEnabled: true, allowFontScaling: true, labelStyle: { fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#E32340', textTransform: 'none' } , indicatorStyle: { backgroundColor: '#E32340' } }}>
                        <Tab.Screen name={lang.strings.allServicies} component={AllServicies} />
                        <Tab.Screen name={lang.strings.areaTour} component={AllServicies} />
                        <Tab.Screen name={lang.strings.treatments} component={AllServicies} />
                        <Tab.Screen name={lang.strings.massage} component={AllServicies} />
                    </Tab.Navigator>
                </>
            )
        }
        return (
            <>
                <NavigationContainer>
                    <Stack.Navigator headerMode={'none'} >
                        <Stack.Screen name={'ServiciesList'} component={tabNavigator} />
                        <Stack.Screen name={'ServiciesDetails'} component={ServiciesDetails} />
                    </Stack.Navigator>
                </NavigationContainer>

                <Footer onCloseMenu={() => this.setState({ isMenuOpened: false })} navigation={this.props.navigation} activeRoute="offers" />
            </>
        )
    }
}