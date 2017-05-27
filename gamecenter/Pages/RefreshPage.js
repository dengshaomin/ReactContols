import React from 'react'
import { View, StyleSheet, ListView, Text, InteractionManager } from 'react-native'

import {
    SwRefreshListView,
    RefreshStatus, //刷新状态 用于自定义 
    LoadMoreStatus, //上拉加载状态 用于自定义 
} from '../widgets/SWRefreshView.js'


export default class RefreshComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
        }
    }
    render() {
        return (<SwRefreshListView
            dataSource={this.state.dataSource}
            ref="listView"
            renderRow={this._renderRow.bind(this)}
            onRefresh={this._onListRefersh.bind(this)}
            onLoadMore={this._onLoadMore.bind(this)}
        //其他需要设置的ListView属性 
        />);
    }
    _renderRow(data) {
        return (<Text style={{ flex: 1, alignItems: 'center', padding: 30, backgroundColor: 'blue', fontSize: 25 }}>{data}</Text>);
    }
    _onListRefersh(end) {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            this._page = 0
            let data = []
            for (let i = 0; i < 10; i++) {
                data.push(i)
            }
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data)
            })
            if (this.refs.listView != null) {
                this.refs.listView.resetStatus() //重置上拉加载的状态 
                setTimeout(function () {
                    end()//刷新成功后需要调用end结束刷新 
                }, 500);
            }
            // this.refs.listView.endRefresh() //新增方法 结束刷新 建议使用end() 。当然这个可以在任何地方使用 
        }, 1500)
    }

    /**
     * 模拟加载更多
     * @param end
     * @private
     */
    _onLoadMore(end) {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            this._page++
            let data = []
            for (let i = 0; i < (this._page + 1) * 10; i++) {
                data.push(i)
            }
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data)
            })
            end(this._page > 2)//加载成功后需要调用end结束刷新 假设加载4页后数据全部加载完毕 

        }, 2000)
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            let timer = setTimeout(() => {
                clearTimeout(timer)
                this.refs.listView.beginRefresh()
            }, 500) //自动调用开始刷新 新增方法 
        });
    }
}