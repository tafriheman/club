import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  productProductListFetchProdcuts,
  productProductEditSetForm,
} from '../../redux/actions'
import {
  Card,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core'
import compose from 'recompose/compose'
import config from '../../config.json'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import MoreIcon from '@material-ui/icons/MoreHoriz'
import EditIcon from '@material-ui/icons/Edit'
import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.css'

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      anchorEl: null,
      isClubRoute: true,
      clubId: null,
    }
  }

  // const updateProductList = () => (
  //
  // )

  updateProductList = () => {
    const {
      token,
      club,
      productProductListFetchProdcuts,
      pageSize,
      location
    } = this.props

    const isClubRoute = location.pathname.startsWith('/clubs')
    // TODO: when backend is ready uncomment this part
    // sample club._id 5c72ec77e5240424fc3c74e9
    // const clubId = isClubRoute ? this.props.match.params.clubId : club._id
    const clubId = club._id

    console.log(location.pathname)
    if (this.state.isClubRoute !== isClubRoute || this.state.clubId !== clubId) {
      console.log(`is club route: ${isClubRoute}`)
      productProductListFetchProdcuts(clubId, token, 1, pageSize, () => {
        this.setState({
          products: this.props.products,
          isClubRoute,
          clubId,
        })
      })
    }
  }

  componentDidMount() {
    this.updateProductList()
  }

  componentDidUpdate(prevProps) {
    this.updateProductList()
  }

  handlePrintClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }
  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {anchorEl, isClubRoute} = this.state
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {/* <div
          style={{
            width: "24%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <IconButton style={{ padding: 0 }}>
            <AddCircleIcon style={{ fontSize: 100 }} />
          </IconButton>
          <Typography>ثبت امتیاز </Typography>
        </div> */}

        {this.state.products.map(item => {
          return (
            <Card style={{width: '24%'}}>
              <div style={{height: 150}}>
                <Carousel showThumbs={false} showStatus={false}>
                  {item.images.map(img => {
                    return (
                      <div style={{height: 150}}>
                        <img style={{height: 150}} src={img}/>
                      </div>
                    )
                  })}
                </Carousel>
              </div>

              <div
                style={{
                  height: 70,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{display: 'flex', justifyContent: 'space-between'}}
                >
                  <Typography
                    style={{
                      padding: 5,
                    }}
                  >
                    {item.name}
                  </Typography>
                  {
                    !isClubRoute
                    &&
                    <div>
                      <IconButton
                        style={{padding: 0}}
                        aria-owns={anchorEl ? 'simple-menu' : null}
                        onClick={this.handlePrintClick}
                      >
                        <MoreIcon/>
                      </IconButton>

                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                        style={{
                          marginTop: 50,
                          marginLeft: 30,
                          direction: 'rtl',
                        }}
                      >
                        <MenuItem onClick={this.handleClose}>
                          <Button
                            style={{fontSize: 16, padding: 0}}
                            onClick={() =>
                              this.props.productProductEditSetForm(
                                {
                                  _id: item._id,
                                  name: item.name,
                                  description: item.description,
                                  images: item.images,
                                  links: item.links,
                                  price: item.price,
                                  point: item.point,
                                  category: item.category,
                                  type: item.type,
                                },
                                this.props.history,
                              )
                            }
                          >
                            ویرایش
                            <EditIcon style={{fontSize: 20}}/>
                          </Button>
                        </MenuItem>
                        <MenuItem onClick={this.handleClose}>
                          <Typography style={{marginRight: 5}}>اپشن</Typography>
                        </MenuItem>
                        <MenuItem onClick={this.handleClose}>
                          <Typography style={{marginRight: 5}}>اپشن</Typography>
                        </MenuItem>
                        <MenuItem onClick={this.handleClose}>
                          <Typography style={{marginRight: 5}}>اپشن</Typography>
                        </MenuItem>
                      </Menu>
                    </div>
                  }
                </div>
                <div
                  style={{display: 'flex', justifyContent: 'space-between'}}
                >
                  <div>
                    <Typography
                      style={{
                        padding: 5,
                      }}
                    >
                      اعتبار هدیه : {item.point} امتیاز
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      style={{
                        padding: 5,
                      }}
                    >
                      {item.price} تومان
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    )
  }
}

const
  mapStateToProps = ({app, productProductList}) => {
    return {...app, ...productProductList}
  }

export default compose(
  connect

  (
    mapStateToProps
    , {
      productProductListFetchProdcuts
      ,
      productProductEditSetForm
      ,
    }

    ,
  ),
)
(ProductList)
