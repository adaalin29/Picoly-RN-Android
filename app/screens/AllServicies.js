import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import ProductItem from '../components/ProductItem';

import lang from '../Languages';

export default class AllServicies extends Component {
    constructor(props) {
        super(props);

        this.produse = [
            { id: 0, title: lang.strings.massage, description: lang.strings.massageDescription, price: '50 - 100', imgSource: require('../../assets/images/massage.png') },
            { id: 1, title: lang.strings.festiveEvents, description: lang.strings.festiveEventsDescription, price: 'de la 50', imgSource: require('../../assets/images/events.png') },
            { id: 2, title: lang.strings.touristTour, description: lang.strings.touristTourDescription, price: 'de la 30', imgSource: require('../../assets/images/tour.png') },
            { id: 3, title: lang.strings.treatments, description: lang.strings.treatmentsDescription, price: 15, imgSource: require('../../assets/images/treatment.png') },
        ];
        this.currency = 'LEI/pers.'
    }

    render() {
        return (
            <FlatList
                ListHeaderComponent={(<View style={{ paddingTop: 15 }}></View>)}
                keyExtractor={(item, index) => item.id.toString()}
                data={this.produse}
                renderItem={({ item }) =>
                    <ProductItem
                        currency={this.currency}
                        imgSource={item.imgSource}
                        title={item.title}
                        description={item.description}
                        price={item.price}
                        onPress={() => this.props.navigation.navigate('ServiciesDetails')}
                    />}
            />
        )
    }
}