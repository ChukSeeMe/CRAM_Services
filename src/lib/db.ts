import fs from 'fs/promises';
import path from 'path';
import { getPool, initDB } from './postgres';

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  type: string;
  timestamp: string;
}

const DB_FILE = path.join(process.cwd(), 'database.json');

let dbInitialised = false;
async function ensureDB() {
  if (dbInitialised) return;
  await initDB();
  dbInitialised = true;
}

export async function saveSubmission(
  data: Omit<FormSubmission, 'id' | 'timestamp'>
): Promise<FormSubmission> {
  const pool = getPool();

  if (pool) {
    await ensureDB();
    const { rows } = await pool.query(
      `INSERT INTO cram_submissions
        (name, email, phone, service, message, submission_type, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        data.name,
        data.email,
        data.phone,
        data.company,   // stored in 'service' column as company name
        data.message,
        data.type,
        JSON.stringify({ company: data.company })
      ]
    );
    const row = rows[0];
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      company: row.service,
      message: row.message,
      type: row.submission_type,
      timestamp: row.created_at,
    };
  }

  // Local JSON fallback (development without DATABASE_URL)
  let currentData: FormSubmission[] = [];
  try {
    const fileContent = await fs.readFile(DB_FILE, 'utf-8');
    currentData = JSON.parse(fileContent);
  } catch {
    // file doesn't exist yet
  }
  const newSubmission: FormSubmission = {
    ...data,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
  currentData.push(newSubmission);
  await fs.writeFile(DB_FILE, JSON.stringify(currentData, null, 2));
  return newSubmission;
}

export async function getSubmissions(): Promise<any[]> {
  const pool = getPool();

  if (pool) {
    await ensureDB();
    const { rows } = await pool.query(
      `SELECT * FROM cram_submissions ORDER BY created_at DESC`
    );
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      company: row.service,
      message: row.message,
      type: row.submission_type,
      submission_type: row.submission_type,
      created_at: row.created_at,
      timestamp: row.created_at,
    }));
  }

  // Local JSON fallback
  try {
    const fileContent = await fs.readFile(DB_FILE, 'utf-8');
    const submissions: FormSubmission[] = JSON.parse(fileContent);
    return submissions.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch {
    return [];
  }
}
