'use strict'
import React from 'react';
import {
    View, Animated, Text, Easing,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
/**
 * getlaytout 简化left:0,top:0
 * getTranslateTransform 简化translateX:0,translateY:0
 * 
 */
export default class AnimateComponent extends React.Component {
    constructor() {
        super();

        this._animateValue1 = new Animated.Value();
        this._animateValue2 = new Animated.ValueXY();
        this._animateValue3 = new Animated.ValueXY();
        this._animateValue4 = new Animated.Value(1);
        this._animateValue5 = new Animated.ValueXY();
        // this._opacityAnimation = this._animateValue1.x.interpolate({
        //     inputRange: [0, 200],
        //     outputRange: [0.2, 1],
        //     extrapolate: 'clamp'
        // });
    }

    componentDidMount() {
        this.timer1 = setTimeout(() => {
            this._animateValue1.setValue(200);
        }, 2000);
        this.timer2 = setTimeout(() => {
            this._animateValue2.setValue({ x: 200, y: 0 });
        }, 2000);
        Animated.timing(this._animateValue3, {
            toValue: { x: 200, y: 0 },
            duration: 500,
            delay: 2000,
            easing: Easing.linear,
        }).start();

        Animated.timing(this._animateValue4, {
            toValue: 0,
            duration: 500,
            delay: 2000,
            easing: Easing.linear,
        }).start();

        Animated.timing(this._animateValue5, {
            toValue: { x: 200, y: 0 },
            delay: 2000,
            duration: 1500,
            easing: Easing.elastic(1),
        }).start();

    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Animated.View style={{ margin: 20, left: this._animateValue1 }} >
                    <Text>setValue</Text>
                </Animated.View>
                <Animated.View style={{ margin: 20, transform: this._animateValue2.getTranslateTransform() }} >
                    <TouchableOpacity onPress={() => {
                        ToastAndroid.show('here', 1000);
                    }}>
                        <Text>getTranslateTransform</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[this._animateValue3.getLayout(), { margin: 20 }]} >
                    <TouchableOpacity onPress={() => {
                        ToastAndroid.show('here', 1000);
                    }}>
                        <Text>getLayout</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[, { margin: 20, opacity: this._animateValue4 }]} >
                    <Text>opacity</Text>
                </Animated.View>

                <Animated.View style={[this._animateValue5.getLayout(), { margin: 20, }]} >
                    <Text>opacity</Text>
                </Animated.View>
            </View>);
    }

    componentDidUnmount() {
        this.timer1 && clearTimeout(this.timer1);
    }

}