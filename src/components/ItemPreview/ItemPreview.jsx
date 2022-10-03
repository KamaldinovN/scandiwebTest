import styles from "./ItemPreview.module.css";
import { Component } from "react";
import Attributes from "../AttributesComponents/Main";
import {
  deleteItem,
  quantityAdd,
  quantityDel,
} from "../../redux/cart/cart_reducer";
import { connect } from "react-redux";

class ItemPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.products,
    };
  }

  increment = (e) => {
    this.props.addQuantity(e.target.id);
  };

  decrement = (e) => {
    this.props.delQuantity(e.target.id);
    if (this.props.products.quantity <= 1) {
      window.confirm(`Do you wont delete from cart ${e.target.id} ?`)
        ? this.props.dispatchFromCart(e.target.id)
        : this.props.addQuantity(e.target.id);
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
              id={this.state.product.uniqueID}
            >
              +
            </button>
            <span className={styles.counters__count}>
              {this.props.products.quantity}
            </span>
            <button
              type="button"
              id={this.state.product.uniqueID}
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
  addQuantity: (id) => dispatch(quantityAdd(id)),
  delQuantity: (id) => dispatch(quantityDel(id)),
});

export default connect(null, mapDispatchToProps)(ItemPreview);
