import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Pixel extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      colour: this.props.colour
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.onClick(this.props.index);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return {
      colour: nextProps.colour
    }
  }

  render() {

    let pixelStyle = {
      width: this.props.width,
      height: this.props.height,
      backgroundColor: this.state.colour,
      float: "left",
      boxShadow: "inset 0 0 1px #ebebeb"
    };

    return (
      <div className="pixel"
           style={pixelStyle}
           onClick={this.handleClick}
      />
    );
  }
}


Pixel.defaultProps = {
  colour: "#FFF",
  width: 10,
  height: 10,
  onClick: () => void(0)
};

Pixel.propTypes = {
  index: PropTypes.number.isRequired,
  colour: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  onClick: PropTypes.func
};



export default Pixel;