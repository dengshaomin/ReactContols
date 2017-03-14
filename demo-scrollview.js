/**
 * Created by dengshaomin on 2017/2/16.
 */
'use strict';

import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';
// var datas = Array.from(new Array);
export default class DemoScrollView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            datas: []
        }
        ;
    }

    componentWillMount() {
        fetch('http://gank.io/api/search/query/listview/category/福利/count/10/page/' + 1).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return null;
            }
        }).then(json => {
            let list = json.results;
            this.setState({
                loaded: true,
                datas: json.results
            });
        }).catch(function (error) {
            console.log(error.message)
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView keyboardDismissMode={'on-drag'}>
                    {
                        this._renderPage()
                    }
                </ScrollView>
            </View>
        )
            ;
    }

    _renderPage() {
        var views = [];
        for (var i = 0; i < this.state.datas.length; i++) {
            if (i == 3) {
                views.push(<Text key={i}>234</Text>)
            } else
                views.push(<Image
                    key={i}
                    style={styles.page}
                    source={{uri: this.state.datas[i].url}}
                />);
        }
        return views;
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    hello: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    page: {
        height: 300,
        flex: 1
    },
    flexStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eeff00'
    }, flexSub: {
        width: 300,
        height: 100,
        backgroundColor: '#333333',
        marginBottom: 10,
    },
});
