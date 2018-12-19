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
  loader:() => import('./views/university/UniversityList'),
  loading: Loading
})

const adduniversity = Loadable({
  loader:() => import('./views/university/AddUniversity'),
  loading: Loading
})


const edituniversity = Loadable({
  loader:() => import('./views/university/EditUniversity'),
  loading: Loading
})

const viewuniversity = Loadable({
  loader:() => import('./views/university/ViewUniversity'),
  loading: Loading
})

const college = Loadable({
  loader:() => import('./views/college/CollegeList'),
  loading: Loading
})

const addcollege = Loadable({
  loader:() => import('./views/college/AddCollege'),
  loading: Loading
})


const editcollege = Loadable({
  loader:() => import('./views/college/EditCollege'),
  loading: Loading
})

const course = Loadable({
  loader:() => import('./views/course/CourseList'),
  loading: Loading
})

const addcourse = Loadable({
  loader:() => import('./views/course/AddCourse'),
  loading: Loading
})


const editcourse = Loadable({
  loader:() => import('./views/course/EditCourse'),
  loading: Loading
})






// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/main', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/main/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/main/universities', exact: true, name: 'Universities', component: university},
  { path: '/main/universities/add', exact: true, name: 'AddUniversities', component: adduniversity},
  { path: '/main/universities/edit/:id', exact: true, name: 'EditUniversities', component: edituniversity},
  { path: '/main/universities/view/:id', exact: true, name: 'ViewUniversities', component: viewuniversity},
  { path: '/main/college', exact: true, name: 'College', component: college},
  { path: '/main/college/add', exact: true, name: 'AddCollege', component: addcollege},
  { path: '/main/college/edit/:id', exact: true, name: 'EditCollege', component: editcollege},
  { path: '/main/course', exact: true, name: 'Course', component: course},
  { path: '/main/course/add', exact: true, name: 'AddCourse', component: addcourse},
  { path: '/main/course/edit/:id', exact: true, name: 'EditCourse', component: editcourse},
 
];

export default routes;
