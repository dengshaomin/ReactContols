/**
 * 干货列表组件
 *    1. 干货列表（使用ListView）
 * Created by iWgang on 16/05/22.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  RefreshControl,
  Text,
  View,
  ProgressBarAndroid as ProgressBar,
} from 'react-native';
import { connect } from 'react-redux';

import WebViewPage from '../WebViewPage';
import CommonTouchableComp from '../../comp/CommonTouchableComp';
import CommonLoadView from '../../comp/CommonLoadView';
import { FETCH_GANK_DATA_STATUS } from '../../actions/types';
import { fetchGankList } from '../../actions/gankApi';
import { showToast } from '../../comp/CommonComp';
import { COMMON_BACKGROUND_COLOR } from '../../GlobalConst';
import LongGameItem from '../../../../gamecenter/widgets/LongGameItem.js'

class GankListComp extends Component {

  constructor(props) {
    super(props);

    this.category = this.props.category;
    this.tagName = this.props.tagName;
    this.curPageNo = 1;
    this.isLoadMoreing = false;
    this.onRetry = this._onRetry.bind(this);
    this.dataSource = [];
  }

  componentDidMount() {
    this._fetchData(0);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.tagName !== nextProps.ext) return false;

    if (nextProps.status === FETCH_GANK_DATA_STATUS.START) {
      return false;
    } else if (nextProps.status === FETCH_GANK_DATA_STATUS.FAILURE) {
      if (nextProps.opt === 1) {
        // 下拉刷新失败
        showToast('刷新数据失败了...');
        return false;
      } else if (nextProps.opt === 2) {
        // 加载更多失败
        showToast('加载更多数据失败了...');
        this.curPageNo
        this.isLoadMoreing = false;
        return false;
      }
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    // 处理加载更多操作时，在数据加载完成并渲染完界面后，将加载更多的状态重置
    if (prevProps.opt === 2) {
      this.isLoadMoreing = false;
    }
  }

  render() {
    let contentView;
    let s = '{"callback":null,"title":"最新上线","finished":false,"list":[{"no":0,"qipu_id":212150020,"game_id":5826,"name":"御史大冒险","link":"http://cdn.data.video.iqiyi.com/cdn/ppsgame/20170418/upload/unite/iqiyi/android/ysdmx/ysdmx0418.apk","cate_name":"角色扮演","icon":"http://static.g.iqiyi.com/images/open/20170112/5877371932708.png","slogan":"放置类精品单机手游","type":"2","tag":"","game_type":"2","cnt":"2462","size":"115M","ext":"yesterday","has_card":0,"has_activity":0,"l_size":120586240,"packagename":"com.tencent.tmgp.ysdr","version":"1.0.4.3","ver_code":1,"apkmd5":null,"recom_type":null,"category_id":5,"price":null,"app_subname":"","autoDownload":0,"downloadStatus":0,"flag":0,"num":null,"down_load_card_id":0,"orientation":null,"h5_detail_page":null},{"no":0,"qipu_id":212149820,"game_id":5865,"name":"王者荣耀","link":"http://cdn.data.video.iqiyi.com/cdn/ppsgame/20170418/upload/unite/iqiyi/android/wzry/wzry0418.apk","cate_name":"角色扮演","icon":"http://static.g.iqiyi.com/images/open/20170414/58f031cd7c504.png","slogan":"5V5英雄公平对战手游","type":"2","tag":"","game_type":"2","cnt":"2.4万","size":"408M","ext":"yesterday","has_card":0,"has_activity":0,"l_size":427819008,"packagename":"com.tencent.tmgp.sgame","version":"1.18.1.7","ver_code":1,"apkmd5":null,"recom_type":null,"category_id":5,"price":null,"app_subname":"","autoDownload":0,"downloadStatus":0,"flag":0,"num":null,"down_load_card_id":0,"orientation":null,"h5_detail_page":null},{"no":0,"qipu_id":212146220,"game_id":5809,"name":"元气骑士","link":"http://cdn.data.video.iqiyi.com/cdn/ppsgame/20170417/upload/unite/game/20170417/yqqs_iqiyilist_6.apk","cate_name":"休闲益智","icon":"http://static.g.iqiyi.com/images/open/20170329/58db4e1ec99d6.png","slogan":"你一直渴望的那个游戏","type":"2","tag":"","game_type":"2","cnt":"1996","size":"33M","ext":"yesterday","has_card":1,"has_activity":0,"l_size":34603008,"packagename":"com.knight.union.iqiyi","version":"1.2.3","ver_code":196,"apkmd5":"799bf7978514d9dd31f9b21839d80d94","recom_type":null,"category_id":1,"price":null,"app_subname":"","autoDownload":0,"downloadStatus":0,"flag":0,"num":null,"down_load_card_id":0,"orientation":null,"h5_detail_page":null},{"no":0,"qipu_id":212146020,"game_id":5301,"name":"名侦探柯南-纯黑的噩梦","link":"http://cdn.data.video.iqiyi.com/cdn/ppsgame/20170417/upload/unite/game/20170417/chdem_iqiyilist_4.apk","cate_name":"角色扮演","icon":"http://static.g.iqiyi.com/images/open/201704/58f47f2e5d263.png","slogan":"正版授权柯南手游","type":"2","tag":"","game_type":"2","cnt":"5643","size":"140M","ext":"yesterday","has_card":1,"has_activity":0,"l_size":146800640,"packagename":"com.romanlife.conan.iqiyi","version":"1.5.7","ver_code":10020,"apkmd5":"7d133dbfbd197f6649469b091cf71867","recom_type":null,"category_id":5,"price":null,"app_subname":"","autoDownload":0,"downloadStatus":0,"flag":0,"num":null,"down_load_card_id":0,"orientation":null,"h5_detail_page":null},{"no":0,"qipu_id":212131220,"game_id":5811,"name":"孤胆枪手之杀出重围","link":"http://cdn.data.video.iqiyi.com/cdn/ppsgame/20170410/upload/unite/single/20170410/0f28e1f36b2f575b79fcae2a517c1cca_1491790971_1.apk","cate_name":"飞行射击","icon":"http://static.g.iqiyi.com/images/open/201704/58ede282555f2.png","slogan":"够胆就来","type":"2","tag":"","game_type":"3","cnt":"1242","size":"34M","ext":"ago","has_card":0,"has_activity":0,"l_size":35651584,"packagename":"com.younigames.monster.Main.iqiyi","version":"2.0.0","ver_code":200,"apkmd5":"0f28e1f36b2f575b79fcae2a517c1cca","recom_type":null,"category_id":3,"price":null,"app_subname":"","autoDownload":0,"downloadStatus":0,"flag":0,"num":null,"down_load_card_id":0,"orientation":null,"h5_detail_page":null},{"no":0,"qipu_id":212136820,"game_id":5768,"name":"开心超人车神宝贝","link":"http://cdn.data.video.iqiyi.com/cdn/ppsgame/20170410/upload/unite/single/20170410/21e41e2519acba51a20eb9fd458b4291_1491797466_1.apk","cate_name":"体育竞速","icon":"http://static.g.iqiyi.com/images/single/icon/201704/58f5f56fbab40.png","slogan":"够激情，勇夺冠军！","type":"2","tag":"","game_type":"3","cnt":"7095","size":"38M","ext":"ago","has_card":0,"has_activity":0,"l_size":39845888,"packagename":"com.youmeng.cheshenbaobei.iqiyi","version":"1.3.16","ver_code":3,"apkmd5":"21e41e2519acba51a20eb9fd458b4291","recom_type":null,"category_id":6,"price":null,"app_subname":"","autoDownload":0,"downloadStatus":0,"flag":0,"num":null,"down_load_card_id":0,"orientation":null,"h5_detail_page":null},{"no":0,"qipu_id":212136620,"game_id":5756,"name":"速度与激情8","link":"http://cdn.data.video.iqiyi.com/cdn/ppsgame/20170410/upload/unite/single/20170410/21d5cb56c69b11dabcd5706062aaeb37_1491789660_1.apk","cate_name":"体育竞速","icon":"http://static.g.iqiyi.com/images/open/201704/58ec8e09b9090.png","slogan":"手机上的大片儿","type":"2","tag":"","game_type":"3","cnt":"1523","size":"80M","ext":"ago","has_card":0,"has_activity":0,"l_size":83886080,"packagename":"com.hzfb.racing8.iqiyi","version":"1.09","ver_code":109,"apkmd5":"21d5cb56c69b11dabcd5706062aaeb37","recom_type":null,"category_id":6,"price":null,"app_subname":"","autoDownload":0,"downloadStatus":0,"flag":0,"num":null,"down_load_card_id":0,"orientation":null,"h5_detail_page":null},{"no":0,"qipu_id":212136420,"game_id":5610,"name":"行侠仗义五千年","link":"http://cdn.data.video.iqiyi.com/cdn/ppsgame/20170411/upload/unite/game/20170411/xxzywqn_iqiyilist_9.apk","cate_name":"动作冒险","icon":"http://static.g.iqiyi.com/images/open/201704/58edcdbe72692.png","slogan":"经典纯正格斗手游","type":"2","tag":"","game_type":"2","cnt":"698","size":"85M","ext":"ago","has_card":0,"has_activity":0,"l_size":89128960,"packagename":"com.xuegao.fighting.iqiyi","version":"1.0.4","ver_code":104,"apkmd5":"3e3186e6f602688ec63720c2535ccc6a","recom_type":null,"category_id":2,"price":null,"app_subname":"","autoDownload":0,"downloadStatus":0,"flag":0,"num":null,"down_load_card_id":0,"orientation":null,"h5_detail_page":null},{"no":0,"qipu_id":212131020,"game_id":5817,"name":"冒险佣兵团","link":"http://cdn.data.video.iqiyi.com/cdn/ppsgame/20170410/upload/unite/single/20170410/b808c89d350c79051015cf75201a53e1_1491811994_1.apk","cate_name":"动作冒险","icon":"http://static.g.iqiyi.com/images/open/201704/58ede18c870f1.png","slogan":"守护你的世界","type":"2","tag":"","game_type":"3","cnt":"3076","size":"55M","ext":"ago","has_card":0,"has_activity":0,"l_size":57671680,"packagename":"com.mxybt.zhangzu.aiqiyi","version":"1.0","ver_code":1,"apkmd5":"b808c89d350c79051015cf75201a53e1","recom_type":null,"category_id":2,"price":null,"app_subname":"","autoDownload":0,"downloadStatus":0,"flag":0,"num":null,"down_load_card_id":0,"orientation":null,"h5_detail_page":null},{"no":0,"qipu_id":212128920,"game_id":5822,"name":"贪食蛇大作战","link":"http://cdn.data.video.iqiyi.com/cdn/ppsgame/20170401/upload/unite/single/20170401/6f58318fdaec9a583e37cefff4d78381_1491012592_1.apk","cate_name":"休闲益智","icon":"http://static.g.iqiyi.com/images/open/20170331/58de2f5dd5803.png","slogan":"劲爆的竞技体验","type":"2","tag":"","game_type":"3","cnt":"1523","size":"5M","ext":"ago","has_card":0,"has_activity":0,"l_size":5242880,"packagename":"com.tssdzz.game.iqiyi","version":"1.1.3","ver_code":20170330,"apkmd5":"6f58318fdaec9a583e37cefff4d78381","recom_type":null,"category_id":1,"price":null,"app_subname":"","autoDownload":0,"downloadStatus":0,"flag":0,"num":null,"down_load_card_id":0,"orientation":null,"h5_detail_page":null}],"code":"A00000","page":1}';
    this.dataSource.push(...JSON.parse(s).list);
    if (this.props.status === FETCH_GANK_DATA_STATUS.INITIALIZE) {
      contentView = <CommonLoadView loadState="ing" />;
    } else if (this.props.status === FETCH_GANK_DATA_STATUS.FAILURE) {
      contentView = <CommonLoadView loadState="error" onRetry={this.onRetry} />;
    } else {
      contentView = (
        <ListView
          dataSource={this.props.dataSource}
          renderRow={this._renderItem.bind(this)}
          automaticallyAdjustContentInsets={false}
          onEndReachedThreshold={5}
          onEndReached={this.props.isLoadMore ? this._onLoadMore.bind(this) : null}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
          renderFooter={this.props.isLoadMore ? this._footerView : null}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor='#AAAAAA'
              title='下拉刷新'
              progressBackgroundColor='#FFFFFF' />}
        />
      );
    }
    return (
      <View style={styles.container}>
        {contentView}
      </View>
    );
  }

  /**
   * 加载干货列表数据
   */
  _fetchData(opt) {
    this.curPageNo = opt !== 2 ? 1 : (this.curPageNo + 1);
    this.props.dispatch(fetchGankList(opt, this.category, this.curPageNo, this.tagName));
  }

  /**
   * 加载失败后重试
   */
  _onRetry() {
    this.props.dispatch({ type: FETCH_GANK_DATA_STATUS.INITIALIZE, ext: this.tagName });
    // 延迟2秒再调用数据
    setTimeout(() => {
      this._fetchData(0);
    }, 2000)
  }

  /**
   * 下拉刷新
   */
  _onRefresh() {
    this._fetchData(1);
  }

  /**
   * 加载更多
   */
  _onLoadMore() {
    if (this.isLoadMoreing) {
      return;
    }

    this.isLoadMoreing = true;

    // 延迟1秒再调用数据
    setTimeout(() => {
      this._fetchData(2);
    }, 1000)
  }

  _footerView() {
    return (
      <View style={styles.footerContainer}>
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

  _renderItem(gankData, sid, id) {
    return (<LongGameItem data={this.dataSource[id]} />);
    /*return (
      <CommonTouchableComp onPress={this._onItemViewPress.bind(this, gankData)}>
        <View style={styles.itemViewContainer}>
          <Text style={styles.title} numberOfLines={2}>{gankData.desc}</Text>
          <View style={styles.line2ItemViewContainer}>
            <Text style={styles.author}>{typeof gankData.who !== 'undefined' && gankData.who !== null ? 'via：' + gankData.who : ''}</Text>
            <Text style={styles.time}>{this._formatTime(gankData.publishedAt)}</Text>
          </View>
        </View>
      </CommonTouchableComp>
    );*/
  }

  _formatTime(time) {
    let date = new Date(time);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COMMON_BACKGROUND_COLOR,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemViewContainer: {
    padding: 10,
  },
  line2ItemViewContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000000',
  },
  author: {
    flex: 1,
    fontSize: 14,
    color: '#999999',
  },
  time: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
  },
});

function select(store) {
  return {
    status: store.gankListCompStore.status,
    dataSource: store.gankListCompStore.dataSource,
    isRefreshing: store.gankListCompStore.isRefreshing,
    isLoadMore: store.gankListCompStore.isLoadMore,
    opt: store.gankListCompStore.opt,
    ext: store.gankListCompStore.ext,
  }
}

export default connect(select)(GankListComp);