import {applyRequestReducer} from '../../../../common/redux/redux-well/applyRequestReducer';

export default function () {
  applyRequestReducer('project', {
    load: {
      initialState: {
        foo: 'bar'
      },
      promise: request => (id) => request(`/project/${id}`).get({}),
      onSuccess: (state, action) => ({...state, data: action.result, customSuccessProp: true}),
      onFail: (state, action) => ({...state, customErrorProp: true})
    },
    login: {
      promise: ({email, pass}) => request => request('/user/login').post({data:{email, pass}})
    }
  });
};