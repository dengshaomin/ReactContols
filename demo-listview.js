import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    PanResponder,
    View,
    Animated
} from 'react-native';
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
var HeaderHeight = 100;
var MaxDistance = HeaderHeight;
var temp;
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
            trans: new Animated.ValueXY(),
        }
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
        this.setState({trans: {x: 0, y: 0}});
    }

    _handlePanResponderMove(e, gestureState) {
        // this.setState({bg: 'orange'});
        // var dx = Math.abs(e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX);
        // var dy = Math.abs(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY);
        // var distant = Math.sqrt(dx * dx + dy * dy);
        // if (distant > this.state.distant) {
        //     console.log("bigger");
        // } else {
        //     console.log("smaller");
        // }
        var offset = gestureState.dy - temp;
        temp = gestureState.dy;
        var ds = gestureState.dy - gestureState.dy * gestureState.dy / (MaxDistance * 5);
        if (this.state.trans.y >= MaxDistance) {
            ds = MaxDistance;
        }
        console.log(this.state.distant + "=" + gestureState.dy + "=" + Math.log10(gestureState.dy));
        // if (gestureState.dy > MaxDistance) ds = MaxDistance;
        this.setState({trans: {x: 0, y: ds}});
        temp = ds;
        // Animated.event(
        //     [null, {dx: this.state.trans.x, dy: this.state.trans.y}] // 绑定动画值
        // )
    }

    componentWillMount() {
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
                flex: 1, transform: [
                    {translateX: this.state.trans.x, translateY: this.state.trans.y},
                ]
            }}>
                <View style={{
                    width: ScreenWidth,
                    height: HeaderHeight,
                    alignItems: 'center',
                    backgroundColor: 'red',
                    marginTop: -HeaderHeight,
                }}>
                    <Text style={{
                        width: ScreenWidth,
                        height: HeaderHeight,
                        color: '#99357a',
                        fontSize: 12,
                        backgroundColor: "red"
                    }}>
                    </Text>
                </View>
                <View style={{flex: 1, backgroundColor: "yellow"}}{...this.gestureHandlers.panHandlers}/>
            </Animated.View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    rectBig: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});