import React from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage
} from 'react-native';
const {EventEmitter} = require('events');
import * as types from '../values/types.js'
export default class GameService extends React.Component {
    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static get(url, params, callback) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        fetch(url, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                callback(types.NetStatu.ERROR);
            }
        }).then((json) => {
            callback(types.NetStatu.SUCCESS, json);
        }).catch(function (error) {
            callback(types.NetStatu.ERROR);
        });
    }
    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static post(url, params, headers, callback) {
        //fetch请求
        fetch(url, {
            method: 'POST',
            headers: {
                'token': headers
            },
            body: JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            }).done();
    }
}