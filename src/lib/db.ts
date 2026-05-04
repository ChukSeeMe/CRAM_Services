import fs from 'fs/promises';
import path from 'path';

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

export async function saveSubmission(data: Omit<FormSubmission, 'id' | 'timestamp'>) {
  try {
    let currentData: FormSubmission[] = [];
    try {
      const fileContent = await fs.readFile(DB_FILE, 'utf-8');
      currentData = JSON.parse(fileContent);
    } catch (e) {
      // File doesn't exist yet
    }

    const newSubmission: FormSubmission = {
      ...data,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    currentData.push(newSubmission);
    await fs.writeFile(DB_FILE, JSON.stringify(currentData, null, 2));

    return newSubmission;
  } catch (error) {
    console.error('Error saving to DB:', error);
    throw error;
  }
}
