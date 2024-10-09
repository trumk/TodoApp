import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import TodoList from '../components/TodoList';
import { Todo } from '../../types';

const TodoScreen: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const apiURL = 'http://10.22.40.108:5000'; 

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${apiURL}/api/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (!title.trim()) {
      setErrorMessage('Todo title cannot be empty');
      return;
    }

    const newTodo = { title, isCompleted: false };
    try {
      const response = await fetch(`${apiURL}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();
      setTodos([...todos, data]);
      setTitle('');
      setErrorMessage(null);  
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const completeTodo = async (id: string) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await fetch(`${apiURL}/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...todo, isCompleted: !todo?.isCompleted }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map((t) => (t._id === id ? updatedTodo : t)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const editTodo = async (id: string, newTitle: string, newDescription?: string) => {
    if (!newTitle.trim()) {
      Alert.alert('Validation Error', 'Todo title cannot be empty.');
      return;
    }

    const todo = todos.find((t) => t._id === id);
    try {
      const response = await fetch(`${apiURL}/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...todo, title: newTitle, description: newDescription }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map((t) => (t._id === id ? updatedTodo : t)));
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this todo?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await fetch(`${apiURL}/api/todos/${id}`, { method: 'DELETE' });
              setTodos(todos.filter((t) => t._id !== id));
            } catch (error) {
              console.error('Error deleting todo:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="New Todo"
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      <Button title="Add Todo" onPress={addTodo} />
      <TodoList todos={todos} onComplete={completeTodo} onDelete={deleteTodo} onEdit={editTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default TodoScreen;
