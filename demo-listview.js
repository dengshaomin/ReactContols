import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    PanResponder,
    View
} from 'react-native';
import x from 'react-native-refresher'
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
var HeaderHeight = 100;
var MaxDistance = ScreenHeight * 2;
var temp;
import pullto from 'react-native-refreshable-listview'
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

    _handleStartShouldSetPanResponder(e, gestureState) {
        console.log(1);
        return gestureState.numberActiveTouches === 2;
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
            var offset = gestureState.dy - temp;
            temp = gestureState.dy;
            var ds = gestureState.dy - gestureState.dy * gestureState.dy / MaxDistance;
            console.log(this.state.distant + "=" + gestureState.dy + "=" + Math.log10(gestureState.dy));
            // if (gestureState.dy > MaxDistance) ds = MaxDistance;
            this.setState({distant: ds});
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


    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    width: ScreenWidth,
                    height: HeaderHeight,
                    backgroundColor: 'white',
                    marginTop: this.state.distant - HeaderHeight
                }}/>
                <View {...this.gestureHandlers.panHandlers}
                      style={{width: ScreenWidth, height: ScreenHeight, backgroundColor: 'red'}}/>
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