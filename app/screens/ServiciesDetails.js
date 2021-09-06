import React, { Component, createRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../styles';
import lang from '../Languages';

import SendCommand from '../screens/Modals/SendCommand';

import GoBack from '../../assets/images/goBack.svg';
import PriceTag from '../../assets/images/priceTag.svg';
import DownArrow from '../../assets/images/downArrow.svg';
import Cart from '../../assets/images/cart.svg';

export default class ServiciesDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCustomField: 'baseball',
        }
        this.customFields = [
            {
                label: 'Lorem ipsum dolor sit amet, consectetur',
                value: 'val1',
            },
            {
                label: 'Lorem ipsum dolor sit amet, consectetur',
                value: 'val2',
            },
            {
                label: 'Lorem ipsum dolor sit amet, consectetur',
                value: 'val3',
            },
        ];
        this.currency = 'LEI/pers.';
        this.refSendCommand = createRef();
        this.refPicker = createRef();
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ backgroundColor: '#fff' }}>
                <SendCommand ref={this.refSendCommand} />

                <TouchableOpacity style={{ position: 'absolute', zIndex: 2, flexDirection: 'row', alignItems: 'center', top: 20, left: 20 }} onPress={() => this.props.navigation.goBack()}>
                    <GoBack />
                    <Text style={[styles.goBack]}>{lang.strings.back}</Text>
                </TouchableOpacity>

                <View style={{ width: '100%', height: 200 }}>
                    <ImageBackground style={{ flex: 1, height: '100%', width: '100%' }} imageStyle={{ height: '100%', resizeMode: 'cover' }} source={require('../../assets/images/offerDetails.png')}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.15)' }}>
                        </View>
                    </ImageBackground>
                </View>

                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={styles.productDetailsTitle}>{lang.strings.bikeTrips}</Text>

                    <Text style={[styles.productDetailsDescription, { paddingLeft: 0, paddingRight: 0 }]}>{lang.strings.bikeTripsDescription}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 30, paddingLeft: 20 }}>
                    <PriceTag />
                    <Text style={[styles.productDetailsTitle, { paddingTop: 0, paddingLeft: 5 }]}>30 {this.currency}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.2, borderTopColor: '#707070', borderBottomWidth: 0.2, borderBottomColor: '#707070', padding: 20, paddingLeft: 0 }}>
                    <Text style={[styles.productDetailsCustomFieldText, { paddingLeft: 20, paddingRight: 20 }]}><Text style={styles.customField}>Custom field:</Text> Lorem ipsum dolor sit amet, consectetur adipi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</Text>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.2, borderBottomColor: '#707070', padding: 15, paddingLeft: 0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                        <Text style={styles.customField}>Custom field: </Text>
                        <RNPickerSelect
                            placeholder={{}}
                            items={this.customFields}
                            onValueChange={value => { this.setState({ selectedCustomField: value }) }}
                            style={pickerSelectStyles}
                            value={this.state.selectedCustomField}
                            useNativeAndroidPickerStyle={false}
                            textInputProps={{ underlineColor: 'yellow' }}
                            Icon={() => {
                                return <DownArrow style={{ top: 20 }} />;
                            }}
                        />
                    </View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.2, borderBottomColor: '#707070', padding: 20, paddingLeft: 0 }}>
                    <Text style={[styles.productDetailsCustomFieldText, { paddingLeft: 20, paddingRight: 20 }]}><Text style={styles.customField}>Custom field:</Text> Lorem ipsum dolor sit amet, consectetur adipi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</Text>
                </View>

                <View style={{ padding: 20,paddingBottom: 100 }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E32340', borderRadius: 5 }}
                        onPress={() => this.refSendCommand.current.toggleModal()}>
                        <Cart />
                        <Text style={styles.btnComanda}>{lang.strings.orderService}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
