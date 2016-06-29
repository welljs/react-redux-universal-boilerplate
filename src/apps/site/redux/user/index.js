import {localCompose} from '../../../../common/redux/store/localCompose';
import {loginReducer} from './login';
export default localCompose(loginReducer)