import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button
} from '@material-ui/core';
import {
  campainCampainListDeleteCampain,
  campainCampainEditSetCampain,
  campainCampainListToggleCampainBoard,
  campainCampainListFetchUsers
} from '../../../redux/actions';
import config from '../../../config.json';
import { Edit, Delete } from '@material-ui/icons';
import { connect } from 'react-redux';

class CampainListCard extends Component {

  hasPermission(permission) {
    if (this.props.club.permissions.indexOf(permission) === -1)
      return false;
    return true;
  }

  render() {
    const { 
      campain, 
      history, 
      club, 
      token, 
      campains, 
      total,
      board,
      campainCampainListDeleteCampain,
      campainCampainEditSetCampain,
      campainCampainListToggleCampainBoard,
      campainCampainListFetchUsers
    } = this.props;

    return (
      <Grid md={3} sm={6} xs={12} item>
        <Card>
          <CardActionArea
            onClick={() => {
              campainCampainListFetchUsers(club._id, campain._id, 1, board.pageSize, token)
              campainCampainListToggleCampainBoard(campain._id);
            }}
          >
            <CardMedia
              image={ campain.images.length === 0 ? require('../../../assets/images/product/no-image.png') : `${config.domain}/${campain.images[0]}`}
              style={{ height: '150px' }}
            />
            <CardContent>
              <Grid container direction="column">
                <Typography variant="body1">{campain.name}</Typography>
                {
                  campain.attenders.length !== 0 &&
                  <Typography variant="body1" style={{ marginTop: '10px' }}>سه نفر اول</Typography>
                }
                {
                  campain.attenders.map(user => {
                    return <Typography variant="body2" align="center" key={user._id}>{user.customer.full_name}</Typography>
                  })
                }
              </Grid>
            </CardContent>
          </CardActionArea>
          <CardActions style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            {
              this.hasPermission(config.campain.update) &&
              <Button
                variant="fab"
                mini
                style={{ background: '#00a152' }}
                onClick={() => campainCampainEditSetCampain(campain, history)}
              >
                <Edit style={{ color: 'white' }}/>
              </Button>
            }
            {
              this.hasPermission(config.campain.delete) &&
              <Button
                variant="fab"
                mini
                color="secondary"
                style={{ marginRight: '5px' }}
                onClick={() => campainCampainListDeleteCampain(
                  club._id, campain._id, token, campains, total
                )}
              >
                <Delete style={{ color: 'white' }}/>
              </Button>
            }
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

const mapStateToProps = ({ campainCampainList, app }) => {
  return { ...campainCampainList, ...app };
}

export default connect(mapStateToProps, {
  campainCampainListDeleteCampain,
  campainCampainEditSetCampain,
  campainCampainListToggleCampainBoard,
  campainCampainListFetchUsers
})(CampainListCard);