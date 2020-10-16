
import React from 'react';
import { ImageSourcePropType } from 'react-native';
import {View, StyleSheet, TouchableOpacity,Image } from 'react-native';
let numberOfRectangles:number;
let radius:number;
let fillRectangleHeight:number;
let baseRectangleStyle = {};
interface Props {
    circleDiameter:number;
    onPress:() => void;
    source:ImageSourcePropType;
  }
export class CircleButton extends React.Component<Props> {
   
    constructor(props:Props) {
    super(props)

    numberOfRectangles = 15
    radius = this.props.circleDiameter / 2

    // base the height of each bars on the circle radius.
    // Add 1 to the value b/c we will subtract one down below to get rid of the zero index
    fillRectangleHeight = radius / (numberOfRectangles + 1)

    // The style used for the rectangles
    // the zIndex and elevation of 10 puts the rectangles in front of the clickable button
    baseRectangleStyle = {
      position: 'absolute',
      zIndex: 10,
      elevation: 10,
    }
  }

  fillRectangle = (iteration:  number, starting: string) => {
    const barHeight = fillRectangleHeight
    const roundedRadius = Math.ceil(radius)
    const y = (barHeight * iteration)

    const x = Math.ceil(Math.sqrt(Math.pow(radius, 2) - Math.pow(y, 2)))

    let width = roundedRadius - x

    // The bar dimensions
    const size = {
      width: width,
      height: barHeight
    };

    const verticalLocation = y + roundedRadius

    let location = {}
    if(starting === 'topLeft'){
      location = {
        left: 0,
        bottom: verticalLocation,
      };
    }else if(starting === 'bottomLeft'){
      location = {
        left: 0,
        top: verticalLocation,
      }
    }else if(starting === 'topRight'){
      location = {
        right: 0,
        top: verticalLocation,
      }
    }else if(starting === 'bottomRight'){
      location = {
        right: 0,
        bottom: verticalLocation,
      }
    };

    // Create a unique key to identify the element
    let key = "" + iteration + starting

    return(
      <View key={key} style={{...baseRectangleStyle, ...size, ...location}}></View>
    )
  };

  renderLines = (starting: string) => {
    //start with index+1 b/c 0 will be a width of zero, so no point in doing that math
    return [...Array(numberOfRectangles)].map((_, index) => this.fillRectangle(index+1, starting))
  }

  fillRectangles = () => {
    return(
      <React.Fragment>
        {this.renderLines('topLeft')}
        {this.renderLines('bottomLeft')}
        {this.renderLines('topRight')}
        {this.renderLines('bottomRight')}
      </React.Fragment>
     )
   };

  render(){
    let localStyles = styles(this.props)

    return (
      <View style={localStyles.container}>
        <TouchableOpacity
          activeOpacity={.8}
          style = {localStyles.button}
          onPress = {() => this.props.onPress()}
        >
          <Image style={localStyles.img}  source={ this.props.source} />
        </TouchableOpacity>

        {this.fillRectangles()}
      </View>
    )
  }
}

const styles = (props: Props) => StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 0,
  },
  button: {
    backgroundColor: '#3928A6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (props.circleDiameter / 2),
    borderWidth: 0,
    width: props.circleDiameter,
    height: props.circleDiameter,
  },
  img:{
    width:10,
    height:14,
   
  },
});
