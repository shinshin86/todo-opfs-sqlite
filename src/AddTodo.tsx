import React, { useState } from 'react';
import { Input, Button, HStack } from '@chakra-ui/react';
import { addTodo } from './db';

interface AddTodoProps {
  onAdd: () => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      await addTodo(text);
      setText('');
      onAdd();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo"
        />
        <Button type="submit" colorScheme="blue">
          Add
        </Button>
      </HStack>
    </form>
  );
}