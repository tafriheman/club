import React from "react";
import {Switch, Route} from "react-router-dom";
import ProductList from "../Product/ProductList";



const ClubRouter = () => (
  <Switch>
    <Route path='/clubs/:clubId' render={() => <ProductList isClubProfile/>} exact/>
  </Switch>
)

export default ClubRouter