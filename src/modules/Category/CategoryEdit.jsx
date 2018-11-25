import React, { Component } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardActions,
  Button,
  withStyles
} from '@material-ui/core';
import compose from 'recompose/compose';
import styles from './styles/CategoryList';
import { connect } from 'react-redux';
import {
  categoryCategoryEditFetchCategories,
  categoryCategoryEditChangeProp,
  categoryCategoryEditSubmitForm
} from '../../redux/actions';

class CategoryEdit extends Component {

  constructor(props) {
    super(props);

    this.isDisable = this.isDisable.bind(this);
  }

  componentWillMount() {
    const { categoryCategoryEditFetchCategories, club, token } = this.props;

    categoryCategoryEditFetchCategories(club._id, token);
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
    const { club, token, name, parent, history, categoryCategoryEditSubmitForm, _id } = this.props;

    categoryCategoryEditSubmitForm(club._id, _id, token, { name, parent }, history)
  }

  isDisable(categories, id) {
    const { _id } = this.props;

    // itself
    if(_id === id) 
      return true
    
    // if not parent
    let index = categories.findIndex(category => category.parent === _id);
    if(index === -1)
      return false; 


    let editCatIndex = categories.findIndex(category => category._id === _id);
    let lastIndex; 
    for(let i = editCatIndex + 1; i < categories.length; i++) {
      if(categories[i].indent === categories[editCatIndex].indent) {
        lastIndex = i;
        break;
      }
    }

    if(!lastIndex) lastIndex = categories.length;
    let currentCatIndex = categories.findIndex(category => category._id === id); 

    if(currentCatIndex > editCatIndex && currentCatIndex < lastIndex) return true;
    return false;
  }

  render() {
    const {
      classes,
      error,
      name,
      parent,
      categoryCategoryEditChangeProp,
      history
    } = this.props;

    const categories = this.sortCategories();

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>ویرایش دسته بندی</Typography>
        <Grid item container style={{ marginTop: '20px' }} direction="column">
          <Card>
            <CardContent>
              <Grid container direction="column">
                <Grid item container direction="row" spacing={16} justify="center">
                  <Grid item container direction="column" md={6} sm={10} xs={11}>
                    <Typography variant="title">نام دسته بندی</Typography>
                    <TextField 
                      fullWidth
                      value={name}
                      onChange={e => categoryCategoryEditChangeProp('name', e.target.value )}
                      variant="outlined"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item container direction="column" md={6} sm={10} xs={11}>
                    {
                      categories.length === 0 ? '' :
                      <Typography variant="title">دسته بالایی</Typography>
                    }
                    <FormControl component="fieldset">
                      <RadioGroup
                        value={parent}
                        onChange={e => categoryCategoryEditChangeProp('parent', e.target.value)}
                      >
                      {
                        categories.map(category => {
                          return <FormControlLabel 
                                    disabled={this.isDisable(categories, category._id)}
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
                  <Grid item container xs={12} sm={12} md={12} direction="row">
                    <Typography variant="body1" style={{ width: '100%', color: 'red' }}>{error}</Typography>
                  </Grid>
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
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: '10px' }}
                  onClick={() => history.goBack()}
                >
                انصراف
                </Button>
              </Grid>
           </CardActions>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({ categoryCategoryEdit, app }) => {
  return { ...categoryCategoryEdit, ...app };
}

export default compose(
  connect(mapStateToProps, {
    categoryCategoryEditFetchCategories,
    categoryCategoryEditChangeProp,
    categoryCategoryEditSubmitForm
  }),
  withStyles(styles)
)(CategoryEdit);