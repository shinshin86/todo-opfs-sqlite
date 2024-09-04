import { VStack, HStack, Text, Checkbox, Spinner, Input, Button } from '@chakra-ui/react';
import { toggleTodo, updateTodo, deleteTodo } from './db';
import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: number;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

export function TodoList({ todos, onToggle, onUpdate, onDelete }: TodoListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleToggle = async (id: number) => {
    await toggleTodo(id);
    onToggle();
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleUpdate = async (id: number) => {
    try {
      await updateTodo(id, editText);
      setEditingId(null);
      onUpdate();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      onDelete();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  if (!todos) {
    return <Spinner />;
  }

  return (
    <VStack align="stretch" spacing={4} width="100%">
      {todos.map((todo) => (
        <HStack key={todo.id} p={2} bg="gray.100" borderRadius="md">
          <Checkbox
            isChecked={todo.completed === 1}
            onChange={() => handleToggle(todo.id)}
          />
          {editingId === todo.id ? (
            <>
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <Button onClick={() => handleUpdate(todo.id)}>Save</Button>
              <Button onClick={() => setEditingId(null)}>Cancel</Button>
            </>
          ) : (
            <>
              <Text
                flex={1}
                textDecoration={todo.completed === 1 ? 'line-through' : 'none'}
              >
                {todo.text}
              </Text>
              <Button onClick={() => handleEdit(todo)}>Edit</Button>
              <Button 
                onClick={() => handleDelete(todo.id)} 
                colorScheme="red"
              >
                Delete
              </Button>
            </>
          )}
        </HStack>
      ))}
    </VStack>
  );
}