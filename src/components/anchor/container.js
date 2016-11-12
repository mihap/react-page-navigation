import { connect } from 'react-redux';
import {
  registerAnchor,
  unregisterAnchor
} from 'actions/actions';
import Anchor from './main';

const mapStateToProps = (state, ownProps) => ({
  ownProps
});

const mapDispatchToProps = (dispatch) => ({
  registerAnchor:   (parentId, props) => { dispatch(registerAnchor(parentId, props)); },
  unregisterAnchor: (parentId) => { dispatch(unregisterAnchor(parentId)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Anchor);
