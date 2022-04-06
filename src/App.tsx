import React from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';
import './App.css';
import Home from './components/Home';

import NewProduct from './components/NewProduct';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Orders from './components/Orders';
import Cart from './components/Cart';
import OrderDetails from './components/OrderDetails';

//<Route exact path="/login" component={Login}/>
//<Redirect to="/not-found"/>

const App:React.FC=()=>{
  return(
      <Switch>
        <Route exact path="/login" component={Login}/>
        <ProtectedRoute exact path='/' component={Home}/>
        <ProtectedRoute exact path="/newproduct/" component={NewProduct}/>
        <ProtectedRoute exact path="/orders" component={Orders}/>
        <ProtectedRoute exact path="/cart" component={Cart}/>
        <ProtectedRoute exact path="/orders/:id" component={OrderDetails}/>
        <Redirect to="/not-found"/>
      </Switch>
  )
}

export default App;

