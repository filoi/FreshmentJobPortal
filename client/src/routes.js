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
  loader:() => import('./views/Course/CourseList'),
  loading: Loading
})

const addcourse = Loadable({
  loader:() => import('./views/Course/AddCourse'),
  loading: Loading
})


const editcourse = Loadable({
  loader:() => import('./views/Course/EditCourse'),
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

const editsubcat = Loadable({
  loader:() => import('./views/subcategory/EditSubCate'),
  loading: Loading
})

const addsubject = Loadable({
  loader:() => import('./views/subject/AddSubject'),
  loading: Loading
})

const subject = Loadable({
  loader:() => import('./views/subject/SubjectList'),
  loading: Loading
})

const editsubject = Loadable({
  loader:() => import('./views/subject/EditSubject'),
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
  
  { path: '/main/subjectcategory/add', exact: true, name: 'AddSubCategory', component: addsubcat},
  { path: '/main/subjectcategory', exact: true, name: 'SubjectCategory', component: subcategory},
   { path: '/main/subjectcategory/edit/:id', exact: true, name: 'EditSubjectCategory', component: editsubcat},

  { path: '/main/subject/add', exact: true, name: 'AddSubject', component: addsubject},
  { path: '/main/subject', exact: true, name: 'Subject', component: subject},
  { path: '/main/subject/edit/:id', exact: true, name: 'EditSubject', component: editsubject},

];

export default routes;
