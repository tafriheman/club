import React, {Component} from 'react';
import {
    Grid,
    Typography,
    Card,
    CardContent,
    withStyles,
    CardActions,
    Button,
    TextField,
    FormControl,
    Select,
    MenuItem,
    FormControlLabel,
    Radio,
    RadioGroup
} from '@material-ui/core';
import compose from 'recompose/compose';
import styles from './styles/ProductAdd';
import {connect} from 'react-redux';
import {
    productProductAddChangeProp,
    prodcutProductAddFetchCategories,
    productProductAddSubmitForm
} from '../../redux/actions'
import TagsInput from 'react-tagsinput';
import DropZone from 'react-dropzone';
import InputAdornment from '@material-ui/core/InputAdornment';


import 'react-tagsinput/react-tagsinput.css'

class ProductAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            percent: ''
        }

        this.changePercent = this.changePercent.bind(this);
    }

    componentWillMount() {
        const {club, token, prodcutProductAddFetchCategories} = this.props;

        prodcutProductAddFetchCategories(club._id, token);
    }

    onImagesDrop(acceptedFiles, rejectedFiles) {
        if (acceptedFiles) {
            this.props.productProductAddChangeProp('images', [])
            acceptedFiles.forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    const image = reader.result;
                    this.props.productProductAddChangeProp('images', [...this.props.images, image])
                }
                reader.readAsDataURL(file);
            });
        }
    }

    renderImages() {
        const {images, classes} = this.props;

        return (
            <Grid item container direction="row" xs={12} sm={10} md={8}>
                <Typography variant="h6" style={{width: '100%'}}>عکس های ارسال شده</Typography>
                {
                    images.map((image, i) => {
                        return <img src={image} key={i} alt="" className={classes.image}/>
                    })
                }
            </Grid>
        )
    }

    findParent(categories, category) {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i]._id.toString() === category.parent) {
                return i;
            }
        }
        return -1
    }

    sortCategories() {
        const {categories} = this.props;
        let newCategories = [];

        let needRunAgain = true;
        while (needRunAgain) {
            needRunAgain = false;

            for (let i = 0; i < categories.length; i++) {
                let category = newCategories.find(cat => cat._id === categories[i]._id);
                if (category !== undefined) continue;

                if (!categories[i].parent) {
                    categories[i].indent = 1;
                    newCategories.push(categories[i]);
                }
                else {
                    let parentIndex = this.findParent(newCategories, categories[i]);
                    if (parentIndex === -1) {
                        needRunAgain = true;
                        continue;
                    }
                    categories[i].indent = newCategories[parentIndex].indent + 1;
                    newCategories.splice(parentIndex, 0, categories[i]);
                }
            }
        }

        return newCategories.reverse();
    }

    submitForm() {
        const {
            productProductAddSubmitForm, club, token, links, type, name,
            category,
            history,
            point,
            price,
            description,
            images
        } = this.props;

        productProductAddSubmitForm(club._id, token, {
            name, type, description, point, price, links, images, category
        }, history);
    }

    changePercent(percent, price) {
        if (percent === undefined)
            percent = this.state.percent
        else
            this.setState({percent})

        if (!price)
            price = this.props.price;

        if (!isNaN(percent) && price) {
            if (price == 0) {
                this.props.productProductAddChangeProp('point', percent);
            } else {
                let point = (percent * price) / 100000;
                this.props.productProductAddChangeProp('point', point);
            }

        } else {
            this.props.productProductAddChangeProp('point', '');
        }
    }

    render() {
        const {
            classes,
            type,
            productProductAddChangeProp,
            links,
            name,
            point,
            price,
            description,
            category,
            error,
            history
        } = this.props;

        let categories = this.sortCategories();

        return (
            <Grid container direction="column" alignItems="center">
                <Typography variant="h4" className={classes.header}>افزودن محصول</Typography>
                <Grid item container style={{marginTop: '20px'}} direction="column">
                    <Card>
                        <CardContent>
                            <Grid item container direction="row" alignItems="baseline" spacing={32} justify="center">
                                <Grid item container xs={12} sm={10} md={4} direction="row" justify="center">
                                    <Typography variant="h6" style={{width: '100%'}}>عکس ها</Typography>
                                    <DropZone
                                        multiple
                                        onDrop={this.onImagesDrop.bind(this)}
                                        accept="image/jpeg, image/png"
                                    >
                                        <div className={classes.uploadMessageContainer}>
                                            <p>عکس ها را اینجا بکشید</p>
                                            <p>یا کلیک کنید</p>
                                        </div>
                                    </DropZone>
                                </Grid>
                                {
                                    this.renderImages()
                                }
                                <Grid item container xs={12} sm={10} md={8} direction="row" spacing={16}
                                      alignItems="center">
                                    <Grid item container direction="row" xs={12} sm={12} md={6}>
                                        <Typography variant="h6">نام</Typography>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            margin="dense"
                                            value={name}
                                            onChange={e => productProductAddChangeProp('name', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item container direction="row" xs={12} sm={12} md={6}>
                                        <Typography variant="h6">قیمت</Typography>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            margin="dense"
                                            value={price}
                                            onChange={e => {
                                                productProductAddChangeProp('price', e.target.value);
                                                this.changePercent(undefined, e.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item container xs={12} sm={12} md={6} direction="column">
                                        <Typography variant="h6">امتیاز هدیه</Typography>
                                        <Grid item container direction="row" alignItems="center">
                                            <TextField
                                                variant="outlined"
                                                margin="dense"
                                                value={this.state.percent}
                                                onChange={e => this.changePercent(e.target.value)}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                                }}
                                            />
                                            <Typography variant="caption"
                                                        style={{marginRight: '5px'}}>امتیاز</Typography>
                                            <Typography variant="caption"
                                                        style={{marginRight: '3px'}}>{ point }</Typography>
                                        </Grid>
                                        <Typography variant="caption">هر امتیاز معادل 1000 تومان میباشد</Typography>
                                    </Grid>
                                    <Grid item container xs={12} sm={12} md={6} direction="row">
                                        <Typography variant="h6">نوع</Typography>
                                        <FormControl fullWidth>
                                            <Select
                                                style={{paddingTop: '10px', paddingBottom: '15px'}}
                                                value={type}
                                                onChange={e => productProductAddChangeProp('type', e.target.value)}
                                                displayEmpty
                                                variant="outlined"
                                            >
                                                <MenuItem value="" disabled>
                                                    نوع محصول را انتخاب کنید
                                                </MenuItem>
                                                <MenuItem value="downloadable">دارای لینک دانلود</MenuItem>
                                                <MenuItem value="physical">بدون لینک دانلود</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {
                                        type === 'downloadable' &&
                                        <Grid item container xs={12} sm={12} md={12} direction="row">
                                            <Typography variant="h6" style={{marginTop: '20px'}}>لینک ها</Typography>
                                            <TagsInput
                                                className={classes.tagsInputWrapper}
                                                inputProps={{
                                                    placeholder: 'افزودن لینک'
                                                }}
                                                value={links}
                                                onChange={(tags) => productProductAddChangeProp('links', tags) }
                                            />
                                        </Grid>
                                    }
                                    <Grid item container xs={12} sm={12} md={12} direction="row">
                                        <Typography variant="h6">توضیحات</Typography>
                                        <TextField
                                            multiline
                                            rows="8"
                                            fullWidth
                                            variant="outlined"
                                            margin="dense"
                                            value={description}
                                            onChange={e => productProductAddChangeProp('description', e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container xs={12} sm={10} md={4} direction="row">
                                    {
                                        categories.length !== 0 &&
                                        <React.Fragment>
                                            <Typography variant="h6" style={{width: '100%'}}>دسته بندی</Typography>
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    value={category}
                                                    onChange={e => productProductAddChangeProp('category', e.target.value)}
                                                >
                                                    {
                                                        categories.map(category => {
                                                            return <FormControlLabel
                                                                value={category._id}
                                                                control={<Radio />}
                                                                key={category._id}
                                                                label={'-'.repeat(category.indent) + ' ' + category.name}
                                                            />
                                                        })
                                                    }
                                                </RadioGroup>
                                            </FormControl>
                                        </React.Fragment>
                                    }
                                </Grid>
                                <Grid item container xs={12} sm={12} md={12} direction="row">
                                    <Typography variant="body1"
                                                style={{width: '100%', color: 'red'}}>{error}</Typography>
                                </Grid>
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

const mapStateToProps = ({productProductAdd, app}) => {
    return {...productProductAdd, ...app}
}

export default compose(
    connect(mapStateToProps, {
        productProductAddChangeProp,
        prodcutProductAddFetchCategories,
        productProductAddSubmitForm
    }),
    withStyles(styles)
)(ProductAdd);