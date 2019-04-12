import React from "react";
import {Switch, Route} from "react-router-dom";
import ProductList from "../../Product/ProductList";
import OrderCustomer from '../../orderCustomer/OrderCustomer';


const ClubRouter = () => (
  <Switch>
    <Route path='/clubs/:clubId' render={() => <ProductList isClubProfile/>} exact/>
    <Route path='/clubs/order/customer' render={() => <OrderCustomer/>} exact />
  </Switch>
)

export default ClubRouter