import {applyRequestReducers} from 'easy-redux';

export default function () {
  applyRequestReducers('project', {
    load: {
      initialState: {
        foo: 'bar'
      },
      promise: request => (id) => request(`/project/${id}`).get({})
    },
    login: {
      promise: ({email, pass}) => request => request('/user/login').post({data:{email, pass}})
    }
  });
};