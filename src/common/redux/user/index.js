import {localCompose} from '../redux-well/localCompose';
import {loginReducer} from './login';
import {loadReducer} from './load';

export default localCompose(loginReducer, loadReducer);