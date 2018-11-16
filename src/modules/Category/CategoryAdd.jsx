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
import styles from './styles/CategoryAdd';
import { connect } from 'react-redux';
import {
  categoryCategoryAddChangeProp,
  categoryCategoryAddFetchCategories,
  categoryCategorySubmitForm
} from '../../redux/actions';

class CategoryAdd extends Component {

  componentWillMount() {
    const { categoryCategoryAddFetchCategories, club, token } = this.props;

    categoryCategoryAddFetchCategories(club._id, token);
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
    const { club, token, name, parent, history, categoryCategorySubmitForm } = this.props;

    categoryCategorySubmitForm(club._id, token, { name, parent }, history)
  }

  render() {
    const {
      classes,
      error,
      name,
      parent,
      categoryCategoryAddChangeProp
    } = this.props;

    const categories = this.sortCategories();

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>افزودن دسته بندی</Typography>
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
                      onChange={e => categoryCategoryAddChangeProp('name', e.target.value )}
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
                        onChange={e => categoryCategoryAddChangeProp('parent', e.target.value)}
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
                  افزودن
                </Button>
              </Grid>
           </CardActions>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({ categoryCategoryAdd, app }) => {
  return { ...categoryCategoryAdd, ...app };
}

export default compose(
  connect(mapStateToProps, {
    categoryCategoryAddChangeProp,
    categoryCategoryAddFetchCategories,
    categoryCategorySubmitForm
  }),
  withStyles(styles)
)(CategoryAdd);