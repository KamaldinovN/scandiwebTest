import styles from "./ItemCart.module.css";
import { Component } from "react";

import { ReactComponent as ArrowNext } from "../../images/arrow2.svg";
import { ReactComponent as ArrowPrev } from "../../images/arrow1.svg";
import { connect } from "react-redux";
import { deleteItem } from "../../redux/cart/cart_reducer";

class ItemCart extends Component {
  constructor(props) {
    super(props);
    this.setNextPhoto = this.setNextPhoto.bind(this);
    this.setPrevPhoto = this.setPrevPhoto.bind(this);
    this.state = {
      product: this.props.product,
      quantity: 1,
      photoId: 0,
    };
  }

  handleAttributes = () => {
    alert("Selected");
  };
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
    const product = this.state.product;
    return (
      <div className={styles.item} key={product.id}>
        <div className={styles.product}>
          <p className={styles.product__name}>{product.name}</p>
          <p className={styles.product__brand}>{product.brand}</p>
          <p className={styles.product__price}>
            {product.prices[this.props.currency].currency.symbol}
            {product.prices[this.props.currency].amount}
          </p>

          {product.attributes
            ? product.attributes.map((attributes) => {
                return (
                  <div key={attributes.id}>
                    <p className={styles.subtitle} key={attributes.id}>
                      {attributes.name}:
                    </p>

                    <div className={styles.attributes}>
                      {attributes.items.map((item) => {
                        return (
                          <button
                            type="button"
                            className={styles.radio}
                            key={item.id}
                            onClick={this.handleAttributes}
                            style={{ backgroundColor: `${item.value}` }}
                            title={item.displayValue}
                          >
                            {attributes.id === "Color" ? "" : item.displayValue}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            : null}
        </div>

        <div className={styles.wrapper}>
          <div className={styles.counters}>
            <button
              type="button"
              className={styles.counters__button}
              onClick={this.increment}
            >
              +
            </button>
            <span className={styles.counters__value}>
              {this.state.quantity}
            </span>
            <button
              id={this.props.product.id}
              type="button"
              className={styles.counters__button}
              onClick={this.decrement}
            >
              -
            </button>
          </div>

          <div className={styles.gallery}>
            {product.gallery.length > 1 ? (
              <>
                {" "}
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
              src={product.gallery[this.state.photoId]}
              className={styles.gallery__image}
              alt={product.name}
              title={product.name}
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
});

export default connect(null, mapDispatchToProps)(ItemCart);
