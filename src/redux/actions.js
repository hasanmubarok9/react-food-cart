import { ADD_TO_CART } from './actionTypes'

export const addToCart = (id) => ({
  type: ADD_TO_CART,
  payload: {
    id
  }
})
