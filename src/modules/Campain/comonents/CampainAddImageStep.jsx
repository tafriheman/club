import React, { Component } from 'react';
import {
  Grid,
  Typography,
  Button,
  withStyles
} from '@material-ui/core';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import DropZone from 'react-dropzone';
import styles from '../styles/CampainAdd';
import {
  campainCampainAddChangeProp,
} from '../../../redux/actions';

class CampainAddImageStep extends Component {

  onImagesDrop(acceptedFiles, rejectedFiles) {
		if (acceptedFiles) {
      this.props.campainCampainAddChangeProp('images', [])
			acceptedFiles.forEach(file => {
				const reader = new FileReader();
				reader.onload = () => {
					const image = reader.result;
          this.props.campainCampainAddChangeProp('images', [...this.props.images, image])
				}
				reader.readAsDataURL(file);
			});
		}
  }

  renderImages() {
    const { images, classes } = this.props;

    return (
      <Grid item container direction="row" xs={12} sm={10} md={6}>
        <Typography variant="title" style={{ width: '100%' }}>عکس های ارسال شده</Typography>
        {
          images.map((image, i) => {
            return <img src={image} key={i} alt="" className={classes.image}/>
          })
        }
      </Grid>
    )
  }

  render() {
    const { classes, next, previous } = this.props;

    return (
      <Grid container direction="row" justify="center" spacing={16}>
        <Grid item container direction="column" alignItems="center" xs={12} sm={10} md={6}>
            <Typography variant="title" style={{ alignSelf: 'flex-start' }}>عکس ها</Typography>
            <DropZone
              multiple
              onDrop={this.onImagesDrop.bind(this)}
              accept="image/jpeg, image/png, image/gif"
            >
              <div className={classes.uploadMessageContainer}>
                <p>عکس ها را اینجا بکشید</p>
                <p>یا کلیک کنید</p>
              </div>
            </DropZone>
          </Grid>
          { this.renderImages() }
          <Grid item container direction="row-reverse" justify="space-between" className={classes.action}>
            <Button
              variant="contained"
              onClick={next}
            >
              بعدی
            </Button>
            <Button
              variant="contained"
              onClick={previous}
            >
              قبلی
            </Button>
          </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ campainCampainAdd }) => {
  return { ...campainCampainAdd }
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    campainCampainAddChangeProp
  })
)(CampainAddImageStep);