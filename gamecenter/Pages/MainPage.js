/**
 * Created by dengshaomin on 2017/2/9.
 */
'use strict';
import React from 'react';
import {
    StatusBar,
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import * as TYPES from '../actions/types';
import { switchTitleBarTab } from '../actions/changeTab'
import { connect } from 'react-redux';
import colors from '../values/colors';
import MineComponent from './MinePage'
import RecommendComponent from './RecommendPage.js'
import WeixinTabBar from '../widgets/WeixinTabBar.js'
import * as Routes from './Routes.js'
class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TabNavigator tabBarStyle={styles.tabBar}>
                    <TabNavigator.Item
                        selected={this.props.selectedTab == TYPES.HOME_TABS.RECOMMEND}
                        title='推荐'
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.tabIcon} source={{ uri: 'icon_recommend' }}
                            />}
                        renderSelectedIcon={() => <Image style={styles.tabIcon} source={{ uri: 'icon_recommend_p' }}
                            />}
                        onPress={this.switchTab.bind(this, TYPES.HOME_TABS.RECOMMEND)}>
                        <RecommendComponent navigator={this.props.navigator}/>
                        {/*Routes.navigator('recommend') 用这个跳转子页面的时候底部导航栏不消失*/} 
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.props.selectedTab == TYPES.HOME_TABS.GIFT}
                        title="福利"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.tabIcon} source={{ uri: 'icon_gift' }}
                            />}
                        renderSelectedIcon={() => <Image style={styles.tabIcon} source={{ uri: 'icon_gift_p' }}
                            />}
                        onPress={this.switchTab.bind(this, TYPES.HOME_TABS.GIFT)}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20 }}>我是第2个选项卡，直接书写出的视图!</Text>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.props.selectedTab == TYPES.HOME_TABS.MINE}
                        title="我的"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.tabIcon} source={{ uri: 'icon_mine' }}
                            />}
                        renderSelectedIcon={() => <Image style={styles.tabIcon} source={{ uri: 'icon_mine_p' }}
                            />}
                        onPress={this.switchTab.bind(this, TYPES.HOME_TABS.MINE)}>
                        <MineComponent navigator={this.props.navigator}/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
    switchTab(selectedTab) {
        if (this.props.selectedTab !== selectedTab) {
            this.props.dispatch(switchTitleBarTab(TYPES.HOME_SWITCH_TAB, selectedTab));
        }
    }
};

var styles = StyleSheet.create({
    tabBar: {
        height: 50,
        backgroundColor: '#eee',
        alignItems: 'center'
    },
    tabText: {
        color: colors.black,
        fontSize: 11
    },
    selectedTabText: {
        color: colors.green,
        fontSize: 11
    },
    tabIcon: {
        width: 25,
        height: 25,
        resizeMode: Image.resizeMode.contain
    }
});
function select(store) {
    return {
        selectedTab: store.mainPageStore.selectedTab,
    }
}

export default connect(select)(MainPage);
