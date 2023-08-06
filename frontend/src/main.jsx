import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './Screen/HomeScreen.jsx';
import LoginScreen from './Screen/LoginScreen.jsx';
import RegisterScreen from './Screen/RegisterScreen.jsx';
import store from './store';
import { Provider } from 'react-redux';
import ProfileScreen from './Screen/ProfileScreen.jsx';
import PrivateRoute from './Components/PrivetRouter.jsx';
import EditProfile from './Screen/EditProfile.jsx'
import AdminPrivateRoute from './Components/AdminPrivetRoute.jsx';
import AdminHomeScreen from './Screen/AdminHome.jsx';
import AdminRegisterScreen from './Screen/AdminSignUp.jsx'
import AdminLoginScreen from './Screen/AdminLoginScreen.jsx'
import AdminUserPRview from './Screen/AdminUserPRview.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
     
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} /> 


      <Route path='' element={<PrivateRoute />}>
         <Route path='/profile' element={<ProfileScreen />} />
         <Route path='/editprofile' element={<EditProfile />} />
      </Route>


      <Route path="/admin/register" element={<AdminRegisterScreen/>} />
      <Route path="/admin/login" element={<AdminLoginScreen />} />
      
<Route path='' element={<AdminPrivateRoute />}>
      <Route path="/admin/userProfile" element={<AdminUserPRview />} />
      <Route path="/admin/adminHome" element={<AdminHomeScreen />} />

</Route>
     
      


    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);


