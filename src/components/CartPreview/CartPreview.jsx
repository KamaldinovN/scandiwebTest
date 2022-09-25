import { Component, createRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProducts } from "../../redux/cart/cart_selector";

import styles from "./CartPreview.module.css";

import { ReactComponent as CartImage } from "../../images/cart.svg";
import { ReactComponent as ArrowImage } from "../../images/arrow-up.svg";

import routes from "../../routes";
import ItemPreview from "../ItemPreview";

const body = document.querySelector("body");

class CartPreview extends Component {
  container = createRef();

  state = {
    open: false,
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleCartClick = () => {
    if (body.classList.contains(styles.hidden)) {
      body.classList.remove(styles.hidden);
    } else {
      body.classList.add(styles.hidden);
    }

    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
  };

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false,
      });

      body.classList.remove(styles.hidden);
    }
  };

  handleClickBackdrop = (event) => {
    if (event.currentTarget === event.target) {
      this.setState({
        open: false,
      });
    }
  };

  handleAttributes = () => {
    // alert('Selected');
  };
  Total() {
    return this.props.products.reduce((acc, product) => {
      acc += product.prices[this.props.currency].amount;
      return acc;
    }, 0);
  }

  render() {
    const products = this.props.products;
    return (
      <div className={styles.wrapper} ref={this.container}>
        <button
          className={styles.button}
          onClick={this.props.products.length ? this.handleCartClick : null}
        >
          <CartImage
            className={styles.cart}
            title={this.props.products.length ? "My bag" : "Card is empty"}
            alt={this.props.products.length ? "My bag" : "Card is empty"}
          />

          {this.props.products.length ? (
            <span className={styles.counter}>{this.props.products.length}</span>
          ) : null}
        </button>

        {this.state.open && (
          <div className={styles.backdrop} onClick={this.handleClickBackdrop}>
            <div className={styles.modal}>
              <p className={styles.title}>
                <span className={styles.title__name}>My Bag</span>,{" "}
                {products.length} items
              </p>

              {products.map((product) => {
                return (
                  <ItemPreview
                    products={product}
                    key={product.id}
                    currency={this.props.currency}
                  />
                );
              })}
              <div className={styles.total}>
                <span className={styles.total__text}>Total</span>
                <span className={styles.total__price}>
                  {products[0].prices[this.props.currency].currency.symbol}
                  {this.Total().toFixed(2)}
                </span>
              </div>

              <div className={styles.buttons}>
                <Link
                  to={routes.cart}
                  className={`${styles.buttons__link} ${styles.buttons__view}`}
                  onClick={this.handleCartClick}
                >
                  View bag
                </Link>

                <Link
                  to={routes.checkout}
                  className={`${styles.buttons__link} ${styles.buttons__check}`}
                  onClick={this.handleCartClick}
                >
                  Check out
                </Link>
              </div>

              <button
                type="button"
                className={styles.close}
                onClick={this.handleCartClick}
              >
                <ArrowImage />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: getProducts(state),
});

export default connect(mapStateToProps, null)(CartPreview);
