import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TodoItem from './TodoItem';
import { Todo } from '../../types';

interface Props {
  todos: Todo[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription?: string) => void;
}

const TodoList: React.FC<Props> = ({ todos, onComplete, onDelete, onEdit }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onComplete={() => onComplete(todo._id!)}
            onDelete={() => onDelete(todo._id!)}
            onEdit={(newTitle, newDescription) => onEdit(todo._id!, newTitle, newDescription)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    padding: 10,
  },
});

export default TodoList;
