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
    Image
} from 'react-native';
import ViewPager from 'react-native-viewpager'
export default class DemoViewPager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ViewPager.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
        }
    }

    componentWillMount() {
        fetch('http://gank.io/api/search/query/listview/category/福利/count/10/page/' + 1).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return null;
            }
        }).then(json => {
            console.log(1111);
            // let list = json.results;
            // this.state.dataSource.concat(list);
            this.setState({
                dataSource: this.state.dataSource.cloneWithPages(json.results),
            });

        }).catch(function (error) {
            console.log(error.message)
        });
    }

    render() {
        return (
            <View style={{height: 180}}>
                <ViewPager
                    dataSource={this.state.dataSource}
                    renderPage={this._renderPage}
                    isLoop={true}
                    autoPlay={true}/>
            </View>
        )
            ;
    }

    _renderPage(data) {
        return (
            <Image
                style={styles.page}
                source={{uri: data.url}}
            />
        );
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
