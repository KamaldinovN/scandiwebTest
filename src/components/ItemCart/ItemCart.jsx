import styles from "./ItemCart.module.css";
import { Component } from "react";

import { ReactComponent as ArrowNext } from "../../images/arrow2.svg";
import { ReactComponent as ArrowPrev } from "../../images/arrow1.svg";
import Attributes from "../AttributesComponents/Main/attributes";
import { connect } from "react-redux";
import {
  deleteItem,
  quantityAdd,
  quantityDel,
} from "../../redux/cart/cart_reducer";

class ItemCart extends Component {
  constructor(props) {
    super(props);
    this.setNextPhoto = this.setNextPhoto.bind(this);
    this.setPrevPhoto = this.setPrevPhoto.bind(this);
    this.state = {
      product: this.props.product,
      photoId: 0,
    };
  }

  setNextPhoto() {
    this.setState({
      photoId: this.state.photoId + 1,
    });
    if (this.state.photoId >= this.props.product.gallery.length - 1) {
      this.setState({
        photoId: 0,
      });
    }
  }
  setPrevPhoto() {
    this.setState({ photoId: this.state.photoId - 1 });
    if (this.state.photoId <= 0) {
      this.setState({
        photoId: this.props.product.gallery.length - 1,
      });
    }
  }

  increment = (e) => {
    this.props.addQuantity(e.target.id);
  };

  decrement = (e) => {
    this.props.delQuantity(e.target.id);
    if (this.props.product.quantity <= 1) {
      window.confirm(`Do you wont delete from cart ${e.target.title} ?`)
        ? this.props.dispatchFromCart(e.target.id)
        : this.props.addQuantity(e.target.id);
    }
  };
  render() {
    return (
      <div className={styles.item} key={this.state.product.id}>
        <div className={styles.product}>
          <p className={styles.product__name}>{this.state.product.name}</p>
          <p className={styles.product__brand}>{this.state.product.brand}</p>
          <p className={styles.product__price}>
            {this.state.product.prices[this.props.currency].currency.symbol}
            {this.state.product.prices[this.props.currency].amount}
          </p>

          {this.state.product.attributes ? (
            <Attributes
              attributes={this.state.product.attributes}
              uniqueID={this.state.product.uniqueID}
            />
          ) : null}
        </div>

        <div className={styles.wrapper}>
          <div className={styles.counters}>
            <button
              type="button"
              title={this.state.product.id}
              id={this.state.product.uniqueID}
              className={styles.counters__button}
              onClick={this.increment}
            >
              +
            </button>
            <span className={styles.counters__value}>
              {this.props.product.quantity}
            </span>
            <button
              title={this.state.product.id}
              id={this.state.product.uniqueID}
              type="button"
              className={styles.counters__button}
              onClick={this.decrement}
            >
              -
            </button>
          </div>
          <div className={styles.gallery}>
            {this.state.product.gallery.length > 1 ? (
              <>
                <ArrowPrev
                  className={styles.gallery__prev}
                  onClick={this.setPrevPhoto}
                ></ArrowPrev>
                <ArrowNext
                  className={styles.gallery__next}
                  onClick={this.setNextPhoto}
                />
              </>
            ) : null}
            <img
              src={this.state.product.gallery[this.state.photoId]}
              className={styles.gallery__image}
              alt={this.state.product.name}
              title={this.state.product.name}
              width="141"
              height="185"
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchFromCart: (id) => dispatch(deleteItem(id)),
  addQuantity: (id) => dispatch(quantityAdd(id)),
  delQuantity: (id) => dispatch(quantityDel(id)),
});

export default connect(null, mapDispatchToProps)(ItemCart);
