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
        this._animateValue6 = new Animated.ValueXY();
        this._animateValue7 = new Animated.ValueXY();
        this._animateValue8 = new Animated.Value(0);
        var animatedListenerId = this._animateValue8.addListener(({ value }) => {
            console.log(value);
        });

        // this._opacityAnimation = this._animateValue1.x.interpolate({
        //     inputRange: [0, 200],
        //     outputRange: [0.2, 1],
        //     extrapolate: 'clamp'
        // });
    }

    componentDidMount() {
        this.timer1 = setTimeout(() => {
            this._animateValue1.setValue(200);
        }, 1000);
        this.timer2 = setTimeout(() => {
            this._animateValue2.setValue({ x: 200, y: 0 });
        }, 1000);
        Animated.timing(this._animateValue3, {
            toValue: { x: 200, y: 0 },
            duration: 500,
            delay: 1000,
            easing: Easing.linear,
        }).start();

        Animated.timing(this._animateValue4, {
            toValue: 0,
            duration: 500,
            delay: 1000,
            easing: Easing.linear,
        }).start(() => {
        });

        Animated.timing(this._animateValue5, {
            toValue: { x: 200, y: 0 },
            delay: 1000,
            duration: 1500,
            easing: Easing.elastic(1),
        }).start();
        this.timer3 = setTimeout(() => {
            Animated.spring(this._animateValue6, {
                toValue: { x: 200, y: 0 },
                friction: 5,
            }).start();
        }, 1000);
        this.timer4 = setTimeout(() => {
            Animated.decay(this._animateValue7, {
                velocity: { x: 0.6, y: 0 }, // velocity from gesture release
                deceleration: 0.997,
            }).start();
        }, 1000);
        Animated.timing(this._animateValue8, {
            toValue: 1,
            delay: 1000,
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

                <Animated.View style={[this._animateValue6.getLayout(), { margin: 20, }]} >
                    <Text>Animated.Spring</Text>
                </Animated.View>
                <Animated.View style={[this._animateValue7.getLayout(), { margin: 20, }]} >
                    <Text>Animated.decay</Text>
                </Animated.View>
                <Animated.View style={[{
                    margin: 20,
                    left: this._animateValue8.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 200]
                    }),
                    opacity: this._ani
                }]} >
                    <Text>interpolate</Text>
                </Animated.View>

            </View >);
    }

    componentWillUnmount() {
        this.timer1 && clearTimeout(this.timer1);
        this.timer2 && clearTimeout(this.timer2);
        this.timer3 && clearTimeout(this.timer3);
        this.timer4 && clearTimeout(this.timer4);
        this.timer5 && clearTimeout(this.timer5);
        this._animateValue8.removeAllListeners();
    }

}