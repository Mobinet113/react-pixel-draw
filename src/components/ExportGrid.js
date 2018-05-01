import React, {Component} from 'react';
import { connect } from 'react-redux';

const styles = {
  container: {
    width: "100%",
    height: 200,
    overflow: "scroll"
  }
};

class ExportGrid extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="ExportGrid" style={styles.container}>
        <h3>Export Code</h3>
        <code>
          {JSON.stringify(this.props.pixels)}
        </code>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pixels: state.pixels
  }
};

export default connect(
  mapStateToProps
)(ExportGrid);