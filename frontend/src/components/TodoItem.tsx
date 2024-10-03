import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Todo } from '../../types';

interface Props {
  todo: Todo;
  onComplete: () => void;
  onDelete: () => void;
  onEdit: (newTitle: string, newDescription?: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description || '');

  const handleSave = () => {
    onEdit(newTitle, newDescription);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="Edit title"
          />
          <TextInput
            style={styles.input}
            value={newDescription}
            onChangeText={setNewDescription}
            placeholder="Edit description"
          />
          <Button title="Save" onPress={handleSave} />
        </>
      ) : (
        <>
          <Text style={styles.title}>{todo.title}</Text>
          <Text>{todo.description}</Text>
          <Button title={todo.isCompleted ? 'Completed' : 'Mark Complete'} onPress={onComplete} />
          <Button title="Edit" onPress={() => setIsEditing(true)} />
          <Button title="Delete" onPress={onDelete} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
  },
});

export default TodoItem;
