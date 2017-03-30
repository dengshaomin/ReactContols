import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  RefreshControl,
  Text,
  ProgressBarAndroid as ProgressBar,
  View, Image,
} from 'react-native';
import * as types from '../values/types'
import styles from '../values/styles'
import colors from '../values/colors.js'
import OvalButtonComp from '../widgets/OvalButtonComp.js'
import * as GlobalConst from '../GlobalConst.js'
import LongGameItem from '../widgets/LongGameItem.js'
import AndroidImage from '../widgets/AndroidImage.js'
var pageIndex = 1;
export default class RefreshListViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatu: this.props.loadingStatu == null ? types.ListViewStatus.LOADING : this.props.loadingStatu,
    }
    this._onLoadMore.bind(this);
    this._onRefresh.bind(this);
    this._onRetry.bind(this);
  }

  componentDidMount() {
    this.props.onRefresh(pageIndex);
  }

  // shouldComponentUpdate(nextProps, nextState) {

  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loadingStatu != this.props.loadingStatu) {
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
          onEndReachedThreshold={5}
          // scrollRenderAheadDistance={500}
          removeClippedSubviews={true}
          onEndReached={this.props.isLoadMore ? this._onLoadMore.bind(this) : null}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.diverLine} />}
          renderFooter={this.props.isLoadMore ? this._footerView : null}
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
    this.setState({ loadingStatu: types.ListViewStatus.LOADING });
    this.props.onRefresh(1);
  }

  /**
   * 加载更多
   */
  _onLoadMore() {
    if (this.state.loadingStatu == types.ListViewStatus.LOADINGMORE) {
      return;
    }
    if (this.props.dataSource.lenght / GlobalConst.PAGE_SIZE != 0) {
      return;
    }
    tthis.setState({ loadingStatu: types.ListViewStatus.LOADINGMORE });
    // 延迟1秒再调用数据
    setTimeout(() => {
      this.props.onLoadMore(this.props.dataSource.lenght / GlobalConst.PAGE_SIZE);
    }, 0)
  }

  _footerView() {
    return (
      <View >
        <ProgressBar styleAttr="Small" />
        <Text>
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
