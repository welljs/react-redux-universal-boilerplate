import {applyRequestReducer} from '../../../../common/redux/redux-well/applyRequestReducer';

export default function () {
  return applyRequestReducer('project', {
    load: ({limit}) => ({
      initialState: {
        foo: 'bar'
      },
      promise: request => request('/api/project/').get({params: {limit}}),
      onSuccess: (state, action) => ({...state, customSuccessProp: true}),
      onFail: (state, action) => ({...state, customErrorProp: true})
    })
  });
};