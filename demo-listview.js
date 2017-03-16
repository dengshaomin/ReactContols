import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    PanResponder,
    View,
    Animated,
    LayoutAnimation, TouchableHighlight
} from 'react-native';
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
var HeaderHeight = 100;
var temp = 0;
const customAnim = {
    customSpring: {
        duration: 1000,
        create: {
            type: LayoutAnimation.Types.linear,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 0.6
        },
        update: {
            type: LayoutAnimation.Types.spring,
            springDamping: 1
        }
    },
    customLinear: {
        duration: 200,
        create: {
            type: LayoutAnimation.Types.linear,
            property: LayoutAnimation.Properties.opacity,
        },
        update: {
            type: LayoutAnimation.Types.easeInEaseOut
        }
    }
};
export default class MyTouch extends Component {
    //noinspection JSAnnotator
    constructor(props, context) {
        super(props, context);
        this.state = {
            bg: 'red',
            bg1: 'pink',
            width: 300,
            height: 300,
            distant: 0,
            trans: new Animated.ValueXY(0),
            pan: new Animated.ValueXY()
        }
    }

    componentWillUpdate() {
    }

    _handleStartShouldSetPanResponder(e, gestureState) {
        return true;
    }

    _handleMoveShouldSetPanResponder(e, gestureState) {
        console.log(2);
        return true;
    }

    _handlePanResponderGrant(e, gestureState) {
        console.log(4);
        if (gestureState.numberActiveTouches === 2) {
            this.setState({bg: 'orange'});
        }
    }

    _handlePanResponderEnd(e, gestureState) {
        console.log(3);
        temp = 0;
        // LayoutAnimation.spring(customAnim.customLinear);
        // this.setState({trans: {x: 0, y: 0}, distant: 0});
        Animated.spring(this.state.pan, {duration: 2000, toValue: {x: 0, y: 0}}
        ).start();
    }

    _handlePanResponderMove(e, gestureState) {
        if (gestureState.dy - temp < 5) {
            return;
        }
        temp = (gestureState.dy - temp) * 0.5;
        this.setState({trans: {x: 0, y: temp}, distant: temp});
        // Animated.event(
        //     [null, {dx: this.state.trans.x, dy: this.state.trans.y}] // 绑定动画值
        // )
    }

    componentWillMount() {
        // LayoutAnimation.spring(customAnim);
        this.gestureHandlers = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
            onPanResponderGrant: this._handlePanResponderGrant.bind(this),
            onPanResponderMove: this._handlePanResponderMove.bind(this),
            onPanResponderRelease: this._handlePanResponderEnd.bind(this),
            onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
        })
    }

    render() {
        return (
            <Animated.View {...this.gestureHandlers.panHandlers} style={{
                flex: 1,
                marginTop: this.state.distant - HeaderHeight,
                transform: this.state.pan.getTranslateTransform()
            }}>
                <View style={{
                    width: ScreenWidth,
                    height: HeaderHeight,
                    backgroundColor: 'red',

                }}>
                    <Text style={{
                        flex: 1,
                        backgroundColor: "white",
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#99357a',
                        fontSize: 15,
                    }}>
                        {this.state.distant}
                    </Text>
                </View>
                <View style={{flex: 1, backgroundColor: "yellow"}}/>
                <TouchableHighlight onPress={() => {
                    Animated.spring(this.state.pan, {
                        duration: 500,
                        toValue: {x: 0, y: 0}  // return to start
                    }).start();
                }}><Animated.View
                    style={[styles.square, {transform: this.state.pan.getTranslateTransform()}]}/>
                </TouchableHighlight>

            </Animated.View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
    rectBig: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    square: {
        width: ScreenWidth,
        height: 100,
        backgroundColor: 'blue'
    }
});