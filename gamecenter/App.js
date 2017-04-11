import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store';
import RootPage from './Pages/RootPage'
const store = configureStore();
import { DEBUG, RDEBUG } from './GlobalConst';
import SplashPage from './SplashPage'
import MainPage from './Pages/MainPage'
global.LOG = (msg) => {
    if (DEBUG) console.log(msg);
}

// Redux相关信息日志
global.RLOG = (msg) => {
    if (DEBUG && RDEBUG) console.log(msg);
}

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShowSplash: false,
        };
    }

    render() {
        if (this.state.isShowSplash) {
            return <SplashPage onAnimEnd={() => this.setState({ isShowSplash: false })} />;
        } else {
            return (
                <Provider store={store}>
                    <RootPage/>
                </Provider>
            );
        }
    }

}
