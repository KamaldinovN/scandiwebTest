import { gql } from "@apollo/client";

export const LOAD_CATEGORY = gql`
  query load_category($category: String!) {
    category(input: { title: $category }) {
      name
      products {
        id
        name
        inStock
        gallery
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

export const LOAD_PRODUCT = gql`
  query GET_PRODUCT($productId: String!) {
    product(id: $productId) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export const LOAD_CURRENCIES = gql`
  query GET_CURRENCIES {
    currencies {
      label
      symbol
    }
  }
`;

export const LOAD_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;
