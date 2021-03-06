
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import colors from '../values/colors';
import fonts from '../values/fonts';
import styles from '../values/styles'

class WeixinTabBar extends Component {

    static propTypes = {
        goToPage: React.PropTypes.func, // 跳转到对应tab的方法
        activeTab: React.PropTypes.number, // 当前被选中的tab下标
        tabs: React.PropTypes.array, // 所有tabs集合

        tabNames: React.PropTypes.array, // 保存Tab名称
        tabIconNames: React.PropTypes.array, // 保存Tab图标
        unTabIconNames: React.PropTypes.array, // 未选中Tab图标
    }

    setAnimationValue({ value }) {
        console.log(value);
    }

    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    renderTabOption(tab, i) {
        let color = this.props.activeTab == i ? colors.green : colors.font1; // 判断i是否是当前选中的tab，设置不同的颜色
        return (
            <TouchableOpacity onPress={() => this.props.goToPage(i)} style={thisstyles.tab}>
                <View style={thisstyles.tabItem}>
                    <Image color={color} style={styles.buttonIcon} source={{ uri: this.props.activeTab == i ? this.props.tabIconNames[i] : this.props.unTabIconNames[i] }} />
                    <Text style={{ color: color, fontSize: fonts.font11 }}>
                        {this.props.tabNames[i]}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={thisstyles.tabs}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }
}

const thisstyles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    tab: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100, height: 50
    },

    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },
});


export default WeixinTabBar;