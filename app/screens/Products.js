import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import ProductItem from '../components/ProductItem';

import styles from '../styles';

import lang from '../Languages';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {},
            layout:null,
        };
        if (props.category) {
            this.state.category = props.category;
        }
        this.state.layout = this.props.layout;
        this.currency = 'LEI';
    }

    render() {
        if (!this.state.category) return null;
        if (!this.state.category.products) return null;
        if (this.state.category.products.length<1){
            return(
                <View style={{flex: 1}}>
                    <Text style={styles.offerTitle}>{lang.strings.menuNot}</Text>
                </View>
            )
        };
        const { category } = this.state;
        return (
            <FlatList
                style={{ backgroundColor: '#fff', paddingBottom: 60 }}
                ListHeaderComponent={(<View style={{ paddingTop: 15 }}></View>)}
                ListFooterComponent={(<View style={{ paddingBottom: 65 }}></View>)}
                keyExtractor={(item, index) => item.id.toString()}
                data={category.products}
                renderItem={({ item }) => {
                    lang.translateModel(item, ['name', 'description']);
                    // return(<Text>{JSON.stringify(item.images)}</Text>)
                    let imageObj = {};
                    if (item.images) imageObj = JSON.parse(item.images);
                    item.imgSource = {};
                    if (imageObj && imageObj.length>0) {
                        item.imgSource = {imgSource: {uri:'https://client.picoly.app/storage/'+imageObj[0]}};
                    }
                    return (
                        <ProductItem
                            currency={this.currency}
                            {...item.imgSource}
                            
                            title={item.name}
                            description={item.description.substring(40,0)+' ...'}
                            price={item.price}
                            onPress={() => this.props.navigation.navigate('ProductDetails',{
                                product:item,
                                category:this.state.category.category,
                                layout:this.state.layout,
                            })}
                        />
                    )
                }}
            />
        )
    }
}