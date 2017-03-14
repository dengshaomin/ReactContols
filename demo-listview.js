import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    PanResponder,
    View
} from 'react-native';
export default class MyTouch extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            bg: 'red',
            bg1: 'pink',
            width: 300,
            height: 300,
            distant: 0,
        }
    }
    componentWillMount(){
        this.gestureHandlers = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
            onPanResponderGrant: this._handlePanResponderGrant.bind(this),
            onPanResponderMove: this._handlePanResponderMove.bind(this),
            onPanResponderRelease: this._handlePanResponderEnd.bind(this),
            onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
        })
    }
    _handleStartShouldSetPanResponder(e, gestureState){
        console.log("start" + " " + gestureState.dy);
        return gestureState.numberActiveTouches === 2;
    }

    _handleMoveShouldSetPanResponder(e, gestureState){
        console.log("move start" + " " + gestureState.dy);
        return gestureState.numberActiveTouches === 2;
    }
    _handlePanResponderGrant(e, gestureState){
        console.log("grant" + " " + gestureState.dy);
        if (gestureState.numberActiveTouches === 2) {
            this.setState({bg: 'orange'});
        }
    }
    _handlePanResponderEnd(e, gestureState){
        this.setState({bg: 'red'});
        console.log(gestureState);
    }

    _handlePanResponderMove(e, gestureState){
        console.log(gestureState.numberActiveTouches + " " + e.nativeEvent.touches.length);
        if (gestureState.numberActiveTouches === 2) {
            this.setState({bg: 'orange'});
            var dx = Math.abs(e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX);
            var dy = Math.abs(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY);
            var distant = Math.sqrt(dx*dx + dy*dy);
            if (distant > this.state.distant) {
                console.log("bigger");
            } else {
                console.log("smaller");
            }
            this.setState({distant: distant});
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View
                    {...this.gestureHandlers.panHandlers}
                    style={[styles.rectBig, {
                        "backgroundColor": this.state.bg,
                        "width": this.state.width,
                        "height": this.state.height
                    }]}>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rectBig: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});