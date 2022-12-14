import { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import styles from "./ProductsItem.module.css";

import { ReactComponent as EmptyCart } from "../../images/empty-cart.svg";
import { addProduct } from "../../redux/cart/cart_reducer";

class ProductsItem extends Component {
  addToCart = (product) => {
    let objCopy = JSON.parse(JSON.stringify(product));
    objCopy.quantity = 1;
    objCopy.uniqueID = Date.now();
    objCopy.attributes.forEach((item) => {
      item.items[0] = Object.assign({ isActive: true }, item.items[0]);
    });
    this.props.dispatchToCart(objCopy);
  };

  render() {
    const product = this.props.product;
    const categoryName = this.props.category;
    const stockStatus = product.inStock
      ? styles.item
      : `${styles.item} ${styles["item--none"]}`;
    return (
      <li className={stockStatus}>
        <Link
          to={{
            pathname: `${categoryName}/${product.id}`,
            state: { from: this.props.location },
          }}
          className={styles.item__link}
        >
          <article>
            <div className={styles.item__thumb}>
              <img
                src={product.gallery[0]}
                className={styles.item__image}
                title={product.name}
                alt={product.name}
                width="356"
                height="338"
                loading="lazy"
              />
            </div>

            {!product.inStock && (
              <p className={styles.item__out}>Out of stock</p>
            )}

            <div className={styles.item__content}>
              <h2 className={styles.item__title}>{product.name}</h2>
              <p className={styles.item__price}>
                {product.prices[this.props.currency].currency.symbol}
                {product.prices[this.props.currency].amount}
              </p>
            </div>
          </article>
        </Link>

        {product.inStock && (
          <button
            type="button"
            className={styles.item__cart}
            onClick={() => this.addToCart(product)}
            title="Add to cart"
            alt="Add to cart"
          >
            <EmptyCart />
          </button>
        )}
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchToCart: (product) => dispatch(addProduct(product)),
});

export default connect(null, mapDispatchToProps)(withRouter(ProductsItem));
