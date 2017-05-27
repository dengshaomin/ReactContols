'use strict';

import React,{ PropTypes } from 'react';
import { requireNativeComponent } from 'react-native';


var iface = {
    name: 'NativeWebView',
    propTypes: {
        url: React.PropTypes.string,
        html: React.PropTypes.string,
    },
};

module.exports = requireNativeComponent('NativeWebView', iface);