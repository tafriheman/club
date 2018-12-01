import React, { Component } from 'react';
import { 
  Grid,
  Typography,
  Card,
  CardContent,
  withStyles,
} from '@material-ui/core';
import styles from './styles/CampainEdit';
import { Wizard, Steps, Step } from 'react-albus';
import CampainEditInfoStep from './comonents/CampainEditInfoStep';
import CampainEditGiftStep from './comonents/CampainEditGiftStep';
import CampainEditImageStep from './comonents/CampainEditImageStep';


class CampainEdit extends Component {

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
                  render={({ next }) => <CampainEditInfoStep next={next} />} 
                />
                <Step
                  id="image"
                  render={({ next, previous }) => <CampainEditImageStep previous={previous} next={next} />}
                />
                <Step
                  id="gift"
                  render={({ previous }) => <CampainEditGiftStep previous={previous} history={history} />}
                />
              </Steps>
            </Wizard>
          </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CampainEdit);