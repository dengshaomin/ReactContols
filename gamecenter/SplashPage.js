/**
 * 启动页面
 * Created by iWgang on 16/06/01.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';

import { APP_MAIN_COLOR } from './GlobalConst';


class SplashPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      downAnim: new Animated.Value(0),
      upAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this._inAnim(() => {
      setTimeout(() => {
        this.props.onAnimEnd && this.props.onAnimEnd();
      }, 100);
    });
  }

  render() {
    let down = [
      {
        translateY: this.state.downAnim.interpolate({ inputRange: [0, 1], outputRange: [-200, 0] }),
      }
    ];

    let up = [
      {
        translateY: this.state.upAnim.interpolate({ inputRange: [0, 1], outputRange: [200, 0] }),
      }
    ];
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Animated.View style={{ flex: 1, transform: down, opacity: this.state.downAnim }}>
          <Text style={{ fontSize: 80, textAlign: 'right', fontStyle: 'italic', fontWeight: 'bold' }}>R</Text>
        </Animated.View>
        <Animated.View style={{ flex: 1, transform: up, opacity: this.state.upAnim }}>
          <Text style={{ fontSize: 80, textAlign: 'left', fontStyle: 'italic', fontWeight: 'bold' }}>N</Text>
        </Animated.View>
      </View>
    );
  }

  _inAnim(callback) {
    Animated.parallel([
      Animated.spring(this.state.downAnim, {
        toValue: 1,
        duration: 1000,
        speed: 0.1,
      }),
      Animated.spring(this.state.upAnim, {
        toValue: 1,
        duration: 1000,
        speed: 0.1,
      }),
    ]).start(() => callback && callback());
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  text2: {
    color: '#D3D3D3',
    fontSize: 15,
  },
  text3: {
    color: '#D3D3D3',
    fontSize: 18,
    marginTop: 30,
  }
});


export default SplashPage;