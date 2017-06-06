
import React from 'react'
import { View, Text, AlertIOS, ToastAndroid, Platform, StatusBar, TouchableOpacity, Image, ListView, scrollv } from 'react-native';
import * as types from '../values/types.js'
import styles from '../values/styles.js'
import colors from '../values/colors.js'
import fonts from '../values/fonts.js'
import AndroidImage from '../widgets/AndroidImage.js'
import ProgressButton from '../widgets/ProgressButton.js'
import *as Screen from '../tools/Screen.js'
import MoreItem from '../widgets/MoreItem.js'
export function createView(data) {
  if (data == null || data.items == null || data.items.length == 0) return null;
  let topBanner = renderTopBanner(data.top_banner);
  let content;
  let bottomBanner;
  let moreBanner = rendetMoreBanner(data.bottom_banner);;
  switch (data.show_type) {
    case 500:
      switch (data.subshow_type) {
        case types.CardViewType.TYPE_01:
          if (data.total_num == 1) {
            content = data.items == null || data.items.length == 0 ? null : renderRecommendGames(data.items.splice(0, 1));
          } else {
            content = data.items == null || data.items.length == 0 ? null : renderRecommendGames(data.items);
          }
          break;
        case types.CardViewType.TYPE_02:
          content = data.items == null || data.items.length == 0 ? null : renderHotGames(data.items);
          break;
        case types.CardViewType.TYPE_03:
          content = data.items == null || data.items.length == 0 ? null : renderActivity(data.items);
          break;
        case types.CardViewType.TYPE_04:
          content = renderBookGames(data.items);
          break;
        default: content = null;
      }
      break;
    case 100:
      switch (data.subshow_type) {
        case types.CardViewType.TYPE_01:
          content = renderVrType01(data.items);
          break;
        default: break;

      }
    default: break;
  }
  return (<View style={styles.cardRootView}>
    {topBanner}
    {content}
    {bottomBanner}
    {moreBanner}
    <View style={styles.bigSpace} />
  </View>)
}
function rendetMoreBanner(data) {
  if (data == null || data.item_list == null || data.item_list.length == 0) return null;
  return (<MoreItem />);
}
function renderTopBanner(data) {
  if (data == null) return null;
  let returnView;
  if (data.item_list != null) {
    returnView = <View style={{ backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center' }}>
      <Text style={[styles.font1_14, { flex: 1, padding: 10 }]} >{data.card_name}</Text>
      {data.item_list == null || data.item_list.length == 0 || data.item_list[0].click_event == null || data.item_list[0].click_event.txt == null ? null :
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.font2_12, { alignSelf: 'center' }]} >{data.item_list[0].click_event.txt}</Text>
          <Image style={[styles.minimumIcon, { marginRight: 10, marginLeft: 2 }]} source={{ uri: 'card_top_banner_operation_arrow_normal' }} />
        </TouchableOpacity>}
    </View>
  } else {
    returnView = <Text style={[styles.font1_14, { backgroundColor: colors.white, padding: 10 }]} >{data.card_name}</Text>
  }
  return (<View>
    {returnView}
    <View style={styles.diverLine} />
  </View>)
}
function renderVrType01(data) {
  if (data == null) return null;
  return <View style={{ width: Screen.getScreenWidth(), height: Screen.getScreenWidth() / 3 }}>
    <AndroidImage style={{ flex: 1 }} img={data[0].img} />
    {data[0].meta == null || data[0].meta.length == 0 ? null :
      <Text style={{ position: 'absolute', paddingLeft: 5, top: Screen.getScreenWidth() / 3 - 18, width: Screen.getScreenWidth(), fontSize: fonts.font12, color: colors.white, backgroundColor: colors.translatehalf}}>{data[0].meta[0].text}</Text>}
  </View>
}
function renderListGames(data) {

}
function renderActivity(data) {
  return <View style={{ flexDirection: 'row', backgroundColor: colors.white, paddingTop: 5, paddingBottom: 5 }}>
    <AndroidImage style={{ width: (Screen.getScreenWidth() - 5) / 2, height: (Screen.getScreenWidth() - 5) / 2 + 5 }} img={data != null && data.length > 0 ? data[0].img : null} />
    <View style={{ marginLeft: 5 }}>
      <AndroidImage style={{ width: (Screen.getScreenWidth() - 5) / 2, height: (Screen.getScreenWidth() - 5) / 4 }} img={data != null && data.length > 1 ? data[1].img : null} />
      <AndroidImage style={{ marginTop: 5, width: (Screen.getScreenWidth() - 5) / 2, height: (Screen.getScreenWidth() - 5) / 4 }} img={data != null && data.length > 2 ? data[2].img : null} />
    </View>
  </View>
}
function renderBookGames(data) {
  if (data == null || data.length == 0) return null;
  return <View style={{ flexDirection: 'row', marginLeft: 5, marginRight: 5, marginBottom: 5 }}>
    {renderBookGameItem(data[0], 0)}
    {data.length > 1 ? <View style={{ marginLeft: 5 }}>{renderBookGameItem(data[1], 1)}</View> : null}
  </View>
}
function renderBookGameItem(data, rowID) {
  if (data == null) return null;
  return <View style={{ flex: 1, borderWidth: 0.5, borderColor: colors.diverLine, }} key={rowID}>
    <AndroidImage style={{ width: (Screen.getScreenWidth() - 15) / 2, height: 144 / 305 * (Screen.getScreenWidth() - 15) / 2 }} img={data.img} />
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5, paddingRight: 5, paddingTop: 8, paddingBottom: 8 }}>
      <Text style={[styles.font1_14, { flex: 1 }]}>
        {data.other.name}
      </Text>
      <ProgressButton data={data.other} />
    </View >
  </View >
}
function renderRecommendGames(data) {
  if (data == null || data.length == 0) return null;
  data.map((o, i) => {
    data[i]["isRecommend"] = data.length == 1 ? true : false;
  })
  return (data.map(renderGamesItem));
}
function renderGamesItem(data1, rowID) {
  let data = data1.other;
  return <View key={rowID} style={{ flexDirection: 'row', backgroundColor: colors.white }}>
    <AndroidImage style={[styles.gameIcon, { margin: 10 }]} img={data.icon} />
    {data1.isRecommend ? <AndroidImage style={{ position: 'absolute', left: -10, top: -10, width: 70, height: 70, resizeMode: Image.resizeMode.center }} img='corner_recom' /> : null}
    {data.has_card == 1 ? <AndroidImage style={{ position: 'absolute', left: 60, top: 0, width: 20, height: 20, resizeMode: Image.resizeMode.conver }} img='gif_icon' /> : null}
    <View style={{ flex: 1, marginLeft: 5, alignSelf: 'center' }}>
      {<Text style={[styles.font1_14, {}]} >{data.name + (data.app_subname == null || data.app_subname == '' ? '' : '(' + data.app_subname + ')')}</Text>}
      <View style={{ flexDirection: 'row', paddingTop: 5 }}>
        <Text style={[styles.tag, {}]} >{data.cate_name}</Text>
        <Text style={[styles.font2_12, { marginLeft: 3 }]} >{data.cnt + '下载 ' + data.size}</Text>
      </View>
      <Text style={[styles.font2_12, { marginTop: 3 }]} >{data.slogan}</Text>
    </View>
    <ProgressButton style={{ alignSelf: 'center', marginRight: 10 }} />
  </View>
}
function renderHotGames(data) {
  if (data == null || data.length == 0) return;
  let array0 = [];
  let array1 = [];
  if (data.length <= 4) {
    array0 = data.slice(0, data.length);
  } else {
    array0 = data.slice(0, 4);
    array1 = data.slice(4, data.length);
  }

  return <View style={{ paddingLeft: 10, paddingRight: 10 }}>
    <View style={{ flexDirection: 'row' }}>
      {array0.length > 0 ? array0.map(renderHotGameItem) : null}
    </View>
    {array1 != null && array1.length > 0 ?
      <View>
        <View style={[styles.diverLine, { marginTop: 3, marginBottom: 3 }]} />
        <View style={{ flexDirection: 'row' }}>
          {array1.map(renderHotGameItem)}
        </View>
      </View>
      : null
    }
  </View >
}

function renderHotGameItem(data, rowID) {
  return (<View style={{ width: (Screen.getScreenWidth() - 20) / 4, height: 135, alignItems: 'center', marginTop: 5, marginBottom: 3 }} key={rowID}>
    <AndroidImage style={styles.gameIcon} img={data.other.icon} />
    <Text numberOfLines={1} style={[styles.font1_14, { marginTop: 3 }]} >{data.other.name}</Text>
    <Text numberOfLines={1} style={[styles.font2_12, { marginTop: 3 }]} >{data.other.cate_name + ' ' + data.other.size}</Text>
    <ProgressButton style={{ marginTop: 3, alignSelf: 'center', }} data={data.other} />
  </View>);
}


