import { gql } from "@apollo/client";


export const LOAD_ALL = gql`
    query {
      categories {
        name
        products {
          id
          name
          inStock
          gallery
          category
          prices {
            currency{
            label
            symbol
          }
            amount
          }
          brand
        }
      }
    }
  `

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
            currency{
            label
            symbol
          }
            amount
          }
          brand
        }
      }
    `

export const LOAD_CURRENCIES = gql`
    query GET_CURRENCIES {
      currencies{
            label
            symbol
          }
    }
  `