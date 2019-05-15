import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  categoryCategoryListFetchCategories,
  categoryCategoryEditSetForm
} from '../../redux/actions';
import {
  Grid,
  Typography,
  withStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import compose from 'recompose/compose';
import styles from './styles/CategoryList';

class CategoryList extends Component {

  componentWillMount() {
    const { token, club, categoryCategoryListFetchCategories} = this.props;

    categoryCategoryListFetchCategories(club._id, token);
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
        let category = newCategories.find(cat => cat._id === categories[i]._id);
        if(category !== undefined) continue;

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

  render() {
    const { 
      classes, 
      categoryCategoryEditSetForm,
      history
    } = this.props;

    let categories = this.sortCategories();

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>لیست دسته بندی ها</Typography>
        <Grid item className={classes.paperContainer}>
          {
            categories.length ===  0 ? <Typography variant="body1" align="right" style={{ marginTop: '20px' }}>دسته بندی وجود ندارد</Typography> :
            (<Paper classes={{ root: classes.paperRoot }}>
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell numeric>نام</TableCell>
                    <TableCell numeric>ویرایش</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    categories.map(category => {
                      return (
                        <TableRow key={category._id}>
                          <TableCell numeric component="th" scope="row">{ '-'.repeat(category.indent) + ' ' + category.name }</TableCell>
                          <TableCell numeric component="th" scope="row">
                            <Button
                              variant="fab"
                              mini
                              style={{ background: '#00a152' }}
                              onClick={() => categoryCategoryEditSetForm({ name: category.name, _id: category._id, parent: category.parent }, history)}
                            >
                              <Edit style={{ color: 'white' }}/>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                }
                </TableBody>
            </Table>
            </Paper>)
          }
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ app, categoryCategoryList }) => {
  return { ...app, ...categoryCategoryList };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    categoryCategoryListFetchCategories,
    categoryCategoryEditSetForm
  })
)(CategoryList);