import React, { Component } from 'react';
import PluginCard from './components/PluginCard.jsx';
import { Grid, Typography } from '@material-ui/core';
import PluginDialog from './components/PluginDialog';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import ReactPaginate from 'react-paginate';
import MySnackbarContentWrapper from '../../components/MySnackbarContentWrapper';
import { Link } from 'react-router-dom';
import { 
  pluginsMyPluginsFetchPlugins,
  pluginsMyPluginsSetError

} from '../../redux/actions';

class MyPlugins extends Component {

  constructor(props) {
    super(props); 
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    const { pluginsMyPluginsFetchPlugins, pageSize, token, club } = this.props;    
    pluginsMyPluginsFetchPlugins(club._id ,1, pageSize, token);
  }

  handlePageClick(data) {
    const { pluginsMyPluginsFetchPlugins, pageSize, token, club } = this.props;
    pluginsMyPluginsFetchPlugins(club._id, data.selected + 1, pageSize, token);
  }

  renderPagination() {
    const { total, pageSize } = this.props;
    if (total != 0 && total > pageSize)
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

  render() {
    const { error, pluginsMyPluginsSetError, plugins } = this.props

    return (
      <div>
        <Grid container direction="column" alignItems="center">
          <Typography variant="h4" align="right" style={{ width: '100%', marginBottom: '20px' }}>افزونه های من</Typography>
          <Grid container direction="row" spacing={8}>
            {
              plugins.length !== 0 ?
              plugins.map(plugin => {
                return <PluginCard type="my-plugins" plugin={plugin} key={plugin._id}/>;
              })
              : <Link to="/dashboard/plugins" style={{ textDecoration: 'none', marginRight: '20px' }}>خرید افزونه</Link>
            }
          </Grid>
          { this.renderPagination() }
          <PluginDialog type="my-plugins" />
      </Grid>
      {/* <MySnackBarError
          open={error.length !== 0}
          message={error}
          onClose={pluginsMyPluginsSetError}
        /> */}
    </div>
    );
  }
}

const mapStateToProps = ({ pluginsMyPlugins, app }) => {
  return { ...pluginsMyPlugins, ...app };
}

export default compose(
  connect(mapStateToProps, {
    pluginsMyPluginsFetchPlugins,
    pluginsMyPluginsSetError
  }),
)(MyPlugins);
