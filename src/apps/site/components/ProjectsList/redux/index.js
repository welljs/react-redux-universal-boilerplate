import {localCompose} from '../../../../../common/redux/redux-well/localCompose';
import {loadReducer} from './load';

export default localCompose(loadReducer);