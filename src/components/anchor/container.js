import { connect } from 'react-redux';
import {
  registerAnchor,
  unregisterAnchor
} from '../../actions/actions';
import Anchor from './main';

const mapStateToProps = (
  state,
  { offsetTop, offsetBottom, disabled, ...ownProps }) => ({ // eslint-disable-line no-unused-vars
    ownProps
  }
);

const mapDispatchToProps = (dispatch) => ({
  registerAnchor:   (parentId, props, configuration) => {
    dispatch(registerAnchor(parentId, props, configuration));
  },
  unregisterAnchor: (parentId) => { dispatch(unregisterAnchor(parentId)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Anchor);
