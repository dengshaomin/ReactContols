'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Platform,
    ToastAndroid,
} from 'react-native';

export default class AsyncComponent extends React.Component {
    render() {
        this.getData();
        console.log(6);
        return (<View style={{ flex: 1 }} />);
    }
    getData() {
        this.getdatafromnet(true).then(() => {
            console.log(4)
        });
        this.getdatafromnet(false).then(() => {
            console.log(5)
        }).catch(function (err) {
            console.log(err);
        });
    }
    getdatafromnet(flag) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log(1);
                if (flag) {
                    /**成功返回 继续执行then*/
                    resolve(2);
                }
                else {
                    /**抛出异常，不执行then,执行catch */
                    reject(3);
                }

            }, 3000);
        });
    }
}