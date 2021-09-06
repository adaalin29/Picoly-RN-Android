import React, { Component } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, TextInput, Alert, BackHandler } from 'react-native';
import StarRating from 'react-native-star-rating';
import lang from '../Languages';
import styles from '../styles.js';

import Header from '../components/Header';
import OpenedMenu from '../components/OpenedMenu';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { destroyRestaurant } from '../redux_components/actions';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servingStars: 0,
            foodStars: 0,
            servingText: '',
            foodText: '',
            alteInfo:'',
            isMenuOpened: false, // on every menu page
            reloadAppConst: false, // on every menu page
        }
        this.backHandler = null;
        this.openMenu = this.openMenu.bind(this); // on every menu page
        this.closeMenuAction = this.closeMenu.bind(this); // on every menu page
    }

    componentDidMount() {
        this.setState({reloadAppConst: this.props.navigation.getParam('reloadAppConst', false)});
        if (this.backHandler)
        this.backHandler.remove();
      this.backHandler = BackHandler.addEventListener('backPress', this.handleBackButton.bind(this));
    }
    componentWillUnmount(){
        if (this.backHandler)
          this.backHandler.remove();
    }


    handleBackButton() {
        this.askGoBack();
        return true;
      }
    // on every menu page
    openMenu = () => {
        this.setState({isMenuOpened: true});
    }
    closeMenu = () => {
        this.setState({isMenuOpened: false});
    }

    onServingRatingPress(rating) {
        switch (rating) {
            case 1:
                this.state.servingText = lang.strings.rating1;
                break;
            case 2:
                this.state.servingText = lang.strings.rating2;
                break;
            case 3:
                this.state.servingText = lang.strings.rating3;
                break;
            case 4:
                this.state.servingText = lang.strings.rating4;
                break;
            case 5:
                this.state.servingText = lang.strings.rating5;
                break;
            default:
                break;
        }
        if(rating == this.state.servingStars){
            this.state.servingText = '';
            this.setState({
                servingStars: 0
            });
        }
        else{
            this.setState({
                servingStars: rating
            });
        }

      }

    onFoodRatingPress(rating) {
        switch (rating) {
            case 1:
                this.state.foodText = lang.strings.rating1;
                break;
            case 2:
                this.state.foodText = lang.strings.rating2;
                break;
            case 3:
                this.state.foodText = lang.strings.rating3;
                break;
            case 4:
                this.state.foodText = lang.strings.rating4;
                break;
            case 5:
                this.state.foodText = lang.strings.rating5;
                break;
            default:
                break;
        }
        if(rating == this.state.foodStars){
            this.state.foodText = '';
            this.setState({
                foodStars: 0
            });
        }
        else{
            this.setState({
                foodStars: rating
            });
        }
    
 
    }
    reloadApp(){
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
        });
        this.props.navigation.dispatch(resetAction);
        this.props.destroyRestaurant(this.props.restaurant.restaurant);
    }
    askGoBack(){
        if(this.state.reloadAppConst){
            Alert.alert(
                lang.strings.sendRating,
                lang.strings.woulrdRating,
                [
                    {
                    text: lang.strings.alright,
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                    },
                    {text: lang.strings.noThanks, onPress: () => this.reloadApp()},
                ],
                {cancelable: false},
                );
        } else{
            this.props.navigation.goBack();
        }
        // Alert.alert(
        //     'Acorda rating',
        //     'Ne-ar placea sa ne lasi un rating',
        //     [
        //         {text: lang.strings.noThanks, onPress: () => this.reloadApp()},
        //         {text: lang.strings.woulrdRating,onPress: () => console.log('Cancel Pressed'),style: 'cancel',},
        //     ],
        //     {cancelable: false},
        //     );
       
    }

    leaveRating(){
        if(!this.props.restaurant.restaurant)
        Alert.alert(
            lang.strings.scanCode,
            lang.strings.actionQr,
            [
              {
                text: lang.strings.giveUp,
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: lang.strings.scanButton, onPress: () => this.props.navigation.navigate('ScanQr')},
            ],
            {cancelable: false},
          );
        else{
            if(this.state.servingStars == 0){
                Alert.alert(
                    lang.strings.mandatoryField,
                    lang.strings.feedback,
                    [
                      {
                        text: lang.strings.gotIt,
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                    ],
                    {cancelable: false},
                  );
                return;
            }
             fetch('https://client.picoly.app/api/leaveReview', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    restaurant_id: global.restaurant_id,
                    table_id:  global.table_id,
                    food: this.state.foodStars,
                    rate:  this.state.servingStars,
                    content:this.state.alteInfo,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.success){
                        this.state.servingStars = 0;
                        this.state.foodStars = 0;
                        this.state.servingText = '';
                        this.state.foodText = '';
                        this.setState({alteInfo: ''});
                        Alert.alert(
                            lang.strings.thankYou,
                            lang.strings.feedbackSent,
                            [
                              {
                                text: lang.strings.further,
                                onPress: () => this.reloadApp(),
                                style: 'cancel',
                              },
                            ],
                            {cancelable: false},
                          );
                        //   this.props.destroyRestaurant(this.props.restaurant.restaurant);
                    }
                    // else if(responseJson.success == false && responseJson.msg){
                    //     Alert.alert(
                    //         responseJson.msg,
                    //         'Rescanează codul QR al unei mese pentru a continua',
                    //         [
                    //           {
                    //             text: lang.strings.giveUp,
                    //             onPress: () => console.log('Cancel Pressed'),
                    //             style: 'cancel',
                    //           },
                    //           {text: lang.strings.alright, onPress: () => this.props.navigation.navigate('ScanQr')},
                    //         ],
                    //         {cancelable: false},
                    //       );
                    // } 
                    else{
                        alert(JSON.stringify(responseJson));
                    }
                }).catch((error) => {
                    alert(JSON.stringify(error));
            });
        }
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <Header navigation={this.props.navigation} onOpenMenu={() => this.openMenu()} />
                <OpenedMenu opened={this.state.isMenuOpened} navigation={this.props.navigation} onClose={() => this.setState({isMenuOpened: false})}/>
                <View style={{flex: 1}}>
                    <ScrollView contentContainerStyle={{padding: 20}}>
                        <TouchableOpacity style={styles.goBackContainer} onPress={() => this.askGoBack()}>
                            <Image style={styles.goBackImage} source={require('../../assets/images/icon-arrow-left.png')} />
                            <Text style={styles.goBackText}>Feedback</Text>
                        </TouchableOpacity>
                        <Text style={styles.feedbackInfo}>{lang.strings.pleaseEvaluate}</Text>
                        <View style={styles.feedBackInputContainer}>
                            <Text style={styles.feedBackInputText}>{lang.strings.howAbout}</Text>
                            <StarRating
                                disabled={false}
                                fullStarColor={"#F29933"}
                                emptyStarColor={"#979595"}
                                starSize={25}
                                containerStyle={{width: '50%'}}
                                maxStars={5}
                                rating={this.state.servingStars}
                                selectedStar={(rating) => this.onServingRatingPress(rating)}
                            />
                            <Text style={styles.servingText}>{this.state.servingText}</Text>
                        </View>
                        <View style={styles.feedBackInputContainer}>
                            <Text style={styles.feedBackInputText}>{lang.strings.drink}</Text>
                            <StarRating
                                disabled={false}
                                fullStarColor={"#F29933"}
                                emptyStarColor={"#979595"}
                                starSize={25}
                                containerStyle={{width: '50%'}}
                                maxStars={5}
                                rating={this.state.foodStars}
                                selectedStar={(rating) => this.onFoodRatingPress(rating)}
                            />
                            <Text style={styles.servingText}>{this.state.foodText}</Text>
                        </View>
                        <View style={styles.feedBackInputContainer}>
                            <Text style={styles.feedBackInputText}>{lang.strings.moreInformations}</Text>
                            <TextInput style={[styles.feedBackAlteInfo,{textAlignVertical:'top'}]}
                                placeholder={''}   
                                multiline = {true}
                                value={this.state.alteInfo} 
                                onChangeText={(alteInfo) => this.setState({alteInfo})}
                            />
                        </View>
                        <View style={styles.feedBackInputContainer}>
                            <TouchableOpacity style={styles.feedbackSendButton} onPress={() => this.leaveRating()}>
                                <Text style={styles.feedbackSendText}>{lang.strings.send}</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </ScrollView>
                </View>
                {this.state.reloadAppConst
                ?
                    null
                :
                    <Footer onCloseMenu={() => this.setState({isMenuOpened: false})} navigation={this.props.navigation} activeRoute="feedback" />
                }
            </View>
        )
    }
}
const mapStateToProps = state => ({
    restaurant: state.restaurant
});
const mapDispatchToProps = dispatch => ({
    destroyRestaurant: (data) => dispatch(destroyRestaurant(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);