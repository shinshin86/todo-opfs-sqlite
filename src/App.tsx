import { useEffect, useState, useCallback } from 'react';
import { ChakraProvider, Box, VStack, Heading } from '@chakra-ui/react';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';
import { initDb, getTodos } from './db';

export function App() {
  const [isDbReady, setIsDbReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<any[]>([]);

  const fetchTodos = useCallback(async () => {
    try {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setError('Failed to fetch todos. Please check the console for more details.');
    }
  }, []);

  useEffect(() => {
    initDb()
      .then(() => {
        setIsDbReady(true);
        fetchTodos();
      })
      .catch((err) => {
        console.error('Database initialization failed:', err);
        setError('Failed to initialize the database. Please check the console for more details.');
      });
  }, [fetchTodos]);

  const handleAddTodo = useCallback(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (error) {
    return <Box color="red.500">{error}</Box>;
  }

  if (!isDbReady) {
    return <Box>Loading...</Box>;
  }

  return (
    <ChakraProvider>
      <Box maxWidth="800px" margin="auto" mt={8}>
        <VStack spacing={8}>
          <Heading>TODO App</Heading>
          <AddTodo onAdd={handleAddTodo} />
          <TodoList todos={todos} onToggle={handleAddTodo} />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;