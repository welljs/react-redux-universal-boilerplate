import {localCompose} from '../../../../../common/redux/store/localCompose';
import {loadReducer} from './load';

export default localCompose(loadReducer);