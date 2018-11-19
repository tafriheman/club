import React, { Component } from 'react';
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
import styles from './styles/ProductEdit';
import { connect } from 'react-redux';
import {
  productProductEditChangeProp,
  prodcutProductEditFetchCategories,
  productProductEditSubmitForm
} from '../../redux/actions'
import TagsInput from 'react-tagsinput';
import DropZone from 'react-dropzone';
import config from '../../config.json';

import 'react-tagsinput/react-tagsinput.css'

class ProductEdit extends Component {

  componentWillMount() {
    const { club, token, prodcutProductEditFetchCategories } = this.props;
    
    prodcutProductEditFetchCategories(club._id, token);
  }

  onImagesDrop(acceptedFiles, rejectedFiles) {
		if (acceptedFiles) {
      this.props.productProductEditChangeProp('images', [])
			acceptedFiles.forEach(file => {
				const reader = new FileReader();
				reader.onload = () => {
					const image = reader.result;
          this.props.productProductEditChangeProp('images', [...this.props.images, image])
				}
				reader.readAsDataURL(file);
			});
		}
  }
  
  renderImages() {
    const { images, classes } = this.props;

    if(images.length !== 0) {
      return (
        <Grid item container direction="row">
        <Typography variant="title" style={{ width: '100%' }}>عکس های ارسال شده</Typography>
        {
          images.map((image, i) => {
            return <img src={image.indexOf('public') === -1 ? image : `${config.domain}/${image}`} key={i} alt="" className={classes.image}/>
          })
        }
       </Grid>
      )
    }
  }

  findParent(categories, category) {
    for(let i = 0; i < categories.length; i++){
      if(categories[i]._id.toString() === category.parent) {
        return i;
      } 
    }
    return -1
  }

  sortCategories() {
    const { categories } = this.props;
    let newCategories = [];

    let needRunAgain = true;
    while(needRunAgain) {
      needRunAgain = false; 

      for(let i = 0; i < categories.length; i++) {
        if(!categories[i].parent) {
          categories[i].indent = 1;
          newCategories.push(categories[i]);
        }
        else {
          let parentIndex = this.findParent(newCategories, categories[i]);
          if(parentIndex === -1) {
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
      productProductEditSubmitForm, club, token, links, type, name, 
      category, 
      history, 
      point,
      price,
      description,
      images,
      _id
    } = this.props;

    productProductEditSubmitForm(club._id, _id, token, {
      name, type, description, point, price, links, images, category
    }, history);
  }

  render() {
    const { 
      classes,
      type,
      productProductEditChangeProp,
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
        <Typography variant="h4" className={classes.header}>ویرایش محصول</Typography>
        <Grid item container style={{ marginTop: '20px' }} direction="column">
          <Card>
            <CardContent>
              <Grid item container direction="row" alignItems="baseline" spacing={32} justify="center">
                <Grid item container xs={12} sm={10} md={6} direction="row">
                  <Typography variant="title">نام</Typography>
                  <TextField 
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={name}
                    onChange={e => productProductEditChangeProp('name', e.target.value)}
                  />
                </Grid>
                <Grid item container xs={12} sm={10} md={6}>
                  <Typography variant="title">قیمت</Typography>
                  <TextField 
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={price}
                    onChange={e => productProductEditChangeProp('price', e.target.value )}
                  />
                </Grid>
                <Grid item container xs={12} sm={10} md={6}>
                  <Typography variant="title">امتیاز</Typography>
                  <TextField 
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={point}
                    onChange={e => productProductEditChangeProp('point', e.target.value )}
                  />
                </Grid>
                <Grid item container xs={12} sm={10} md={6}>
                  <Typography variant="title" style={{ marginTop: '20px' }}>نوع</Typography>
                  <FormControl fullWidth>
                    <Select
                      style={{ paddingTop: '10px', paddingBottom: '15px' }}
                      value={type}
                      onChange={e => productProductEditChangeProp('type', e.target.value)}
                      displayEmpty
                      variant="outlined"
                    >
                      <MenuItem value="" disabled>
                        نوع محصول را انتخاب کنید
                      </MenuItem>
                      <MenuItem value="downloadable">دارای لینک دانلود</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {
                  type === 'downloadable' && 
                  <Grid item container xs={12} sm={12} md={12} direction="row">
                      <Typography variant="title" style={{ marginTop: '20px' }}>لینک ها</Typography>
                      <TagsInput 
                        className={classes.tagsInputWrapper}
                        inputProps={{
                          placeholder: 'افزودن لینک'
                        }}   
                        value={links}
                        onChange={(tags) => productProductEditChangeProp('links', tags) }
                      />
                  </Grid>
                }
                <Grid item container xs={12} sm={10} md={6} direction="row">
                  <Typography variant="title">توضیحات</Typography>
                  <TextField 
                    multiline
                    rows="8"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={description}
                    onChange={e => productProductEditChangeProp('description', e.target.value)}
                  />
                </Grid>
                <Grid item container xs={12} sm={10} md={6} direction="row" justify="center">
                  <Typography variant="title" style={{ width: '100%' }}>عکس ها</Typography>
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
                {
                  categories.length !== 0 &&
                  <Grid item container xs={12} sm={10} md={6} direction="row">
                    <Typography variant="title" style={{ width: '100%'}}>دسته بندی</Typography>
                    <FormControl component="fieldset">
                      <RadioGroup
                        value={category}
                        onChange={e => productProductEditChangeProp('category', e.target.value)}
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
                  </Grid>
                }
                {
                  categories.length !== 0 &&
                  <Grid item container xs={12} sm={10} md={6}></Grid>
                }
                <Grid item container xs={12} sm={12} md={12} direction="row">
                  <Typography variant="body1" style={{ width: '100%', color: 'red' }}>{error}</Typography>
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
                  ویرایش
                </Button>
                <Button
                  style={{ marginLeft: '10px' }}
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

const mapStateToProps = ({ productProductEdit, app }) => {
 return { ...productProductEdit , ...app}
}

export default compose(
  connect(mapStateToProps, {
    productProductEditChangeProp,
    prodcutProductEditFetchCategories,
    productProductEditSubmitForm
  }),
  withStyles(styles)
)(ProductEdit);