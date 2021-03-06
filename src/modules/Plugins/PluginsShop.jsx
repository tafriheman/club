import React, { Component } from 'react';
import PluginCard from './components/PluginCard.jsx';
import PluginDialog from './components/PluginDialog';
import { Grid, Typography, Snackbar} from '@material-ui/core'
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { 
  pluginsPluginsShopFetchPlugins,
  pluginsPluginsShopSetError

} from '../../redux/actions';
import MySnackbarContentWrapper from '../../components/MySnackbarContentWrapper';

class PluginsShop extends Component {

  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    const { pluginsPluginsShopFetchPlugins, pageSize, token, club } = this.props;    
    pluginsPluginsShopFetchPlugins(club._id ,1, pageSize, token);
  }

  handlePageClick(data) {
    const { pluginsPluginsShopFetchPlugins, pageSize, token, club } = this.props;
    pluginsPluginsShopFetchPlugins(club._id, data.selected + 1, pageSize, token);
  }

  renderPagination() {
    const { total, pageSize } = this.props;
    if (total !== 0 && total > pageSize)
      return (
        <ReactPaginate
          previousLabel={"قبلی"}
          nextLabel={"بعدی"}
          breakLabel={<a className="page-link">...</a>}
          pageCount={Math.ceil(total / pageSize)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
          containerClassName="pagination"
          nextClassName="page-item"
          previousClassName="page-item"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          breakClassName="page-item"
        />
      );
  }

  closeError() {
    this.props.pluginsPluginsShopSetError('')
  }

  render() {
    const { plugins, error } = this.props;
    return (
      <React.Fragment>
        <Grid container direction="column" alignItems="center"  style={{ maxHeight: '100%' }}>
          <Typography variant="h4" align="right" style={{ width: '100%', marginBottom: '20px' }}>فروشگاه افزونه ها</Typography>
          <Grid container direction="row" spacing={8}>
            {
              plugins.map(plugin => {
                return <PluginCard type="plugins-shop" plugin={plugin} key={plugin._id}/>;
              })
            }
          </Grid>
          { this.renderPagination() }
          <PluginDialog type="plugins-shop"/>
        </Grid>
        <Snackbar
          style={{ marginTop: '20px' }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={error.length !== 0}
          autoHideDuration={3000}
          onClose={this.closeError.bind(this)}
        >
          <MySnackbarContentWrapper
            onClose={this.closeError.bind(this)}
            variant="error"
            message={error}
          />
        </Snackbar>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ pluginsPluginsShop, app }) => {
  return { ...pluginsPluginsShop, ...app };
}

export default compose(
  connect(mapStateToProps, {
    pluginsPluginsShopFetchPlugins,
    pluginsPluginsShopSetError
  })
)(PluginsShop);