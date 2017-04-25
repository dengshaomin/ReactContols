'use strict';

import React, { PropTypes, Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Platform
} from 'react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';
import Todo from './ToDo.js'
@observer
export default class TodoItem extends React.Component {
    constructor() {
        super();
    }
    static propTypes = {
        data: PropTypes.instanceOf(Todo),
    };
    onPress = () => {
        const { data } = this.props;
        data.done = !data.done;
    };
    render() {
        const { data } = this.props;
        return (
            <Text
                style={[styles.item, data.done && styles.done]}
                onPress={this.onPress}
            >
                {data.title}
            </Text>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    todo: {
        fontSize: 20,
    },
    done: {
        color: 'gray',
        textDecorationLine: 'line-through',
    },
});