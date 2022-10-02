import { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { LOAD_CATEGORIES } from "./GraphQl";
import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import Container from "./components/Container";
import AppBar from "./components/AppBar";
import Loader from "./components/Loader";

import "./App.css";

const Category = lazy(() => import("./pages/Category"));

const Product = lazy(() => import("./pages/Product"));

const Cart = lazy(() => import("./pages/Cart"));

const Checkout = lazy(() => import("./pages/Checkout"));

const NoFound = lazy(() => import("./pages/NoFound"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: 0,
    };
    this.updateState = this.updateState.bind(this);
  }
  updateState(id) {
    this.setState({ currencies: id });
  }
  render() {
    const currency = this.state.currencies;
    const { data } = this.props;
    const { error, loading } = data;

    return (
      <Container>
        <AppBar
          categories={data.categories}
          update={this.updateState}
          currency={currency}
        />

        <Suspense fallback={<Loader />}>
          <Switch>
            {data.categories &&
              data.categories.map((category) => {
                return (
                  <Route exact path={`/${category.name}`} key={category.name}>
                    <Category currency={currency} name={category.name} />
                  </Route>
                );
              })}

            {data.categories &&
              data.categories.map((category) => {
                return (
                  <Route
                    exact
                    path={`/${category.name}/:productId`}
                    key={category.name}
                  >
                    <Product currency={currency} />
                  </Route>
                );
              })}

            <Route exact path="/cart">
              <Cart currency={currency} />
            </Route>

            <Route exact path="/checkout">
              <Checkout />
            </Route>
            <Route exact path="*" element={<NoFound />} />
          </Switch>
        </Suspense>
        {error && <p>{JSON.stringify(error.message)}</p>}

        {loading && <Loader />}
      </Container>
    );
  }
}

export default graphql(LOAD_CATEGORIES)(App);
