import { connect } from 'react-redux';
import {
  registerAnchor,
  unregisterAnchor
} from 'actions/actions';
import Anchor from './main';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  registerAnchor:   (component) => { dispatch(registerAnchor(component)); },
  unregisterAnchor: (component) => { dispatch(unregisterAnchor(component)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Anchor);
