import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProducts } from "../../redux/cart/cart_selector";

import styles from "./CartProduct.module.css";
import routes from "../../routes";
import ItemCart from "../ItemCart";

class CartProduct extends Component {
  Total() {
    return this.props.products.reduce((acc, product) => {
      acc += product.prices[this.props.currency].amount;
      return acc;
    }, 0);
  }
  render() {
    const products = this.props.products;

    return (
      <>
        <ul>
          {products.map((product) => {
            return (
              <ItemCart
                currency={this.props.currency}
                product={product}
                key={product.id}
              />
            );
          })}
        </ul>
        <div className={styles.cart__invoice}>
          <div>
            Tax 21%:{" "}
            <span className={styles.tax}>
              {products[0].prices[this.props.currency].currency.symbol}
              {(this.Total() * 0.21).toFixed(2)}
            </span>
          </div>
          <div>
            Quantity: <span className={styles.quantity}>{products.length}</span>
          </div>
          <div>
            Total:{" "}
            <span className={styles.total}>
              {" "}
              {products[0].prices[this.props.currency].currency.symbol}
              {this.Total().toFixed(2)}{" "}
            </span>
          </div>
          <Link to={routes.checkout}>
            <button className={styles.cart__invoice_order}>Order</button>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  products: getProducts(state),
});

export default connect(mapStateToProps, null)(CartProduct);
