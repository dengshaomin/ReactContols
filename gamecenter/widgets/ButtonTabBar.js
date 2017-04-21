
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
    }

    setAnimationValue({ value }) {
        console.log(value);
    }

    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    renderTabOption(tab, i) {
        let color = this.props.activeTab == i ? colors.white : colors.green; // 判断i是否是当前选中的tab，设置不同的颜色
        const backgroundColor = this.props.activeTab == i ? colors.green : colors.white;
        return (
            <TouchableOpacity key={i} onPress={() => this.props.goToPage(i)} style={thisstyles.tab}>
                <Text style={[thisstyles.tabItem, { color: color, fontSize: fonts.font11, backgroundColor: backgroundColor }]}>
                    {this.props.tabNames[i]}
                </Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View>
                <View style={thisstyles.tabs}>
                    {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
                </View>
                <View style={styles.diverLine} />
            </View>
        );
    }
}

const thisstyles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },

    tab: {
        justifyContent: 'center',
        alignItems: 'center',

    },

    tabItem: {
        fontSize: fonts.font13,
        paddingTop: 5, paddingBottom: 5, paddingLeft: 15, paddingRight: 15,
        textAlign: 'center',
        borderColor: colors.green, borderWidth: 1,
    },
});


export default WeixinTabBar;