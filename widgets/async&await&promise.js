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
    async getData() {
        const f = await this.getdatafromnet(true);
        console.log(f)
        console.log(5);
    }
    getdatafromnet(flag) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log(1);
                if (flag) {
                    /**成功返回 */
                    resolve(2);
                }
                else {
                    reject(3);
                }

            }, 3000);
        });
    }
}