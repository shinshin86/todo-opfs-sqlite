// @ts-ignore
import { NeverChangeDB } from 'neverchange';

let db: any = null;
const DB_NAME = 'todo';
export async function initDb() {
  if(db) db;

  db = new NeverChangeDB(DB_NAME);

  db.addMigrations([
    {
      version: 1,
      up: async (db: any) => {
        await db.execute(`
          CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT 0
          )
        `);
      },
    },
    {
      version: 2,
      up: async (db: any) => {
        await db.execute(`
          ALTER TABLE todos ADD COLUMN deleted BOOLEAN NOT NULL DEFAULT 0
        `);
      },
    },
  ]);
  await db.init();
}

export async function addTodo(text: string) {
  try {
    await db.execute(
      'INSERT INTO todos (text) VALUES (?)',
    [text],
    );
    console.log('Todo added successfully'); 
  } catch (error) {
    console.error('Failed to add todo:', error);
  }
}

export async function getTodos() {
  const rows = await db.query('SELECT * FROM todos WHERE deleted = 0 ORDER BY id DESC');
  return rows || [];
}

export async function toggleTodo(id: number) {
  await db.execute(
    'UPDATE todos SET completed = NOT completed WHERE id = ?',
    [id]);
}

export async function updateTodo(id: number, text: string) {
  try {
    await db.execute('UPDATE todos SET text = ? WHERE id = ?',
      [text, id]);
    console.log('Todo updated successfully');
  } catch (error) {
    console.error('Failed to update todo:', error);
    throw error;
  }
}

export async function deleteTodo(id: number) {
  try {
    await db.execute(
      'UPDATE todos SET deleted = 1 WHERE id = ?',
      [id],
    );
    console.log('Todo marked as deleted successfully');
  } catch (error) {
    console.error('Failed to mark todo as deleted:', error);
    throw error;
  }
}