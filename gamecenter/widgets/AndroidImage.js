import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
var source;
var defaultSource;
var errorSource;
var success = false;
export default class AndroidImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: 0, //1:加载成功,2:加载失败
        }
    }
    render() {
        success = false;
        defaultSource = { uri: this.props.dimg == null ? 'ppsgame_default_icon' : this.props.dimg }
        source = { uri: this.props.img == null ? defaultSource.uri : this.props.img }
        errorSource = { uri: this.props.eimg == null ? defaultSource.uri : this.props.eimg }
        if (this.state.loading == 2) {
            source = errorSource;
        } 
        return (
            <Image style={this.props.style} defaultSource={defaultSource} source={source}
                onLoadEnd={this._onLoadEnd.bind(this)} onLoad={this._onLoad.bind(this)}>
            </Image>
        )
    }
    _onLoad() {
        success = true;
    }
    _onLoadEnd() {
        if (!success) {
            this.setState({ loading: 2 });
        }
    }
}