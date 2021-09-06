import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity , Keyboard } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from '../styles';
import lang from '../Languages';

import SvgWaiter from '../../assets/images/footer-icon-waiter.svg';
import SvgWaiterActive from '../../assets/images/footer-icon-waiter-active.svg';
import SvgOffers from '../../assets/images/footer-icon-offers.svg';
import SvgOffersActive from '../../assets/images/footer-icon-offers-active.svg';
import SvgFeedback from '../../assets/images/footer-icon-feedback.svg';
import SvgFeedbackActive from '../../assets/images/footer-icon-feedback-active.svg';
import SvgHelp from '../../assets/images/footer-icon-help.svg';
import SvgHelpActive from '../../assets/images/footer-icon-help-active.svg';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state={
            hide: false,
          }
          this._keyboardDidShow = this._keyboardDidShow.bind(this);
          this._keyboardDidHide = this._keyboardDidHide.bind(this);
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          this._keyboardDidHide,
        );
      }
  
      componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
      }
  
      _keyboardDidShow() {
        this.setState({hide : true})
      }
  
      _keyboardDidHide() {
        this.setState({hide : false})
      }

      navigate(to){
        this.props.onCloseMenu();
        this.props.navigation.navigate(to);
      }

    render () {
        if(this.state.hide)
        return(
          <View></View>
        )
        return (
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.footerItem} onPress={() => this.navigate('Dashboard')} >
                    {this.props.activeRoute=="waiter" ? <SvgWaiterActive width="35" /> : <SvgWaiter width="35" /> }
                    <Text style={styles.footerItemText}>{lang.strings.callWaiter}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => this.navigate('Offers')} >
                    {this.props.activeRoute=="offers" ? <SvgOffersActive width="35" /> : <SvgOffers width="35" /> }
                    <Text style={styles.footerItemText}>{lang.strings.menu}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => this.navigate('Feedback')}>
                    {this.props.activeRoute=="feedback" ? <SvgFeedbackActive width="35" /> : <SvgFeedback width="35" /> }
                    <Text style={styles.footerItemText}>Feedback</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => this.navigate('Help')}>
                    {this.props.activeRoute=="help" ? <SvgHelpActive width="35" /> : <SvgHelp width="35" /> }
                    <Text style={styles.footerItemText}>{lang.strings.help}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default withNavigation(Footer);