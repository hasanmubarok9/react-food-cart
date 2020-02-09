// import image1 from '../../static/plate-of-rice-and-cooked-meat-1624487.jpg'
// import image2 from '../../static/art-beverage-blur-caffeine-302896.jpg'
// import image3 from '../../static/art-blur-cappuccino-close-up-302899.jpg'
// import image4 from '../../static/baked-cookies-and-glass-of-milk-1325467.jpg'
// import image5 from '../../static/bamboo-bamboo-whisk-board-bowls-461428.jpg'
// import image6 from '../../static/blur-calcium-close-up-dairy-236010.jpg'
// import image7 from '../../static/caffeine-close-up-coffee-coffee-cup-539432.jpg'
// import image8 from '../../static/chocolate-with-milted-chocolate-on-white-ceramic-plate-45202.jpg'
// import image9 from '../../static/clear-glass-bowl-beside-yellow-flower-1638280.jpg'
// import image10 from '../../static/close-up-of-coffee-cup-on-table-312418.jpg'
// import image11 from '../../static/close-up-of-meal-served-in-plate-323682.jpg'
// import image12 from '../../static/close-up-photo-of-a-cheese-burger-1633578.jpg'
import tileData from './tileData'
import { ADD_TO_CART } from '../actionTypes'

const initialState = {
  allProducts: tileData,
  addedItems: []
}

export default function (state = initialState, action) {
  if (action.type === ADD_TO_CART) {
    // memfilter id dari product untuk selanjutnya ditambahkan ke dalam addedItem
    const { id } = action.payload
    const addedItem = state.allProducts.find(product => product.id === id)

    // check if the action id exists in the addedItems
    const existedItem = state.addedItems.find(item => item.id === id)
    if (existedItem) {
      addedItem.quantity += 1
      return {
        ...state,
        total: state.total + addedItem.price
      }
    } else {
      addedItem.quantity = 1
      // calculating the total
      const newTotal = state.total + addedItem.price

      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal
      }
    }
  }
  return state
}
