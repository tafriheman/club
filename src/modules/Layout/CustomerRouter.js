import React, { Component } from "react"
import { Switch, Route, withRouter, Redirect } from "react-router-dom"

import ProductList from "../Product/ProductList"


const CustomerRouter = (props) => (
    <Switch>
        <Route path="/clubs/:clubId" component={ProductList} exact />
    </Switch>
)

export default CustomerRouter