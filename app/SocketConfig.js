/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TouchableOpacity, Animated, Easing, Image, Text, View, NativeModules} from 'react-native';

import lang from './Languages';

import Pusher from 'pusher-js/react-native';
import emitter from 'tiny-emitter/instance';


class SocketConfig extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
       
        this.connect = this.connect.bind(this)
        this.disconnect = this.disconnect.bind(this)
        // this.connect();
    }

    pusher = null
    channel = null
 
    componentDidMount(){
        emitter.on('restaurant_connect',(restaurant_id, table_id) => {
            this.disconnect();
            this.connect(restaurant_id, table_id);
        });
    }
    connect(restaurant_id, table_id) {
        let pusherOptions = {
            key: 'twerwere',
            wsHost: 'client.picoly.app',
            wsPath: '/ws',
            enabledTransports: ["ws", "wss"],
            disableStats: true,
            authEndpoint: "https://client.picoly.app/api/pusher/auth",
            auth: { headers: {} },
        }
        
        this.pusher = new Pusher(pusherOptions.key, pusherOptions);
        this.channel = this.pusher.subscribe('private-restaurant.'+restaurant_id+'.client_table.'+table_id);
        this.channel.bind('client_close_table', event => {
            emitter.emit('app_reload');
        });
        this.channel.bind('client_cancel_table', event => {
            alert(lang.strings.cancelCommand);
        });
    }

    disconnect() {
        if(this.pusher){
            this.pusher.disconnect();
        }
        this.pusher = null;
        this.channel = null;

    }

  render() {
    
    return (
        <View >
             
        </View>
    );
  }
}

export default SocketConfig;