import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { findWeaknessScoringforParticularPosition, calculateHeatmapScoring, findSquarestoHighlightforHeatmap } from "../../common/utils/NewGameUtils";


class SubscriptionCard extends React.Component {


  render() {
    const {
      state,
      district,
      vaccineType,
      vaccineAgeGroup,

    } = this.props.subscription;

    return (
      <div>
        
      </div>
    );
  }
}

SubscriptionCard.propTypes = {
  subscription: PropTypes.object.isRequired,
}

export default SubscriptionCard
