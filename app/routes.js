import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Welcome from './screens/Welcome';
import Dashboard from './screens/Dashboard';
import ScanQr from './screens/ScanQr';
import Feedback from './screens/Feedback';
import Offers from './screens/Offers';
import DespreNoi from './screens/DespreNoi';
import Confidentialitate from './screens/Confidentialitate';
import Help from './screens/Help';
import AuthLoading from './screens/AuthLoading';
import FirstTime from './screens/FirstTime';
import ProductsList from './screens/ProductsList';
import DigitalMenu from './screens/DigitalMenu';
import OffersList from './screens/OffersList';
import ServiciesList from './screens/ServiciesList';
import CartView from './screens/CartView';

const Navigator = createStackNavigator({
    AuthLoading: { screen: AuthLoading },
    FirstTime: { screen: FirstTime },
    Welcome: { screen: Welcome },
    Dashboard: { screen: Dashboard },
    ScanQr: { screen: ScanQr },
    Feedback: { screen: Feedback },
    Offers: { screen: Offers },
    DespreNoi: { screen: DespreNoi },
    Confidentialitate: { screen: Confidentialitate },
    Help: { screen: Help },

    ProductsList: { screen: ProductsList},
    DigitalMenu: { screen: DigitalMenu},
    OffersList: { screen: OffersList },
    ServiciesList: { screen: ServiciesList },
    CartView: { screen: CartView }
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none',

    navigationOptions: {
      headerVisible: false,
    }
    
  });

  export default createAppContainer(Navigator);