'use strict';

import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Animated
} from 'react-native';
import DemoViewPager from './demo-viewpager'
import DemoScrollView from './demo-scrollview'
import MyTouch from './demo-listview'
import AnimatedDemo from './demo-animate'
import DemoList from './demo-listview-2'
// import App from './gankmeizi/app/App'
import App from './gamecenter/App'
export default class ReactNative extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _animatedValue: new Animated.ValueXY(),
        }
    }


    render() {
        return (
            <App/>
        )
            ;
    }

    componentWillMount() {
        Animated.spring(this.state._animatedValue, {
            toValue: {x: 0, y: -100},
            friction: 10,
        }).start()
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    hello: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    page: {
        flex: 1
    },
    flexStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eeff00'
    }, flexSub: {
        width: 300,
        height: 100,
        backgroundColor: '#333333',
        marginBottom: 10,
    },
});

AppRegistry.registerComponent('reactnative', () => ReactNative);