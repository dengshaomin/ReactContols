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


export default class Todo {
    id = `${Date.now()}${Math.floor(Math.random() * 10)}`;

    @observable
    title = '';

    @observable
    done = false;
    constructor(title, done) {
        this.title = title;
        this.done = done;
    }
}