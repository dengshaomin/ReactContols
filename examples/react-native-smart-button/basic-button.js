/**
 * @fileOverview
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/7/4.
 */

import React, {Component} from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native'

import Button from 'react-native-smart-button'
import image_liking from '../images/liking.png'

export default class BasicButton extends Component {

  render() {
    return (
      <ScrollView style={{flex: 1, marginTop: 20 + 44, }}>

        <Button
          disabled={true}
          style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
          textStyle={{fontSize: 17, color: 'white'}}
          disabledStyle={{backgroundColor: '#DDDDDD', borderWidth: 0,}}
          disabledTextStyle={{color: '#BCBCBC'}}
        >
          disabled (按钮禁用)
        </Button>

          <Button
            style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
            textStyle={{fontSize: 17, color: 'white'}}
          >
            opacity all (按钮透明)
          </Button>

          <Button
            touchableType={Button.constants.touchableTypes.fadeContent}
            style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
            textStyle={{fontSize: 17, color: 'white'}}
          >
            opacity content (内容透明)
          </Button>

          <Button
            touchableType={Button.constants.touchableTypes.highlight}
            underlayColor={'#C90000'}
            style={{margin: 10, justifyContent: 'center', height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
            textStyle={{fontSize: 17, color: 'white'}}
          >
            highlight (背景高亮)
          </Button>

          <Button
            touchableType={Button.constants.touchableTypes.blur}
            style={{margin: 10, justifyContent: 'center', height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
            textStyle={{fontSize: 17,  color: 'white'}}

          >
            blur for ios (模糊阴影)
          </Button>

      </ScrollView>
    )
  }

}