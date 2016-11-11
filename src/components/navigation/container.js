import { connect } from 'react-redux';
import Navigation from './main';


const mapStateToProps = ({ navigation: { anchors } }) => ({
  anchors
});

const mapDispatchToProps = () => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
