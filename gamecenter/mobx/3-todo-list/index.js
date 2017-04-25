/**
 * Created by tdzl2003 on 1/20/17.
 */

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { observable } from 'mobx';
import { observer } from 'mobx-react/native';
import TodoItem from './ToDoItem.js'
import Todo from './ToDo.js'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  todo: {
    fontSize: 20,
  },
  done: {
    color: 'gray',
    textDecorationLine: 'line-through',
  },
});

const titles = ['Eat', 'Drink', 'Think'];



function randomTodoTitle() {
  return titles[Math.floor(Math.random() * titles.length)];
}



@observer
export default class TodoList extends Component {
  static hideNavBar = false;
  static title = '3 - TodoList';
  static rightNavTitle = 'Add';

  @observable
  todoList = [];

  onRightPressed() {
    this.todoList.push(new Todo(randomTodoTitle(), false));
  }

  renderItem(data) {
    return (<TodoItem key={data.id} data={data} />);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 20,padding:20, textAlign: 'center', backgroundColor: '#ffff66', borderColor: 'red', borderWidth: 1, borderRadius: 5 }} onPress={this.onRightPressed.bind(this)}>Add</Text>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          {this.todoList.map(this.renderItem)}
        </ScrollView>
      </View> 
    );
  }
}
