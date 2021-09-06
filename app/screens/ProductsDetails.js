import React, { Component,createRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Alert,StyleSheet,LayoutAnimation,UIManager,Platform,Image } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from '../styles';

import lang from '../Languages';
import { connect } from 'react-redux';
import { setRestaurant } from '../redux_components/actions';

import CartFooter from '../components/CartFooter';
import ConfirmCommandService from '../screens/Modals/ConfirmCommandService';

import GoBack from '../../assets/images/goBack.svg';
import GoBackBlack from '../../assets/images/goBackBlack.svg';
import PriceTag from '../../assets/images/priceTag.svg';
import CaloriesTag from '../../assets/images/caloriesTag.svg';
import WeightTag from '../../assets/images/weightTag.svg';
import DownArrow from '../../assets/images/downArrow.svg';
import Cart from '../../assets/images/cart.svg';
import SendCommand from '../screens/Modals/SendCommand';

let lastIndex = -1;
class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            product:null,
            category:'',
            expanded: -1,
            layout:null,
        };
        this.currency = 'LEI';
        this.state.product = this.props.route.params.product;
        this.state.category = this.props.route.params.category;
        this.state.layout = this.props.route.params.layout;
        this.refFooterCart = React.createRef();

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.refSendCommand = createRef();
        this.refPicker = createRef();
        
    }
   
    changeLayout = (index) => {
        if(index ==lastIndex){
            this.setState({expanded:-1});
            lastIndex = -1;
        }else{
            this.setState({expanded:index});
            lastIndex = index;
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
      

    increaseQuantity() {
        this.setState({ quantity: (this.state.quantity + 1) });
    }

    decreaseQuantity() {
        if (this.state.quantity > 0)
            this.setState({ quantity: (this.state.quantity - 1) })
    }
    

    addToCart(product) {
        if (this.state.quantity > 0) {
            product.quantity = this.state.quantity;
            this.refFooterCart.current.updateCart(product);
        }
        else
            alert(lang.strings.selectQuantity);
    }
    render() {
        lang.translateModel(this.state.product, ['name', 'description','custom_field']);
        let custom_field= null;
        if(this.state.product.custom_field){
            custom_field = JSON.parse(this.state.product.custom_field);
        }
        if(!custom_field){
            custom_field = [];
        }
        let images = null;
        console.log('images',this.state.product.images);
        if(this.state.product.images){
            images = JSON.parse(this.state.product.images);
        }
        if(!images){
            images = [];
        }
        if(this.state.product!=null){
            return (
                <>
                    <ScrollView>
                    {images.length>=1
                        ?
                        <TouchableOpacity style={{ position: 'absolute', zIndex: 2, flexDirection: 'row', alignItems: 'center', top: 25, left: 25 }} onPress={() => this.props.navigation.goBack()}>
                            <GoBack />
                            <Text style={[styles.goBack]}>{lang.strings.back}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{ position: 'absolute', zIndex: 2, flexDirection: 'row', alignItems: 'center', top: 25, left: 25 }} onPress={() => this.props.navigation.goBack()}>
                            <GoBackBlack />
                            <Text style={[styles.goBack],{color:'#545454',marginLeft:10,}}>{lang.strings.back}</Text>
                        </TouchableOpacity>
                    }
    
                        <View style={{ width: '100%', height: 200}}>
                            {images.length>0
                             ?
                                <Swiper
                                    loop={true}
                                    autoplay={true}
                                    showsPagination={true}
                                    activeDotColor={'#fff'}
                                    dot={(<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 15, height: 15, borderRadius: 8, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />)}
                                    activeDot={(<View style={{ backgroundColor: '#fff', width: 15, height: 15, borderRadius: 8, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />)}>
                                            {images.map((item,index)=>{
                                                return(
                                                    <ImageBackground style={{ flex: 1, height: '100%', width: '100%' }} imageStyle={{ height: '100%', borderRadius: 5, resizeMode: 'cover' }} source={{uri: 'https://client.picoly.app/storage/'+item}} imageStyle={{ flex: 1, borderRadius: 5, resizeMode: 'cover' }}>
                                                        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.15)' }}>
                                                        </View>
                                                    </ImageBackground>
                                                )
                                            })}
                                </Swiper>
                                
                             :  <Image style={{width:'100%',height:'100%'}} source={require('../../assets/images/no-image.png')} />
                            }
    
                        </View>
    
                        <View style={{ width: '100%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20, paddingRight: 20 }}>
                                <Text style={styles.productDetailsTitle}>{this.state.product.name}</Text>
                                <View style={{ paddingTop: 15 }}>
                                    <View style={{ backgroundColor: '#F5F6FA', padding: 5, borderRadius: 8, paddingLeft: 15, paddingRight: 15 }}>
                                        <Text style={styles.mealType}>{this.state.category}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.productDetailsDescription}>{this.state.product.description}</Text>
    
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 30, paddingLeft: 20 }}>
                                <PriceTag />
                                <Text style={[styles.productDetailsTitle, { paddingTop: 0, paddingLeft: 5 }]}>{this.state.product.price} {this.currency}</Text>
                            </View>
                            {this.state.product.calories && this.state.layout ==0
                             ?
                                <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.2, borderTopColor: '#707070', borderBottomWidth: 0.2, borderBottomColor: '#707070', padding: 20, paddingLeft: 0 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                        <CaloriesTag />
                                        <Text style={styles.productDetailsTag}>{lang.strings.calories}: {this.state.product.calories}</Text>
                                    </View>
                                </View>
                             : null
                            }
                            
                            {this.state.product.weight && this.state.layout ==0
                                ?
                                <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.2, borderBottomColor: '#707070', padding: 20, paddingLeft: 0 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                        <WeightTag />
                                        <Text style={styles.productDetailsTag}>{lang.strings.weight}: {this.state.product.weight} gr</Text>
                                    </View>
                                </View>
                                : null
                            }
                              
                               {custom_field ?
                               custom_field.map((item,index)=>{
                                   return(
                                    <TouchableOpacity onPress={()=>this.changeLayout(index)} style = {{flexDirection:'row',borderBottomColor:'#707070',borderTopColor:'#707070', borderTopWidth:0.2,paddingTop:10,paddingBottom:10,justifyContent:'space-between',alignItems:this.state.expanded == index ? 'stretch' :'center',paddingLeft:20,paddingRight:20}}>
                                        <View style = {{flexDirection:'column',justifyContent:'flex-start'}}>
                                            <View style = {{flexDirection:'row',justifyContent:'flex-start'}}>
                                                <Text style = {{fontFamily: 'OpenSans-SemiBold',color:'#545454',marginRight:10,}}>{item.name}</Text>
                                                <Text style = {{fontFamily: 'OpenSans-SemiBold',color:'#545454',marginRight:10,display:this.state.expanded ==index ? 'none' : 'flex'}}>{item.description.substring(22,0)+' ...'}</Text>
                                            </View>
                                                <Text style = {{fontFamily: "OpenSans-Regular",color:'#545454',height:this.state.expanded ==index ? null : 0}}>{item.description}</Text>
                                        </View>
                                        <DownArrow style = {{transform: this.state.expanded == index ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }] }}></DownArrow>
                                    </TouchableOpacity>
                                   )
                               }) : null
                               }
    
                                {
                                    this.props.restaurant && this.props.restaurant.restaurant && this.props.restaurant.restaurant.restaurant && this.props.restaurant.restaurant.restaurant.custom_order == 0
                                    ?
                                    null
                                    :
                                    this.state.layout == 0
                                        ?
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20,paddingLeft:10,paddingRight:10,paddingBottom: 100 }}>
                                                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginRight: 10, borderWidth: 1, borderColor: '#8A8A8A', borderRadius: 5, }}>
                                                    <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => this.decreaseQuantity()}><Text style={styles.plusMinus}>-</Text></TouchableOpacity>
                                                    <Text style={styles.quantity}>{this.state.quantity}</Text>
                                                    <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => this.increaseQuantity()}><Text style={styles.plusMinus}>+</Text></TouchableOpacity>
                                                </View>
                
                                                <TouchableOpacity
                                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#E32340', borderRadius: 5 }}
                                                    onPress={() => this.addToCart(this.state.product)}>
                                                    <Text style={styles.addCart}>{lang.strings.addToCart}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        : 
                                            <View style={{ padding: 20,paddingBottom: 100 }}>
                                                <ConfirmCommandService service = {this.state.product} table_id = {this.props.restaurant.restaurant.table.id} restaurant_id = {this.props.restaurant.restaurant.restaurant.id} ref={(ref)=>this.refSendCommand = ref} />
                                                <TouchableOpacity
                                                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E32340', borderRadius: 5 }}
                                                    onPress={() => {if(this.refSendCommand) this.refSendCommand.toggleModal();}}>
                                                    <Cart />
                                                    <Text style={styles.btnComanda}>{lang.strings.orderService}</Text>
                                                </TouchableOpacity>
                                            </View>
                                    
                                }
                        </View>
                    </ScrollView>
    
                    <CartFooter ref={this.refFooterCart} navigation={this.props.navigation} />
                </>
            )
        }else{
            return(
                <View><Text>Nothing</Text></View>
            )
        }
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

const mapStateToProps = state => ({
    restaurant: state.restaurant
});
const mapDispatchToProps = dispatch => ({
    setRestaurant: (data) => dispatch(setRestaurant(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);