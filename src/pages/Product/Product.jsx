import { Component } from "react";
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";

import SingleProduct from "../../components/SingleProduct";
import Loader from "../../components/Loader";

import styles from "./Product.module.css";
import { LOAD_PRODUCT } from "../../GraphQl";

class Product extends Component {
  componentDidMount() {
    document.title = "Product | Nazar Kamaldinov test";
  }

  render() {
    const { data } = this.props;
    const { loading, error } = data;
    let copyObj = {};
    if (data.loading) {
      return <Loader />;
    } else {
      copyObj = JSON.parse(JSON.stringify(data.product));
      // eslint-disable-next-line
      copyObj.attributes.map((item) => {
        if (item.id === "Size") {
          item.items[0].isActive = true;
        }
        if (item.id === "Color") {
          item.items[0].isActive = true;
        }
        if (item.id === "Capacity") {
          item.items[0].isActive = true;
        }
        if (item.id === "With USB 3 ports") {
          item.items[0].isActive = true;
        }
        if (item.id === "Touch ID in keyboard") {
          item.items[0].isActive = true;
        }
      });
    }
    return (
      <main className={styles.main}>
        {data.product && (
          <SingleProduct product={copyObj} currency={this.props.currency} />
        )}

        {error && <p>{JSON.stringify(data?.error?.message)}</p>}

        {loading && <Loader />}
      </main>
    );
  }
}

export default withRouter(
  graphql(LOAD_PRODUCT, {
    options: (props) => ({
      variables: {
        productId: props.match.params.productId,
      },
    }),
  })(Product)
);
