import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  RefreshControl,
  Text,
  ActivityIndicator,
  View, Image,
} from 'react-native';
import * as types from '../values/types'
import styles from '../values/styles'
import colors from '../values/colors.js'
import OvalButtonComp from '../widgets/OvalButtonComp.js'
import * as GlobalConst from '../GlobalConst.js'
import LongGameItem from '../widgets/LongGameItem.js'
import AndroidImage from '../widgets/AndroidImage.js'
let pageIndex = 1;
let isLoadMore = true;
let hasMoreData = true;
let lastDataSourceSize = 0;
let dataSourceSize = 0;
export default class RefreshListViewComponent extends Component {
  constructor(props) {
    super(props);
    // dataSourceSize = this.props.dataSource._dataBlob.s1.length;
    if (this.props.isLoadMore != null) isLoadMore = this.props.isLoadMore;
    if (this.props.hasMoreData != null) hasMoreData = this.props.hasMoreData;
    this.state = {
      loadingStatu: this.props.loadingStatu == null ? types.ListViewStatus.LOADING : this.props.loadingStatu,
    }
    this._onLoadMore.bind(this);
    this._onRefresh.bind(this);
    this._onRetry.bind(this);
    this._footerView.bind(this);
  }

  componentDidMount() {
    this.props.onRefresh(pageIndex);
  }

  // shouldComponentUpdate(nextProps, nextState) {

  // }

  componentDidUpdate(prevProps, prevState) {
    // if (pageIndex == 1 && dataSourceSize != 0) { dataSourceSize = 0; } else {
    //   dataSourceSize = this.props.dataSource._dataBlob.s1.length;
    // }
    if (this.state.loadingStatu == types.ListViewStatus.LOADING) {
      lastDataSourceSize = dataSourceSize;
      dataSourceSize = 0;
    } else {
      dataSourceSize = this.props.dataSource._dataBlob.s1.length;
    }
    if (this.props.hasMoreData != null) {
      hasMoreData = this.props.hasMoreData
    } else {
      hasMoreData = (this.props.dataSource == null || (dataSourceSize % GlobalConst.PAGE_SIZE != 0)) ? false : true;
      if (dataSourceSize == lastDataSourceSize && dataSourceSize != 0) {
        hasMoreData = false;
      }
    };
    if (this.state.loadingStatu != (this.props.loadingStatu == null ? types.loadingStatu.LOADING : this.props.loadingStatu)) {
      this.setState({ loadingStatu: this.props.loadingStatu });
    }
  }
  render() {
    let contentView;
    if (this.state.loadingStatu === types.ListViewStatus.LOADING) {
      contentView = this._renderLoadingView();
    } else if (this.state.loadingStatu === types.ListViewStatus.ERROR && this.pageIndex != 1) {
      contentView = this._renderErrorView();
    } else {
      contentView = (
        <ListView
          dataSource={this.props.dataSource}
          renderRow={this._renderRow.bind(this)}
          onEndReachedThreshold={30}
          pageSize={10}
          // scrollRenderAheadDistance={500}
          removeClippedSubviews={true}
          onEndReached={isLoadMore ? this._onLoadMore.bind(this) : null}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.diverLine} />}
          renderFooter={isLoadMore ? this._footerView : null}
          renderHeader={this.props.renderHeader == null ? null : () => this.props.renderHeader()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loadingStatu == types.ListViewStatus.LOADING ? true : false}
              onRefresh={this._onRefresh.bind(this)}
              tintColor='#AAAAAA'
              title='下拉刷新'
              progressBackgroundColor='#FFFFFF' />}
          />
      );
    }
    return (
      contentView
    );
  }
  _renderRow(data) {
    return this.props.renderRow(data);
  }
  _renderLoadingView() {
    return (
      <View style={[{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }]}>
        <Image style={styles.gameIcon} source={{ uri: 'loading' }} />
        <Text style={styles.font1_12}>
          正在加载中...
        </Text>
      </View>
    );
  }

  _renderErrorView() {
    if (hasMoreData) {
      return null;
    }
    return (
      <View style={[{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }]}>
        <Text style={styles.errorTipsText}>
          加载失败了喔！
        </Text>
        <OvalButtonComp onPress={this._onRetry.bind(this)}>重试</OvalButtonComp>
      </View>
    );
  }


  /**
   * 加载失败后重试
   */
  _onRetry() {
    this._onRefresh();
  }

  /**
   * 下拉刷新
   */
  _onRefresh() {
    if (this.state.loadingStatu == types.ListViewStatus.LOADING) {
      return;
    }
    pageIndex = 1;
    this.setState({ loadingStatu: types.ListViewStatus.LOADING });
    this.props.onRefresh(pageIndex);
  }

  /**
   * 加载更多
   */
  _onLoadMore() {
    if (this.state.loadingStatu == types.ListViewStatus.LOADINGMORE) {
      return;
    }
    if (!hasMoreData) {
      return;
    }
    // if (pageIndex == 1) { pageIndex = 2 } else {
    pageIndex = dataSourceSize / GlobalConst.PAGE_SIZE + 1;
    // }
    this.setState({ loadingStatu: types.ListViewStatus.LOADINGMORE });
    // 延迟1秒再调用数据
    this.props.onLoadMore(pageIndex);
  }

  _footerView() {
    // console.log(5 + "=" + this.props.loadingStatu + "=" + hasMoreData + "=" + this.props.dataSource._dataBlob.s1.length);
    if (!hasMoreData) return (
      <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={{ marginLeft: 5, textAlign: 'center', textAlignVertical: 'center' }}>
          没有更多数据...
        </Text>
      </View>);
    return (
      <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center' }}>
        <ActivityIndicator styleAttr="Small" />
        <Text style={{ marginLeft: 5, textAlign: 'center', textAlignVertical: 'center' }}>
          正在加载中...
        </Text>
      </View>
    );
  }

  _onItemViewPress(gankData) {
    this.props.navigator.push({
      component: WebViewPage,
      title: gankData.desc,
      url: gankData.url,
    });
  }

  _renderItem(gankData) {
    return (
      <CommonTouchableComp onPress={this._onItemViewPress.bind(this, gankData)}>
        <View style={styles.itemViewContainer}>
          <Text style={styles.title} numberOfLines={2}>{gankData.desc}</Text>
          <View style={styles.line2ItemViewContainer}>
            <Text style={styles.author}>{typeof gankData.who !== 'undefined' && gankData.who !== null ? 'via：' + gankData.who : ''}</Text>
            <Text style={styles.time}>{this._formatTime(gankData.publishedAt)}</Text>
          </View>
        </View>
      </CommonTouchableComp>
    );
  }

  _formatTime(time) {
    let date = new Date(time);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

}
