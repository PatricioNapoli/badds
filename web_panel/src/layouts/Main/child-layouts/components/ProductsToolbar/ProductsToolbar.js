import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from '../../../../../components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const ProductsToolbar = props => {
  const { Buttons, className, showSearch, ...rest } = props;

  const classes = useStyles();

  let searchBar = null;
  if (showSearch != null && showSearch !== false) {
    searchBar = (<div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search product"
        />
      </div>);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Buttons classes={classes} />
      </div>
      {searchBar}
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string,
  showSearch: PropTypes.bool,
  Buttons: PropTypes.elementType
};

export {ProductsToolbar};
