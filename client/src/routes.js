import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';



function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const university = Loadable({
  loader:() => import('./views/University/UniversityList'),
  loading: Loading
})

const adduniversity = Loadable({
  loader:() => import('./views/University/university'),
  loading: Loading
})
const college = Loadable({
  loader:() => import('./views/College/college'),
  loading: Loading
})

const courses = Loadable({
  loader:() => import('./views/Course/courses'),
  loading: Loading
})



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/main', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/main/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/main/universities', exact: true, name: 'Universities', component: university},
  { path: '/main/university', exact: true, name: 'University', component: adduniversity},
  { path: '/main/college', exact: true, name: 'College', component: college },
  { path: '/main/courses', exact: true, name: 'Courses', component: courses }
];

export default routes;
