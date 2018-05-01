import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';


class ColourPicker extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedColour: this.props.defaultColour,
      position: {
        x: 0,
        y: 0
      },
    };

    this.handleColourChange = this.handleColourChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleColourChange(colour){
    this.setState({selectedColour: colour.hex});
    this.props.onChange(colour);
  }

  handleDrag(e){
    console.log(e);
  }

  render() {

    let styles = {
      container: {
        position: "fixed",
        left: this.state.position.x,
        top: this.state.position.y
      }
    };

    return (
      <div id="colour-picker" style={styles.container} onMouseEnter={this.handleDrag}>
        <SketchPicker color={ this.state.selectedColour } onChangeComplete={this.handleColourChange} />
      </div>
    );
  }
}



ColourPicker.defaultProps = {
  defaultColour: "#FFF",
  onChange: () => void(0)
};

ColourPicker.propTypes = {
  defaultColour: PropTypes.string,
  onChange: PropTypes.func
};

export default ColourPicker;
