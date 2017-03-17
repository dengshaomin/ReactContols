'use strict'

import React from 'react';
import{
    View,
    StyleSheet,
    PropTypes
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import applicationActions from '../actions/application'
import gameActions from '../actions/game'
import playerActions from '../actions/player'
import teamActions from '../actions/team'

import Game from './Game'
import Player from './Player'
import Team from './Team'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tab: 'game'
        }
    }

    componentWillReceiveProps(props) {
        const {application} = props
        this.setState({
            tab: application.tab
        })
    }

    render() {
        const {tab} = this.state
        const {game, player, team, gameActions, playerActions, teamActions} = this.props

        return (
            <View style={styles.container}>
                {tab === 'game' &&
                <Game {...game} actions={gameActions}/>
                }
                {tab === 'players' &&
                <Player {...player} actions={playerActions}/>
                }
                {tab === 'teams' &&
                <Team {...team} actions={teamActions}/>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

App.propTypes = {
    game: React.PropTypes.object,
    player: React.PropTypes.object,
    team: React.PropTypes.object,
    gameActions: React.PropTypes.object,
    playerActions: React.PropTypes.object,
    teamActions: React.PropTypes.object
}

export default  connect(state => {
    return {
        application: state.application,
        game: {
            live: state.live,
            over: state.over,
            unstart: state.unstart,
            standing: state.standing,
            application: state.application
        },
        player: {
            playerList: state.playerList,
            playerLoaded: state.playerLoaded
        },
        team: {
            team: state.team,
            playerLoaded: state.playerLoaded
        }
    }
}, dispatch => {
    return {
        gameActions: bindActionCreators(Object.assign({}, applicationActions, gameActions), dispatch),
        playerActions: bindActionCreators(Object.assign({}, applicationActions, playerActions), dispatch),
        teamActions: bindActionCreators(Object.assign({}, applicationActions, playerActions, teamActions), dispatch)
    }
})(App)
