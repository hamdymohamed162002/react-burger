import React, { Component } from 'react';
import { Switch , Route,withRouter, Redirect } from 'react-router-dom'
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/logout/logout';
import * as actions from './store/actions/index'
import {connect} from 'react-redux'
import asyncComponent from './hoc/asyncComponent/asyncComp';
const cehckcomp=asyncComponent(()=>{
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount(){
    this.props.onAuthCheck();
  }
  render () {
    let routes=(<Switch>
      <Route  path='/Auth'  component={cehckcomp} />

      <Route  path='/'  exact component={BurgerBuilder} />
      <Redirect to='/'/>

  </Switch>);
    
    if(this.props.isAuth){
      routes=(<Switch>
          <Route path='/checkout' component={CheckOut}/>
          <Route  path='/orders'  component={Orders} />
          <Route  path='/logout'  component={Logout} />
          <Route  path='/'  exact component={BurgerBuilder} />


          <Redirect to='/'/>

      </Switch>)
    }
    return (
      <div>
        <Layout>  
     {routes}
        </Layout>
      </div>
    );
  }
}
const mapStatetoProps=state=>{
  return{
    isAuth:state.auth.tokenId!==null,

  }
}
const mapDispatchToProps=dispatch=>{
  return{
    onAuthCheck:()=>{dispatch(actions.authCheckState())}
  }
}

export default withRouter(connect(mapStatetoProps,mapDispatchToProps)( App));
