import React from "react";
import { connect } from "react-redux";

import { Spinner } from "react-bootstrap";

export const Loading = ({ isLoading }) => (
  <div>
    {isLoading && (
      <div className="loading-spinner-div">
        <Spinner className="loading-spinner" animation="border" />
      </div>
    )}
  </div>
);

const mapStateToProps = (state) => ({
  isLoading: state.loading > 0,
});

export default connect(mapStateToProps)(Loading);
