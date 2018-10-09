import React, { Component } from 'react';
import PluginCard from './components/PluginCard.jsx';
import { Grid, Typography } from '@material-ui/core';
import PluginDialog from './components/PluginDialog';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import ReactPaginate from 'react-paginate';

class MyPlugins extends Component {

  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    
    // fetch data
  }

  handlePageClick(data) {

    // call fetch data
  }

  renderPagination() {
    const { total, pageSize } = this.props;
    if (total != 0)
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
    return (
        <Grid container direction="column" alignItems="center">
          <Typography variant="title" align="right" style={{ width: '100%', marginBottom: '20px' }}>افزونه های من</Typography>

          <Grid container direction="row" spacing={8}>
            <PluginCard type="my-plugins" />
            <PluginCard type="my-plugins" />
            <PluginCard type="my-plugins" />
            <PluginCard type="my-plugins" />
            <PluginCard type="my-plugins" />
            <PluginCard type="my-plugins" />
          </Grid>
          { this.renderPagination() }
          <PluginDialog type="my-plugins" />
      </Grid>
    );
  }
}

const mapStateToProps = ({ pluginsMyPlugins }) => {
  return { ...pluginsMyPlugins };
}

export default compose(
  connect(mapStateToProps),
)(MyPlugins);
