import React from 'react';
import { View } from 'react-native';
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
    <View>
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
  );
};

export default TodoList;
