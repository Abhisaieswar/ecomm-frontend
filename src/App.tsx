import React from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import NewProduct from './components/NewProduct';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Orders from './components/Orders';
import Cart from './components/Cart';
import OrderDetails from './components/OrderDetails';

const App:React.FC=()=>{
  return(
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
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

