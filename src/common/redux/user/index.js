import {localCompose} from 'easy-redux';
import {loginReducer} from './login';
import {loadReducer} from './load';

export default localCompose(loginReducer, loadReducer);