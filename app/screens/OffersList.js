import React, { Component, createRef } from 'react';
import { View, FlatList } from 'react-native';

import lang from '../Languages';

import Header from '../components/Header';
import OpenedMenu from '../components/OpenedMenu';
import Footer from '../components/Footer';

import OfferItem from '../components/OfferItem';
import SendCommand from '../screens/Modals/SendCommand';

export default class OfferList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpened: false, // on every menu page,
        }
        this.openMenu = this.openMenu.bind(this); // on every menu page
        this.closeMenuAction = this.closeMenu.bind(this); // on every menu page

        this.oferte = [
            { id: 0, title: lang.strings.offerDay, description: lang.strings.offerDayDescription, imgSource: require('../../assets/images/ofertaZilei.png') },
            { id: 1, title: lang.strings.weekendOffer, description: lang.strings.weekendOfferDescription, imgSource: require('../../assets/images/ofertaWeekend.png') },
        ]

        this.refSendCommand = createRef();
    }

    openMenu = () => {
        this.setState({ isMenuOpened: true });
    }
    closeMenu = () => {
        this.setState({ isMenuOpened: false });
    }

    render() {
        return (
            <>
                <Header cart={this.props.restaurant.restaurant.restaurant.custom_order ==1 ? true : false} navigation={this.props.navigation} onOpenMenu={() => this.openMenu()} goBack={true} />
                <OpenedMenu opened={this.state.isMenuOpened} navigation={this.props.navigation} onClose={() => this.setState({ isMenuOpened: false })} />

                <SendCommand ref={this.refSendCommand} />

                <FlatList
                    ListHeaderComponent={(<View style={{ paddingTop: 15 }}></View>)}
                    keyExtractor={(item, index) => item.id.toString()}
                    data={this.oferte}
                    renderItem={({ item }) => <OfferItem imgSource={item.imgSource} title={item.title} description={item.description} onPress={() => { this.refSendCommand.current.toggleModal() }} />}
                />

                <Footer onCloseMenu={() => this.setState({ isMenuOpened: false })} navigation={this.props.navigation} activeRoute="offers" />
            </>
        )
    }
}