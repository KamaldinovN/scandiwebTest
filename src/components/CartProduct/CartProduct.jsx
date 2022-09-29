import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProducts } from "../../redux/cart/cart_selector";

import styles from "./CartProduct.module.css";
import routes from "../../routes";
import ItemCart from "../ItemCart";

class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.getQuantity = this.getQuantity.bind(this);
  }

  getQuantity(quantity) {
    this.setState({ totalQuantity: quantity });
  }

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
        {products.length ? (
          <ul>
            {products.map((product) => {
              return (
                <ItemCart
                  product={product}
                  key={product.id}
                  currency={this.props.currency}
                  getQuantity={this.getQuantity}
                />
              );
            })}
          </ul>
        ) : (
          <div className={styles.empty}>Cart empty</div>
        )}
        {products.length ? (
          <div className={styles.cart__invoice}>
            <div>
              Tax 21%:{" "}
              <span className={styles.tax}>
                {products[0].prices[this.props.currency].currency.symbol || 0}
                {(this.Total() * 0.21).toFixed(2)}
              </span>
            </div>
            <div>
              Quantity:{" "}
              <span className={styles.quantity}>{products.length}</span>
            </div>
            <div>
              Total:{" "}
              <span className={styles.total}>
                {" "}
                {products[0].prices[this.props.currency].currency.symbol}
                {this.Total().toFixed(2)}{" "}
              </span>
            </div>
            <Link to={routes.checkout} className={styles.orderLink}>
              <button className={styles.cart__invoice_order}>Order</button>
            </Link>
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  products: getProducts(state),
});

export default connect(mapStateToProps, null)(CartProduct);
