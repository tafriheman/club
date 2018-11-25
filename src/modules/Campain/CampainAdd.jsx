import React, {Component} from 'react';
import {
    Grid,
    Typography,
    Card,
    CardContent,
    withStyles,
    TextField,
    Radio,
    FormLabel,
    Button,
    CardActions
} from '@material-ui/core';
import compose from 'recompose/compose';
import {connect} from 'react-redux';
import styles from './styles/CampainAdd';
import {DatePicker} from 'react-advance-jalaali-datepicker';
import DropZone from 'react-dropzone';
import config from '../../config.json';

class CampainAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {giftType: 'coupon'};
    }

    hasPermission(permission) {
        if (this.props.club.permissions.indexOf(permission) === -1)
            return false;
        return true;
    }

    DatePickerInput(props) {
        return <input className={this.props.classes.datePicker} {...props} ></input>;
    }

    submitForm() {

    }

    render() {
        const {
            classes,
            history
        } = this.props;

        return (
            <Grid container direction="column" alignItems="center">
                <Typography variant="h4" className={classes.header}>افزودن کمپین</Typography>
                <Grid item container style={{marginTop: '20px'}} direction="column">
                    <Card>
                        <CardContent>
                            <Grid item container direction="row" alignItems="baseline" spacing={32} justify="right">
                                <Typography variant="title">یک هدیه انتخاب کنید تا مشتریان به ثبت نام در فروشگاه شما
                                    ترغیب شوند</Typography>
                                <Grid item container xs={12} sm={6} md={6} direction="row" alignItems="center">
                                    <FormLabel component="legend" style={{marginRight: '20px'}}>هدیه از
                                        محصولات</FormLabel>
                                    <Radio
                                        checked={this.state.giftType === 'product'}
                                        onChange={ () => this.setState({giftType: 'product'})}
                                        value="product"
                                    />
                                    <FormLabel component="legend"> تخفیف</FormLabel>
                                    <Radio
                                        value="coupon"
                                        checked={ this.state.giftType === 'coupon' }
                                        onChange={ () => this.setState({giftType: 'coupon'}) }
                                    />
                                </Grid>
                                {
                                    this.state.giftType === 'coupon' ?
                                        <Grid item container xs={12} sm={12} md={12}>
                                            <Typography variant="title">چند درصد تخفیف به مشتری میدهید؟</Typography>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                margin="dense"
                                                // value={price}
                                                // onChange={e => productProductAddChangeProp('price', e.target.value )}
                                            />
                                        </Grid> : ''
                                }
                                {
                                    this.state.giftType === 'product' && !this.hasPermission(config.product.list) ?
                                        <Grid item container xs={12} sm={12} md={12}>
                                            <Typography variant="title">نام محصول</Typography>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                margin="dense"

                                                // value={price}
                                                // onChange={e => productProductAddChangeProp('price', e.target.value )}
                                            />
                                        </Grid> : ''
                                }
                                {
                                    this.state.giftType === 'product' && this.hasPermission(config.product.list) ?
                                        <Grid item container xs={12} sm={12} md={12} direction="row"
                                              alignItems="center">
                                            <Typography variant="title">یک هدیه از بین محصولات خود انتخاب
                                                کنید</Typography>
                                            <Button
                                                variant="contained"
                                                style={{marginRight: '10px'}}
                                            > انتخاب
                                            </Button>
                                        </Grid> : ''
                                }

                            </Grid>
                            <Grid item container direction="row" alignItems="baseline" spacing={32} justify="right">
                                {/*<Grid item container xs={12} sm={4} md={4} direction="row">*/}
                                {/*<Typography variant="title">نام</Typography>*/}
                                {/*<TextField*/}
                                {/*fullWidth*/}
                                {/*variant="outlined"*/}
                                {/*margin="dense"*/}
                                {/*// value={name}*/}
                                {/*// onChange={e => productProductAddChangeProp('name', e.target.value)}*/}
                                {/*/>*/}
                                {/*</Grid>*/}
                                <Grid item container xs={12} sm={4} md={4}>
                                    <Typography variant="title">امتیاز مورد نیاز(هر مشتری جدید 1 امتیاز)</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                        // value={price}
                                        // onChange={e => productProductAddChangeProp('price', e.target.value )}
                                    />
                                </Grid>
                                {/*</Grid>*/}
                                {/*<Grid item container direction="row" alignItems="baseline" spacing={32} justify="right">*/}
                                {/*<Grid item container xs={12} sm={4} md={4} direction="row">*/}
                                {/*<Typography variant="title">چه تعداد امتیاز به مشتری دعوت کننده می دهید</Typography>*/}
                                {/*<TextField*/}
                                {/*fullWidth*/}
                                {/*variant="outlined"*/}
                                {/*margin="dense"*/}
                                {/*// value={name}*/}
                                {/*// onChange={e => productProductAddChangeProp('name', e.target.value)}*/}
                                {/*/>*/}
                                {/*</Grid>*/}
                                {/*<Grid item container xs={12} sm={4} md={4}>*/}
                                {/*<Typography variant="title">چه تعداد امتیاز به کاربری که ثبت نام می کند می*/}
                                {/*دهید</Typography>*/}
                                {/*<TextField*/}
                                {/*fullWidth*/}
                                {/*variant="outlined"*/}
                                {/*margin="dense"*/}
                                {/*// value={price}*/}
                                {/*// onChange={e => productProductAddChangeProp('price', e.target.value )}*/}
                                {/*/>*/}
                                {/*</Grid>*/}
                            </Grid>

                            <Grid item container direction="row" alignItems="baseline" spacing={32} justify="right">
                                <Grid item container xs={12} sm={6} md={6} direction="row" alignItems="baseline">
                                    <Typography variant="title" style={{marginBottom: '20px', width: '50%'}}>تاریخ
                                        شروع</Typography>
                                    <DatePicker
                                        placeholder="انتخاب تاریخ"
                                        format="jYYYY/jMM/jDD"
                                        inputComponent={this.DatePickerInput.bind(this)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container direction="row" alignItems="baseline" spacing={32} justify="right">

                                <Grid item container xs={12} sm={6} md={6} direction="row" alignItems="baseline">
                                    <Typography variant="title" style={{marginBottom: '20px', width: '50%'}}>تاریخ
                                        پایان</Typography>
                                    <DatePicker
                                        placeholder="انتخاب تاریخ"
                                        format="jYYYY/jMM/jDD"
                                        inputComponent={this.DatePickerInput.bind(this)}
                                    />
                                </Grid>

                            </Grid>
                            <Grid item container xs={12} sm={6} md={6} direction="row" justify="left">
                                <Typography variant="title" style={{width: '100%'}}>عکس ها</Typography>
                                <DropZone
                                    multiple
                                    // onDrop={this.onImagesDrop.bind(this)}
                                    accept="image/jpeg, image/png"
                                >
                                    <div className={classes.uploadMessageContainer}>
                                        <p>عکس ها را اینجا بکشید</p>
                                        <p>یا کلیک کنید</p>
                                    </div>
                                </DropZone>
                            </Grid>

                        </CardContent>
                        <CardActions>
                            <Grid container direction="row-reverse">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.submitForm.bind(this)}
                                >
                                    افزودن
                                </Button>
                                <Button
                                    style={{marginLeft: '10px'}}
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => history.goBack()}
                                >
                                    انصراف
                                </Button>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({app}) => {
    return {...app};
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(CampainAdd);