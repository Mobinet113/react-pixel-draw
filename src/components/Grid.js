import React, {Component} from 'react';
import Pixel from './Pixel';
import ColourPicker from './ColourPicker';
import io from "socket.io-client"
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {loadInitialPixels, updatePixel} from '../redux/modules/pixels';

let socket;

class Grid extends Component {
  constructor(props, context) {
    super(props, context);

    socket = io.connect("http://localhost:5000");

    socket.on('updatePixel', (results) => {
      this.props.updatePixel(false, results.id, results.colour);
    });

    this.state = {
      activeColour: 'black',
      formation: [],
      loaded: false,
      mouseDown: false
    };

    this.handlePixelClick    = this.handlePixelClick.bind(this);
    this.handleColourChange  = this.handleColourChange.bind(this);
    this.handlePixelHover    = this.handlePixelHover.bind(this);
    this.handleGridMouseDown = this.handleGridMouseDown.bind(this);
    this.handleGridMouseUp   = this.handleGridMouseUp.bind(this);
  }

  componentDidMount(){
    this.props.loadPixels(socket);
    this.setState({loaded: true});
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  handleGridMouseDown(){
    this.setState({ mouseDown: true });
  }

  handleGridMouseUp(){
    this.setState({ mouseDown: false });
  }

  handlePixelClick(id){
    this.props.updatePixel(socket, id, this.state.activeColour);
  }

  handlePixelHover(id){
    if ( this.state.mouseDown ) {
      this.props.updatePixel(socket, id, this.state.activeColour);
    }
  }

  handleColourChange(colour){
    this.setState({activeColour: colour.hex});
  }

  render() {

    if ( this.state.loaded ) {
      return (
        <div>
          <div id="grid" style={styles.gridStyles} onMouseDown={this.handleGridMouseDown} onMouseUp={this.handleGridMouseUp}>
            {this.props.pixels.map((pixel, index) =>
              <Pixel index={index}
                     key={index}
                     colour={pixel.colour}
                     onMouseOver={this.handlePixelHover}
                     onClick={this.handlePixelClick}/>
            )}
          </div>

          <ColourPicker onChange={this.handleColourChange}/>

        </div>
      );
    } else {
      return <div>Loading</div>
    }
  }
}

const styles = {
  gridStyles: {
    margin: "0 auto",
    border: "solid 1px black",
    width: "500px",
    height: "500px"
  }
};

const mapStateToProps = (state) => {
  return {
    pixels: state.pixels
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadPixels: loadInitialPixels,
    updatePixel: updatePixel
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid)