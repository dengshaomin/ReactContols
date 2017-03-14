import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    PanResponder,
    View
} from 'react-native';
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
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

    _handleStartShouldSetPanResponder(e, gestureState) {
        return gestureState.numberActiveTouches === 2;
    }

    _handleMoveShouldSetPanResponder(e, gestureState) {
        return true;
    }

    _handlePanResponderGrant(e, gestureState) {
        if (gestureState.numberActiveTouches === 2) {
            this.setState({bg: 'orange'});
        }
    }

    _handlePanResponderEnd(e, gestureState) {
        this.setState({bg: 'red'});
        console.log(gestureState);
    }

    _handlePanResponderMove(e, gestureState) {
        if (gestureState.numberActiveTouches === 1) {
            // this.setState({bg: 'orange'});
            // var dx = Math.abs(e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX);
            // var dy = Math.abs(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY);
            // var distant = Math.sqrt(dx * dx + dy * dy);
            // if (distant > this.state.distant) {
            //     console.log("bigger");
            // } else {
            //     console.log("smaller");
            // }
            console.log("=" + gestureState.dy);
            this.setState({distant: gestureState.dy});
        }
    }

    render() {
        return (
            <View>
                <View
                    {...this.gestureHandlers.panHandlers}
                    style={{
                        height: ScreenHeight,
                        width: ScreenWidth,
                        backgroundColor: this.state.bg,
                        marginTop: this.state.distant
                    }}>
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