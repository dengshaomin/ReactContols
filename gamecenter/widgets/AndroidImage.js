import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
var source;
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
        if (this.props.source == null || this.props.source.uri == null) {
            if (this.props.defaultSource == null || this.props.source.uri == null) {
                this.props.defaultSource = { uri: 'ppsgame_default_icon' }
            };
            this.props.source = this.props.defaultSource;
        };

        if (this.state.loading == 2) {
            if (this.props.errorSource == null ||this.props.errorSource.errorSource.uri == null) {
                source = this.props.defaultSource;
            } else {
                source = this.props.errorSource;
            }
        } else {
            source = this.props.source;
        }
        return (
            <Image style={this.props.style} defaultSource={this.props.defaultSource} source={source}
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