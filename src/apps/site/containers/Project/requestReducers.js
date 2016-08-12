import {applyRequestReducer} from '../../../../common/redux/redux-well/applyRequestReducer';

export default function () {
  return applyRequestReducer('project', {
    load: {
      initialState: {
        foo: 'bar'
      },
      promise: (project_id) => request => {
        debugger;
        return request('/api/project/').get({params: {limit}})
      },
      onSuccess: (state, action) => ({...state, customSuccessProp: true}),
      onFail: (state, action) => ({...state, customErrorProp: true})
    },
    login: {
      promise: ({email, pass}) => request => request('/user/login').post({data:{email, pass}})
    }
  });
};