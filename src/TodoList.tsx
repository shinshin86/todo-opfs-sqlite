import { VStack, HStack, Text, Checkbox, Spinner } from '@chakra-ui/react';
import { toggleTodo } from './db';

interface Todo {
  id: number;
  text: string;
  completed: number;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: () => void;
}

export function TodoList({ todos, onToggle }: TodoListProps) {
  const handleToggle = async (id: number) => {
    await toggleTodo(id);
    onToggle();
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
          <Text
            flex={1}
            textDecoration={todo.completed === 1 ? 'line-through' : 'none'}
          >
            {todo.text}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
}