import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewPagerAndroid,
    ToolbarAndroid,
    Animated, Image
} from 'react-native';
import colors from '../values/colors';
import fonts from '../values/fonts';
import styles from '../values/styles'
import AndroidImage from '../widgets/AndroidImage'
import * as GlobalConst from '../GlobalConst'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
var thstyles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    tabs: {
        height: 49,
        flexDirection: 'row',
        paddingTop: 5,
        borderTopWidth: 0.5,
        borderTopColor: colors.diverLine,
    },
    icon: {

    },
});

class FacebookTabBar extends React.Component {
    static propTypes = {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        tabNames: React.PropTypes.array, // 保存Tab名称
        tabIconNames: React.PropTypes.array, // 保存Tab图标
        unTabIconNames: React.PropTypes.array, // 未选中Tab图标
    }

    renderTabOption(name, page) {
        console.log(this.props.tabNames[page]);
        var isTabActive = this.props.activeTab === page;
        const color = isTabActive ? colors.green : colors.font2;
        const source = isTabActive ? { uri: this.props.tabIconNames[page] } : { uri: this.props.unTabIconNames[page] };
        return (
            <TouchableOpacity
                key={this.props.tabNames[page]}
                onPress={() => this.props.goToPage(page)}
                style={thstyles.tab}>
                <View
                    style={thstyles.tabItem}
                >
                    <Image style={styles.miniIcon} source={source} />
                    <Text style={[thstyles.icon, { color: color }]}>
                        {this.props.tabNames[page]}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    componentDidMount() {
        // this.setAnimationValue({value: this.props.activeTab});
        // this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
    }

    setAnimationValue({ value }) {
        var currentPage = this.props.activeTab;

        this.unselectedTabIcons.forEach((icon, i) => {
            var iconRef = icon;

            if (!icon.setNativeProps && icon !== null) {
                iconRef = icon.refs.icon_image
            }

            if (value - i >= 0 && value - i <= 1) {
                iconRef.setNativeProps({ opacity: value - i });
            }
            if (i - value >= 0 && i - value <= 1) {
                iconRef.setNativeProps({ opacity: i - value });
            }
        });
    }

    render() {
        return (
            <View>
                <View style={styles.tabs}>
                    {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
                </View>
            </View>
        );
    }
};

module.exports = FacebookTabBar;
