import { sqlite3Worker1Promiser } from '@sqlite.org/sqlite-wasm';

let dbPromise: Promise<(command: string, params: any) => Promise<any>> | null = null;
let dbId: string | null = null;

export async function initDb() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise(async (resolve, reject) => {
    try {
      console.log('Loading and initializing SQLite3 module...');

      const promiser = await new Promise<unknown>((resolve) => {
        const _promiser = sqlite3Worker1Promiser({
          onready: () => resolve(_promiser),
        });
      }) as (command: string, params: any) => Promise<any>;

      console.log('Done initializing. Opening database...');

      // OPFS
      let openResponse;
      try {
        openResponse = await promiser('open', {
          filename: 'file:todo.sqlite3?vfs=opfs',
        });
        console.log('OPFS database opened:', openResponse.result.filename);
      } catch (opfsError) {
        console.warn('OPFS is not available, falling back to in-memory database:', opfsError);
        openResponse = await promiser('open', {
          filename: ':memory:',
        });
        console.log('In-memory database opened');
      }

      dbId = openResponse.result.dbId;

      await promiser('exec', {
        sql: `
          CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT 0
          )
        `,
        dbId,
      });

      console.log('Database initialized successfully');
      resolve(promiser);
    } catch (err) {
      console.error('Failed to initialize database:', err);
      reject(err);
    }
  });

  return dbPromise;
}

export async function addTodo(text: string) {
  const promiser = await initDb();
  try {
    await promiser('exec', {
      sql: 'INSERT INTO todos (text) VALUES (?)',
    bind: [text],
      dbId,
    });
    console.log('Todo added successfully'); 
  } catch (error) {
    console.error('Failed to add todo:', error);
  }
}

export async function getTodos() {
  const promiser = await initDb();
  const result = await promiser('exec', {
    sql: 'SELECT * FROM todos ORDER BY id DESC',
    rowMode: 'object',
    dbId,
  });
  const { resultRows: rows } = result.result;
  // console.log({result, rows})
  
  return rows || [];
}

export async function toggleTodo(id: number) {
  const promiser = await initDb();
  await promiser('exec', {
    sql: 'UPDATE todos SET completed = NOT completed WHERE id = ?',
    bind: [id],
    dbId,
  });
}