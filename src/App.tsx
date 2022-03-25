import React from 'react';
import {Switch,Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import UpdateItem from './components/UpdateItem';
import NewProduct from './components/NewProduct';
import Bot from './components/Bot';



const App:React.FC=()=>{
  return(
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path="/update/:id" component={UpdateItem}/>
        <Route exact path="/newproduct/" component={NewProduct}/>
        <Route exact path="/bot/" component={Bot}/>
      </Switch>
  )
}

export default App;

