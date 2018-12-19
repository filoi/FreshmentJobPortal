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


const college = Loadable({
  loader:() => import('./views/college/collegeList'),
  loading: Loading
})


const newcollege = Loadable({
  loader:() => import('./views/college/college'),
  loading: Loading
})

const courses = Loadable({
  loader:() => import('./views/Course/courses'),
  loading: Loading
})

const addsubcat = Loadable({
  loader:() => import('./views/subcategory/AddSubCate'),
  loading: Loading
})


const subcategory = Loadable({
  loader:() => import('./views/subcategory/SubCatList'),
  loading: Loading
})


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/main', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/main/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/main/universities', exact: true, name: 'Universities', component: university},
  { path: '/main/universities/add', exact: true, name: 'AddUniversities', component: adduniversity},
  { path: '/main/universities/edit/:id', exact: true, name: 'EditUniversities', component: edituniversity},
  { path: '/main/college', exact: true, name: 'College', component: college },
  { path: '/main/newcollege', exact: true, name: 'College', component: newcollege },
  { path: '/main/courses', exact: true, name: 'Courses', component: courses },


  { path: '/main/subjectcategory/add', exact: true, name: 'AddSubCategory', component: addsubcat},
 // { path: '/main/subjectcategory/edit/:id', exact: true, name: 'EditSubCategory', component: editsubcategory},
  { path: '/main/subjectcategory', exact: true, name: 'SubjectCategory', component: subcategory},


  // { path: '/main/subjectcategory/add', exact: true, name: 'AddSubCategory', component: addsubcat},

];

export default routes;
