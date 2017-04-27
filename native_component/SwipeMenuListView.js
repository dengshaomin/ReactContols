// 仅数据展示
'use strict';
import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

var iface = {
    name: 'SwipeMenuListView',
    propTypes: {
        array: PropTypes.arrayOf(PropTypes.string),
        ...View.propTypes, // 包含默认的View的属性
    },
};

module.exports = requireNativeComponent('SwipeMenuListView', iface);