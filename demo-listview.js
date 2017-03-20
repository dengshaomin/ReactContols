import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    PanResponder,
    View,
    Animated,
    LayoutAnimation, TouchableHighlight, ListView, RefreshControl,
    Image,
} from 'react-native';
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
var HeaderHeight = 100;
var temp = 0;
var pageNum = 1;
//每页显示数据的条数
const pageSize = 10;
//页面总数据数
var pageCount = 0;
//页面List总数据
var totalList = new Array();
import LoadingMore from './loading_more.gif'
var scrollEnabled = false;
var test = 1;
export default class MyTouch extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            bg: 'red',
            bg1: 'pink',
            width: 300,
            height: 300,
            distant: 0,
            trans: new Animated.ValueXY({x: 0, y: -HeaderHeight}),
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            loaded: false,//加载更多是否完成
            refreshing: false, //刷新
            foot: 0,// 控制foot， 0：隐藏foot  1：已加载完成   2 ：显示加载中
            error: false,
        }
    }

    componentWillUpdate() {
    }

    _handleStartShouldSetPanResponder(e, gestureState) {
        console.log('aaaaaa');
        return true;
    }

    _handleMoveShouldSetPanResponder(e, gestureState) {
        console.log(2);
        return true;
    }

    _handlePanResponderGrant(e, gestureState) {
        console.log(4);
        if (gestureState.numberActiveTouches === 2) {
            this.setState({bg: 'orange'});
        }
    }

    _handlePanResponderEnd(e, gestureState) {
        console.log(3);
        temp = 0;
        // LayoutAnimation.spring(customAnim.customLinear);
        // this.setState({trans: {x: 0, y: 0}, distant: 0});
        var move;
        // if (this.state.distant > HeaderHeight) {
        //     this.timer = setTimeout(() => {
        //             this.setState({distant: 0});
        //         }
        //         ,
        //         2000
        //     );
        //     this.setState({distant: HeaderHeight});
        // } else {
        //     move = -HeaderHeight;
        //     this.setState({distant: move});
        // }

    }

    _handlePanResponderMove(e, gestureState) {
        console.log('move');
        if (gestureState.dy > 0 && this.state.distant)
            if (gestureState.dy - temp < 5) {
                return;
            }
        temp = (gestureState.dy - temp) * 0.5;
        if (gestureState.dy >= 0) {
            this.state.trans.setValue({x: 0, y: temp});
        }
        // this.setState({distant: temp});
    }

    componentWillMount() {
        this.gestureHandlers = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
            onPanResponderGrant: this._handlePanResponderGrant.bind(this),
            onPanResponderMove: this._handlePanResponderMove.bind(this),
            onPanResponderRelease: this._handlePanResponderEnd.bind(this),
            onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
        })
        pageNum = 1;
        this.timer = setTimeout(() => {
                this._fetchListData()
            }
            ,
            30
        );
    }

    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
        this.state.trans.removeAllListeners();
    }

    handleScroll(e) {
        // var scrollY = e.nativeEvent.contentInset.top + e.nativeEvent.contentOffset.y
        //
        // if (this.isTouching || (!this.isTouching && !this.props.ignoreInertialScroll)) {
        //     if (scrollY < -this.props.minPulldownDistance) {
        //         if (!this.props.isRefreshing) {
        //             if (this.props.onRefresh) {
        //                 this.props.onRefresh()
        //             }
        //         }
        //     }
        // }
        console.log('');
    }

    render() {
        return (
            <Animated.View
                style={[styles.container, this.state.trans.getLayout(), {backgroundColor: 'blue'}]}>
                <ListView
                    {...this.gestureHandlers.panHandlers}
                    ref="listView"
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    renderFooter={this._renderFooter.bind(this)}
                    renderHeader={this._renderHeader.bind(this)}
                    onEndReached={this._endReached.bind(this)}
                    onEndReachedThreshold={100}
                />
            </Animated.View>
        )

    }

    _renderRow(rowData) {
        return (
            <View style={{flex: 1}}>
                <Image source={{uri: rowData.url}}
                       style={{width: ScreenWidth, height: ScreenHeight / 2, marginTop: 5}}
                />
            </View>
        )
    }

    _endReached() {
        if (this.state.foot != 0) {
            return;
        }
        this.setState({
            foot: 2,
        });
        this.timer = setTimeout(
            () => {
                pageNum++;
                this._fetchListData();
            }, 2000);
    }

    onRefresh() {
        this.setState({refreshing: true,});
        this._fetchListData();
    }

    _renderFooter() {
        if (this.state.foot === 1) {//加载完毕
            return (
                <View style={{height: 40, alignItems: 'center', justifyContent: 'flex-start',}}>
                    <Text style={{color: '#999999', fontSize: 12, marginTop: 10}}>
                        {this.state.moreText}
                    </Text>
                </View>);
        } else if (this.state.foot === 2) {//加载中
            return (
                <View style={{width: ScreenWidth, height: 80, alignItems: 'center', justifyContent: 'center',}}>
                    <Image source={LoadingMore} style={{flex: 1}}/>
                </View>);
        }
    }

    _renderHeader() {
        return (
            <Text style={{
                width: ScreenWidth,
                height: HeaderHeight,
                alignItems: 'center'
            }}> {this.state.distant}</Text>)
    }

    _fetchListData() {
        var mythis = this;
        if (pageNum > 1) {
            this.setState({loaded: true});
        }
        console.log(this.state.refreshing + "==")
        fetch('http://gank.io/api/search/query/listview/category/福利/count/10/page/' + pageNum).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                mythis.setState({error: true, loaded: true});
            }
        }).then(json => {
            console.log(mythis.state.refreshing + "++")
            if (mythis.state.refreshing) {
                mythis.setState({refreshing: false});
                totalList.splice(0, totalList.length);
            }
            let responseCode = json.error;
            if (responseCode == false) {
                pageCount = json.count;
                let list = json.results;
                let currentCount = 0;
                if (list == null) {
                    list = [];
                    currentCount = 0;
                } else {
                    currentCount = list.length;
                }
                if (currentCount < pageSize) {
                    //当当前返回的数据小于PageSize时，认为已加载完毕
                    mythis.setState({foot: 1, moreText: moreText});
                } else {//设置foot 隐藏Footer
                    mythis.setState({foot: 0});
                }
                for (var i = 0; i < list.length; i++) {
                    totalList.push(list[i]);
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(totalList),
                    loaded: true,
                });
            } else {
                mythis.setState({error: true, loaded: true});
            }
        }).catch(function (error) {
            console.log(error.message)
            mythis.setState({error: true, loaded: true});
        });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
    rectBig: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    square: {
        width: ScreenWidth,
        height: 100,
        backgroundColor: 'blue'
    }
});