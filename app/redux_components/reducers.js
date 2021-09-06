import { combineReducers } from 'redux';

const restaurant = (state = {}, action) => {
    switch (action.type) {
        case 'SET_RESTAURANT':
            return { ...state, restaurant: action.restaurant };
        case 'DESTROY_RESTAURANT':{    
            return {}
        } 
        default:
            return state;
    }
};


export default combineReducers({
    restaurant: restaurant,
});