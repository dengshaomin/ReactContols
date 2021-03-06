import React, { Component, PureComponent, PropTypes } from 'react';
import {
  StyleSheet,
  ListView,
  RefreshControl,
  Text,
  ActivityIndicator,
  View, Image, InteractionManager
} from 'react-native';
import * as types from '../values/types'
import styles from '../values/styles'
import colors from '../values/colors.js'
import OvalButtonComp from '../widgets/OvalButtonComp.js'
import * as GlobalConst from '../GlobalConst.js'
import LongGameItem from '../widgets/LongGameItem.js'
import AndroidImage from '../widgets/AndroidImage.js'
import PureRenderMixin from 'react-addons-pure-render-mixin';
export default class RefreshListViewComponent extends PureComponent {
  static PropTypes = {
    renderSeparator: PropTypes.bool
  }
  static defaultPropTypes = {
    renderSeparator: true
  }
  constructor(props) {
    super(props);
    this.isLoadMore = true;
    this.pageIndex = 1;
    this.isLoadMore = true;
    this.hasMoreData = true;
    this.lastDataSourceSize = 0;
    this.dataSourceSize = 0;
    // dataSourceSize = this.props.dataSource._dataBlob.s1.length;
    if (this.props.isLoadMore != null) this.isLoadMore = this.props.isLoadMore;
    if (this.props.hasMoreData != null) this.hasMoreData = this.props.hasMoreData;
    this.state = {
      loadingStatu: this.props.loadingStatu == null ? types.ListViewStatus.LOADING : this.props.loadingStatu,
    }
    this._onLoadMore.bind(this);
    this._onRefresh.bind(this);
    this._onRetry.bind(this);
    this._footerView.bind(this);
    // this._hasMoreData.bind(this);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.onRefresh(this.pageIndex);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
  }

  componentDidUpdate(prevProps, prevState) {
    // if (pageIndex == 1 && dataSourceSize != 0) { dataSourceSize = 0; } else {
    //   dataSourceSize = this.props.dataSource._dataBlob.s1.length;
    // }
    // if (this.props.dataSource != null && this.props.dataSource._dataBlob != null && this.props.dataSource._dataBlob.s1 != null) {
    //   this.dataSourceSize = this.props.dataSource._dataBlob.s1.length;
    // }
    // hasMoreData = this._hasMoreData();
    // lastDataSourceSize = dataSourceSize;
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
          initialListSize={5}
          showsVerticalScrollIndicator={false}
          // scrollRenderAheadDistance={500}
          removeClippedSubviews={true}
          onEndReached={this.isLoadMore ? this._onLoadMore.bind(this) : null}
          renderSeparator={!this.props.renderSeparator ? null : (sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.diverLine} />}
          renderFooter={this.isLoadMore ? this._footerView.bind(this) : null}
          renderHeader={this.props.renderHeader == null ? null : () => this.props.renderHeader()}
          contentContainerStyle={this.props.contentContainerStyle == null ? null : this.props.contentContainerStyle}
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
  _hasMoreData() {
    if (this.props.dataSource != null && this.props.dataSource._dataBlob != null && this.props.dataSource._dataBlob.s1 != null) {
      this.dataSourceSize = this.props.dataSource._dataBlob.s1.length;
    }
    if (this.state.loadingStatu == types.ListViewStatus.LOADING) {
      this.dataSourceSize = 0;
      return true;
    } else {
      if (this.props.hasMoreData != null) {
        return this.props.hasMoreData
      } else {
        if (this.dataSourceSize == this.lastDataSourceSize && this.dataSourceSize != 0) {
          return false;
        }
        return (this.props.dataSource == null || (this.dataSourceSize % GlobalConst.PAGE_SIZE == 0)) ? true : false;
      };
    }
  }
  _renderRow(data, sectionID, rowID) {
    return this.props.renderRow(data, rowID);
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
    if (this._hasMoreData()) {
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
    // if (this.state.loadingStatu == types.ListViewStatus.LOADING) {
    //   return;
    // }
    this.pageIndex = 1;
    this.setState({ loadingStatu: types.ListViewStatus.LOADING });
    this.timer = setTimeout(() => {
      if (this.props.onRefresh != null)
        this.props.onRefresh(this.pageIndex);
    }, 500);
  }

  /**
   * 加载更多
   */
  _onLoadMore() {
    if (this.state.loadingStatu == types.ListViewStatus.LOADINGMORE) {
      return;
    }
    if (!this._hasMoreData()) {
      return;
    }
    // if (pageIndex == 1) { pageIndex = 2 } else {
    this.pageIndex = this.dataSourceSize / GlobalConst.PAGE_SIZE + 1;
    // }
    this.setState({ loadingStatu: types.ListViewStatus.LOADINGMORE });
    // 延迟1秒再调用数据
    this.props.onLoadMore(this.pageIndex);
  }
  _footerView() {
    if (!this._hasMoreData()) return (
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
