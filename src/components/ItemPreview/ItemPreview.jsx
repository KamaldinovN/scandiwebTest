import styles from "./ItemPreview.module.css";
import { Component } from "react";
import Attributes from "../AttributesComponents/Main";
import { deleteItem } from "../../redux/cart/cart_reducer";
import { connect } from "react-redux";

class ItemPreview extends Component {
  state = {
    quantity: 1,
    product: this.props.products,
  };

  increment = () => {
    this.setState((state) => {
      return {
        quantity: (state.quantity += 1),
      };
    });
  };

  decrement = (e) => {
    this.setState((state) => {
      if (state.quantity > 1) {
        return {
          quantity: (state.quantity -= 1),
        };
      }
    });
    if (this.state.quantity <= 1) {
      window.confirm(`Do you wont delete from cart ${e.target.id} ?`)
        ? this.props.dispatchFromCart(e.target.id)
        : console.log("+");
    }
  };
  render() {
    return (
      <>
        <div className={styles.product__wrapper} key={this.state.product.id}>
          <div className={styles.product__content}>
            <p className={styles.product__name}>{this.state.product.name}</p>
            <p className={styles.product__price}>
              {this.state.product.prices[this.props.currency].currency.symbol}
              {this.state.product.prices[this.props.currency].amount}
            </p>
            {this.state.product.attributes ? (
              <Attributes attributes={this.state.product.attributes} />
            ) : null}

            <div></div>
          </div>

          <div className={styles.counters}>
            <button
              type="button"
              className={`${styles.square__button} ${styles.counters__up}`}
              onClick={this.increment}
            >
              +
            </button>
            <span className={styles.counters__count}>
              {this.state.quantity}
            </span>
            <button
              type="button"
              id={this.state.product.id}
              className={`${styles.square__button} ${styles.counters__down}`}
              onClick={this.decrement}
            >
              -
            </button>
          </div>
          <div className={styles.product__thumb}>
            <img
              src={this.state.product.gallery[0]}
              className={styles.product__image}
              alt=""
              width="105"
              height="137"
            />
          </div>
        </div>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchFromCart: (id) => dispatch(deleteItem(id)),
});

export default connect(null, mapDispatchToProps)(ItemPreview);
