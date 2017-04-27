'use strict';

import React,{ PropTypes } from 'react';
import { requireNativeComponent } from 'react-native';

var iface = {
    name: 'NativeButtonView',
    propTypes: {
        text: React.PropTypes.string,
        html: React.PropTypes.string,
        ...View.propTypes, // 包含默认的View的属性
    },
};

module.exports = requireNativeComponent('NativeButtonView', iface);