import React, { Component } from 'react';
import { 
  Grid,
  Typography,
  Card,
  CardContent,
  withStyles,
} from '@material-ui/core';
import styles from './styles/CampainAdd';
import { Wizard, Steps, Step } from 'react-albus';
import CampainAddInfoStep from './comonents/CampainAddInfoStep';
import CampainAddGiftStep from './comonents/CampainAddGiftStep';
import CampainAddImageStep from './comonents/CampainAddImageStep';


class CampainAdd extends Component {

  render() {
    const { 
      classes,
      history
    } = this.props;

    return (
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>افزودن کمپین</Typography>
        <Grid item container style={{ marginTop: '20px' }} direction="column">
          <Card>
            <CardContent className="step-progress">
            <Wizard>
              <Steps>
                <Step
                  id="info"
                  render={({ next }) => <CampainAddInfoStep next={next} />} 
                />
                <Step
                  id="image"
                  render={({ next, previous }) => <CampainAddImageStep previous={previous} next={next} />}
                />
                <Step
                  id="gift"
                  render={({ previous }) => <CampainAddGiftStep previous={previous} history={history} />}
                />
              </Steps>
            </Wizard>
                
                {/* 
                
                
                
                
                <Grid item container xs={12} sm={12} md={12} direction="row">
                  <Typography variant="body1" style={{ width: '100%', color: 'red' }}>{error}</Typography>
                </Grid> */}
              {/* </Grid> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CampainAdd);