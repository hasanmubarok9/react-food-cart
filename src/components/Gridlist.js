import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
// import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import { Tooltip } from '@material-ui/core'

// Session fron import Dialog
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

// Import Component
import DialogContent from './DialogContent'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 1200,
    height: '100%'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
}))

// style for dialog content
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions)

function TitlebarGridList ({ allProducts }) {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  const [productDetail, setProductDetail] = React.useState(
    {
      title: '',
      price: '',
      category: '',
      description: ''
    }
  )

  const handleClickOpen = (data) => {
    setProductDetail(data)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} cols={4} className={classes.gridList}>
        {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile> */}
        {allProducts.map(tile => (
          <GridListTile key={tile.id} onClick={() => handleClickOpen(tile)}>
            <img src={tile.img} alt={tile.name}/>
            <GridListTileBar
              title={tile.name}
              subtitle={<span>{tile.price}</span>}
              actionIcon={
                <Tooltip title="Makanan dan Minuman">
                  <IconButton aria-label={`info about ${tile.name}`} className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Modal title
        </DialogTitle>
        <DialogContent productDetail={productDetail}/>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
              Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = state => {
  const { cart } = state
  return {
    allProducts: cart.allProducts
  }
}

TitlebarGridList.propTypes = {
  allProducts: PropTypes.array
}

export default connect(mapStateToProps)(TitlebarGridList)
