import {combineReducers} from 'redux';
import moviesReducer from './moviesReducer';
import detailReducer from './detailReducer';
import otherFunctionalReducer from './otherFunctionalReducer';

const rootReducer = combineReducers({
    movies:moviesReducer,
    detail:detailReducer,
    others:otherFunctionalReducer,
})

export default rootReducer;