import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import PropTypes from 'prop-types';


import { productProductListFetchProdcuts } from "../../redux/actions/product/ProductListActions";

import { sendMessage, verifyMessage } from "../../redux/actions";
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";

import Label from "@material-ui/icons/Label";
import Title from "@material-ui/icons/Title";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

import { getLabel } from "../../redux/actions/label/labelAction";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Card,
    Chip,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Fab ,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    DialogActions,
    Button,
    Checkbox 
} from "@material-ui/core";
import config from '../../config.json';
import SnackBar from "../../components/SnackBar";
import DoneIcon from "@material-ui/icons/Done";

import Modal from "../../components/modal";
import "../../assets/css/global/index.css";
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterSection:false,
            filter:'',
            openProduct:false,
            products:[],
            selectedProducts:[],
            openLabel:false,
            labels:[],
            selectedLabels:[],
            message:'',
            showSnackBar: false,
            typeSnackBar: "",
            messageSnackBar: "",
            errorMessage:'',
            messageId:0,
            openVerify:false,
            userLenght:0
        }
        this.sendMessage = this.sendMessage.bind(this);
    }
    componentDidMount(){
    
 
        const {
            token,
            club,
            pageSize,
            getLabel,
            clubId,
            productProductListFetchProdcuts
        } = this.props;
        productProductListFetchProdcuts(clubId, 1, pageSize, (products) => {
         
            this.setState({ products: this.props.products });
        });
        getLabel(club._id, token)
      

    }
    handleChangeFilter = event => {
        this.setState({ filter: event.target.value });
    }
    translateType(type) {
        if (type === 'downloadable') return 'دانلودی';
        if (type === 'physical') return 'غیر دانلودی'
    }
    sendMessage(){
        let message = {
            "message": this.state.message,
            "label": this.state.selectedLabels,
            "product": this.state.selectedProducts
        }
        if (message.message===''){
            this.setState({
                errorMessage: 'لطفا متن پیام را وارد نمایید'
            })
            return
        }
        const { sendMessage,token,club}=this.props;
        sendMessage(message, club._id, token).then((response)=>{
            if (response.status===201){
              this.setState({
                  openVerify:true,
                  messageId: response.data._id,
                  userLenght: response.data.message_count
              })
            }
           
        })

    }
    handleSnackBarClose = () => {
        this.setState({ showSnackBar: false });
    };
    onClickVerify = () => {
        const { verifyMessage, token, club } = this.props;
        verifyMessage(this.state.messageId, club._id,token).then((response)=>{
            this.setState({
                showSnackBar: true,
                typeSnackBar: "success",
                messageSnackBar: "با موفقیت ارسال شد",
                openVerify:false,
                selectedLabels:[],
                selectedProducts:[],
                message:'',
                userLenght:0,
                labels:[]
            })
        })
    }
    render() {
        return (
            <div className="sectin__container" style={{ display: "flex" }}>
                <Dialog
                    open={this.state.openVerify}
                    onClose={() => {
                        this.setState({
                            openVerify: false,
                        })
                    }}
                >
                    <DialogContent>
                        پیام شما ثبت شد برای ارسال بر روی ادامه کلیک کنید
                      </DialogContent>

                    <DialogContent>
                      {`تعداد دریافت کنندگان پیام ${this.state.userLenght}`}
                      </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClickVerify} variant="contained"
                            color="primary">
                            ادامه
                        </Button>
                    </DialogActions>

                </Dialog>
                <SnackBar
                    show={this.state.showSnackBar}
                    type={this.state.typeSnackBar}
                    message={this.state.messageSnackBar}
                    onClose={this.handleSnackBarClose}
                    autoHideDuration={5000}
                />
                <Modal
                    onOpen={this.state.openLabel}
                    onClose={() => {

                        this.setState({
                            openLabel: false
                        })
                    }}
                    title="انتخاب برچسب"
                    action={true}
                    disableConfirmButton={true}
                    size="md"
                >
                    <Grid container spacing={16}>
                        <Grid item xs={12} lg={6} md={6} spacing={16}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: 10
                                }}
                            >

                                <div style={{ flex: 1, paddingRight: 20 }}>
                                   
                                </div>
                            </div>
                            {this.state.labels.map(element => {
                                return (
                                    <div>
                                        <Chip
                                            label={element.title}
                                            onDelete={() => {
                                             let labels=this.state.labels;
                                             let i=0;
                                                for (let j = 0; j < labels.length;j++){
                                                    if (labels[j]._id === element._id){
                                                        i=j;
                                                    }
                                                }
                                                const filteredItems = labels.slice(0, i).concat(labels.slice(i + 1, labels.length))
                                                this.setState({
                                                    labels: filteredItems
                                                })

                                            }}
                                            style={{
                                                margin: 5,
                                                height: "auto",
                                                flexWrap: "wrap",
                                                backgroundColor:
                                                    element.color,

                                                display: "flex",
                                                color: element.color
                                                    ? "#000"
                                                    : "#fff",
                                                justifyContent:
                                                    "space-between"
                                            }}
                                            classes={{
                                                deleteIcon: "chipIcon",
                                                label: "chipLabel"
                                            }}
                                        />
                                    </div>

                                )
                            })}
                        </Grid>
                        <Grid item xs={12} lg={6} md={6} spacing={16}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: 10
                                }}
                            >

                                <div style={{ flex: 1, paddingRight: 20 }}>
                                    <Typography variant="h6" style={{ paddingTop: 15 }}>
                                        عنوان
                                 </Typography>
                                </div>

                                <div>
                                    <Typography variant="h6" style={{ paddingTop: 15 }}>
                                        انتخاب
                                 </Typography>
                                </div>
                            </div>
                            {this.props.list.data.length > 0 &&
                                this.props.list.data.map((item, index) => {

                                    return (
                                        <div
                                            id={item._id}
                                            key={index}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginTop: 10
                                            }}
                                        >

                                            <div
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                    borderRadius: "50%",
                                                    backgroundColor: item.color,
                                                    margin: 5
                                                }}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    display: "flex",
                                                    justifyContent: "flex-start"
                                                }}
                                            >
                                                <Typography style={{ paddingTop: 10 }}>
                                                    {item.title}
                                                </Typography>
                                            </div>

                                            <div>
                                                <IconButton
                                                    component="span"
                                                    onClick={() => {
                                                        let selectedLabels = this.state.selectedLabels;
                                                        let label={
                                                            label: item._id
                                                        };
                                                        let labels = this.state.labels;
                                                        labels.push(item);
                                                        
                                                        selectedLabels.push(label);
                                                        this.setState({
                                                            selectedLabels,
                                                            labels
                                                        })
                                                    }}
                                                >

                                                    <DoneIcon
                                                        style={{
                                                            marginTop: 0,
                                                            color: "#000"
                                                        }}
                                                    />
                                                </IconButton>
                                            </div>
                                        </div>
                                    )
                                })}
                        </Grid>
                    </Grid>
                </Modal> 
               
                <Dialog
                    open={this.state.openProduct}
                    onClose={()=>{
                    
                        this.setState({
                            openProduct:false
                        })
                    }}
                    maxWidth="md"
                >
                    <DialogTitle>انتخاب محصول</DialogTitle>
                    <DialogContent>
                        <Grid container direction="column" alignItems="center">
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell numeric>تصویر</TableCell>
                                        <TableCell numeric>نام</TableCell>
                                        <TableCell numeric>قیمت</TableCell>
                                        <TableCell numeric>نوع محصول</TableCell>
                                        <TableCell numeric>انتخاب</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.products.map(product => {
                                            let selectedProducts = this.state.selectedProducts;
                                            let check=false;
                                            let selected = selectedProducts.find((item) => item.product === product._id);
                                            if(selected){
                                                check=true;
                                            }
                                            return (
                                                <TableRow key={product._id}>
                                                    <TableCell component="th" scope="row" numeric>
                                                        {
                                                            product.images.length === 0 ?
                                                                <img src={require('../../assets/images/product/no-image.png')}  alt="product pic" style={{width:48,height:48}}/>
                                                                : <img src={`${config.domain}/${product.images[0]}`} alt="product pic" style={{ width: 48, height:48 }} />
                                                        }
                                                    </TableCell>
                                                    <TableCell numeric component="th" scope="row">{product.name}</TableCell>
                                                    <TableCell numeric component="th" scope="row">{product.price}</TableCell>
                                                    <TableCell numeric component="th" scope="row">{this.translateType(product.type)}</TableCell>
                                                    <TableCell numeric component="th" scope="row">
                                                        
                                                        <Checkbox 
                                                            checked={check}
                                                            onChange={e => {
                                                                let selectedProducts = this.state.selectedProducts;
                                                                if(e.target.checked){
                                                                    let product = {
                                                                        product: e.target.value
                                                                    };
                                                                    selectedProducts.push(product);
                                                                }
                                                                else{
                                                                    let i = 0;
                                                                    for (let j = 0; j < selectedProducts.length; j++) {
                                                                        if (selectedProducts[j].product === product._id) {
                                                                            i = j;
                                                                        }
                                                                    }
                                                                    selectedProducts = selectedProducts.slice(0, i).concat(selectedProducts.slice(i + 1, selectedProducts.length))
                                                        
                                                                }
                                                               
                                                                this.setState({
                                                                    selectedProducts
                                                                })

                                                            }
                                                            }
                                                            value={product._id}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                          
                        </Grid>
                    </DialogContent>
                </Dialog>
              <Grid container spacing={16}>
                <Grid item xs={12} lg={6} xl={6} md={6} sm={6}spacing={16}>
                    <Card>
                            <div className="input-container">
                                <textarea className="input-field" type="text" placeholder="چه پیشنهادی برای مشتریان خود دارید" name="usrnm" row={5} 
                                onChange={(e)=>{
                                    this.setState({
                                        message:e.target.value
                                    })
                                }} />
                               
                                <Title className="icon" onClick={()=>{
                                    this.setState({
                                        filterSection:true
                                    })
                                }}/>
                                <Send className="icon" onClick={this.sendMessage}/>
                               
                            </div>
                            <p className="_error">{this.state.errorMessage}</p>
                    </Card >
                </Grid >
                {
                        this.state.filterSection &&
                        <Grid item xs={12} lg={6} xl={6} md={6} sm={6} spacing={16}>
                            <Card className="_padding_right">
                                <Typography variant="title">مخاطبان پیشنهاد خود را انتخاب کنید </Typography>
                                <Grid item container direction="row" alignItems="center" style={{ marginBottom: '10px', marginTop: '10px' }}>
                                   
                                    <br/>
                                  
                                    <RadioGroup
                                        aria-label="filter"
                                        name="filter"
                                        value={this.state.filter}
                                        onChange={this.handleChangeFilter}
                                    >
                                        <FormControlLabel
                                            value="product"
                                            control={<Radio color="primary" />}
                                            label="محصول"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value="label"
                                            control={<Radio color="primary" />}
                                            label="برجسب"
                                            labelPlacement="end"
                                        />
                                    </RadioGroup>
                                   
                                </Grid>
                                <Grid item container direction="row" alignItems="center" style={{ marginBottom: '10px', marginTop: '10px' }}>
                                {
                                        this.state.filter === "product" && <div><Fab color="primary" onClick={()=>{
                                            this.setState({
                                                openProduct:true
                                            })
                                        }}>
                                            <ShoppingCart />
                                        </Fab>انتخاب محصول</div>
                                }
                                {
                                        this.state.filter === "label" && <div><Fab color="primary" aria-label="Add" onClick={()=>{
                                            this.setState({
                                                openLabel:true
                                            })
                                        }}>
                                            <Label />
                                        </Fab>انتخاب برچسب</div>
                                }
                                </Grid>
                        </Card >
                        </Grid >
                }
                   
            </Grid >
            </div>
        );
    }
}
Order.contextTypes = {
    router: PropTypes.object
};
const mapStateToProps = ({
    app,
    order,
    productProductList,
    label,
    checkList,
    orderStatus
}) => {
    return {
        ...app,
        ...label,
        checkList,
        orderStatus,
        orderTotal: order.orderTotal,
        pageSize: order.pageSize,
        products: productProductList.products,
        clubId:app.club._id
    };
};

export default connect(
    mapStateToProps,
    {
        getLabel,
        productProductListFetchProdcuts,
        sendMessage,
        verifyMessage
    }
)(Order);
