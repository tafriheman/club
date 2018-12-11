import React, { Component } from 'react';
import {
  campainCampainListToggleGiftDialog,
  campainCampainListSetGiftUsed
} from '../../../redux/actions';
import { connect } from 'react-redux';
import moment from 'jalali-moment';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  Button
} from '@material-ui/core';

class CampainGiftDialog extends Component {

  render() {
    const { 
      giftDialogOpen,
      campainCampainListToggleGiftDialog,
      campainCampainListSetGiftUsed,
      giftData,
      club,
      token
    } = this.props;

    return (
    <Dialog
      open={giftDialogOpen}
      onClose={campainCampainListToggleGiftDialog}
      fullWidth
      maxWidth="sm"
    >
          <DialogTitle>کد هدیه</DialogTitle>
          <DialogContent>
            <Grid container direction="column" alignItems="center">
                <Grid item container direction="row" justify="space-between" xs={12} sm={10} md={8} >
                  <Typography variant="body1">نام کمپین</Typography>
                  <Typography variant="body1">{giftData.campaign && giftData.campaign.name}</Typography>
                </Grid>
                <Grid item container direction="row" justify="space-between" xs={12} sm={10} md={8} style={{marginTop: '10px'}}>
                  <Typography variant="body1">نام مشتری</Typography>
                  <Typography variant="body1">{giftData.gift && giftData.gift.customer.full_name}</Typography>
                </Grid>
                <Grid item container direction="row" justify="space-between" xs={12} sm={10} md={8} style={{marginTop: '10px'}}>
                  <Typography variant="body1">شماره مشتری</Typography>
                  <Typography variant="body1">{giftData.gift && giftData.gift.customer.phone}</Typography>
                </Grid>
                <Grid item container direction="row" justify="space-between" xs={12} sm={10} md={8} style={{marginTop: '10px'}}>
                  <Typography variant="body1">زمان صدور هدیه</Typography>
                  <Typography variant="body1">{giftData.gift && moment(giftData.gift.issued_time).format('HH:mm jYYYY/jMM/jDD')}</Typography>
                </Grid>
                <Grid item container direction="row" justify="space-between" xs={12} sm={10} md={8} style={{marginTop: '10px'}}>
                  <Typography variant="body1">هدیه</Typography>
                  <Typography variant="body1">{giftData.gift && giftData.gift.gift.free }</Typography>
                </Grid>
                <Grid item container direction="row-reverse" xs={12} sm={10} md={8} style={{ marginTop: '20px' }}>
                  {
                    giftData.gift && !giftData.gift.used &&
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      onClick={() => campainCampainListSetGiftUsed(club._id, giftData.campaign._id, giftData.gift.code, token)}
                    >
                    ابطال
                  </Button>
                  }
                  {
                    giftData.gift && giftData.gift.used &&
                    <React.Fragment>
                      <Typography variant="body1" color="error">استفاده شده است</Typography>
                      <Typography variant="body1" color="error" style={{ marginLeft: '5px', marginRight: '5px'}}>{moment(giftData.gift.used_time).format("HH:mm jYYYY/jMM/jDD")}</Typography>
                      <Typography variant="body1" color="error">این کد در تاریخ</Typography>
                    </React.Fragment>
                  }
               </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
    );
  }
}

const mapStateToProps = ({ campainCampainList, app }) => {
  return { ...campainCampainList, ...app };
}

export default connect(mapStateToProps, {
  campainCampainListToggleGiftDialog,
  campainCampainListSetGiftUsed
})(CampainGiftDialog);