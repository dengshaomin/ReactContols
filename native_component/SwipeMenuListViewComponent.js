// 数据展示和事件交互
'use strict';
import React, { Component, PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

// 第一个参数是原生模块的名称， 第二个是当前组件的名称
var SwipeMenuListView = requireNativeComponent('SwipeMenuListView', SwipeMenuListViewComponent, {
    nativeOnly: { onChange: true }
});

class SwipeMenuListViewComponent extends Component {
    render() {
        // onChange事件是JS已经定义好的，对应原生的topChange事件
        return <SwipeMenuListView {...this.props} onChange={(event) => {
            this.props.onDelete(event);
        }} />;
    }
}

SwipeMenuListViewComponent.propTypes = {
    array: PropTypes.arrayOf(PropTypes.string),
    onDelete: PropTypes.func,
    ...View.propTypes, // 包含默认的View的属性
};

module.exports = SwipeMenuListViewComponent;