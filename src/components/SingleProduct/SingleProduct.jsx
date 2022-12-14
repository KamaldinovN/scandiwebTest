import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import parse from "html-react-parser";

import styles from "./SingleProduct.module.css";
import { addProduct } from "../../redux/cart/cart_reducer";
import Attributes from "../AttributesComponents/Main";

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cover: "",
    };
  }
  componentDidMount() {
    this.setState({ cover: this.props.product.gallery[0] });
  }

  addToCart = (product) => {
    let objCopy = JSON.parse(JSON.stringify(product));
    objCopy.quantity = 1;
    objCopy.uniqueID = Date.now();
    let activeAttr = JSON.parse(sessionStorage.getItem("activeAttribute"));
    //eslint-disable-next-line
    objCopy.attributes.map((item) => {
      if (item.id === "Size") {
        item.items.map((elem) => (elem.isActive = false));
        if (activeAttr !== null && activeAttr.size) {
          item.items[activeAttr.size].isActive = true;
        } else {
          item.items[0].isActive = true;
        }
      }
      if (item.id === "Color") {
        item.items.map((elem) => (elem.isActive = false));
        if (activeAttr !== null && activeAttr.color) {
          item.items[activeAttr.color].isActive = true;
        } else {
          item.items[0].isActive = true;
        }
      }
      if (item.id === "Capacity") {
        item.items.map((elem) => (elem.isActive = false));
        if (activeAttr !== null && activeAttr.capacity) {
          item.items[activeAttr.capacity].isActive = true;
        } else {
          item.items[0].isActive = true;
        }
      }
      if (item.id === "With USB 3 ports") {
        item.items.map((elem) => (elem.isActive = false));
        if (activeAttr !== null && activeAttr.ports) {
          item.items[activeAttr.ports].isActive = true;
        } else {
          item.items[0].isActive = true;
        }
      }
      if (item.id === "Touch ID in keyboard") {
        item.items.map((elem) => (elem.isActive = false));
        if (activeAttr !== null && activeAttr.touchId) {
          item.items[activeAttr.touchId].isActive = true;
        } else {
          item.items[0].isActive = true;
        }
      }
    });
    sessionStorage.removeItem("activeAttribute");
    this.props.dispatchToCart(objCopy);
  };
  handleCover = (event) => {
    this.setState({ cover: event.target.src });
  };

  render() {
    const product = this.props.product;
    console.log(product);
    return (
      <article className={styles.product}>
        <div className={styles.gallery}>
          <div className={styles.gallery__thumbs}>
            {product.gallery.map((image) => {
              return (
                <img
                  src={image}
                  key={image}
                  className={styles.gallery__thumb}
                  alt={product.name}
                  title={product.name}
                  width="79"
                  height="80"
                  loading="lazy"
                  onClick={this.handleCover}
                />
              );
            })}
          </div>

          <div className={styles.cover}>
            <img
              src={this.state.cover}
              className={styles.cover__image}
              alt={product.name}
              title={product.name}
              width="610"
              height="511"
              loading="lazy"
            />
          </div>
        </div>

        <aside className={styles.sidebar}>
          <h1 className={styles.title}>{product.name}</h1>
          <h2 className={styles.brand}>{product.brand}</h2>

          {this.props.product.attributes.length ? (
            <Attributes attributes={this.props.product.attributes} />
          ) : null}

          <p className={styles.subtitle}>
            {product.inStock ? "price" : "last price"}:
          </p>

          <p className={styles.price}>
            {product.prices[this.props.currency].currency.symbol}
            {product.prices[this.props.currency].amount}
          </p>

          <button
            type="button"
            className={styles.add}
            onClick={() => {
              this.addToCart(product);
            }}
            disabled={!product.inStock}
          >
            {product.inStock ? "add to cart" : "Out of stock"}
          </button>

          <div className={styles.description}>{parse(product.description)}</div>
        </aside>
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchToCart: (product) => dispatch(addProduct(product)),
});

export default connect(null, mapDispatchToProps)(withRouter(SingleProduct));
