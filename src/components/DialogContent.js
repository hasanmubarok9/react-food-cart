import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import { addToCart } from '../redux/actions'

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

function ModalContent ({ productDetail, addToCart }) {
  const handleClick = (id) => {
    addToCart(id)
  }

  return (
    <DialogContent dividers>
      <img src={productDetail.img} alt={productDetail.title} height="500" width="100%"/>
      <div>{productDetail.title}</div>
      <div>{productDetail.price}</div>
      <div>{productDetail.description}</div>
      <div>{productDetail.category}</div>
      <Button variant="contained" color="primary" onClick={() => { handleClick(productDetail.id) }}>
        Add to Cart
      </Button>
    </DialogContent>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => { dispatch(addToCart(id)) }
  }
}

ModalContent.propTypes = {
  productDetail: PropTypes.object,
  addToCart: PropTypes.func
}

export default connect(null, mapDispatchToProps)(ModalContent)
