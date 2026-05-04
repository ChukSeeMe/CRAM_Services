import fs from 'fs/promises';
import path from 'path';
import { galleryItems as initialData } from './galleryData';

export interface BlogItem {
  id: string | number;
  src: string;
  category: string;
  title: string;
  span: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
}

const DB_FILE = path.join(process.cwd(), 'database-blogs.json');

export async function getBlogs(): Promise<BlogItem[]> {
  try {
    const fileContent = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch (e) {
    // If file doesn't exist, create it with initial data
    await fs.writeFile(DB_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
}

export async function saveBlog(data: Partial<BlogItem> & { isNew?: boolean }): Promise<BlogItem> {
  const blogs = await getBlogs();
  
  if (data.isNew) {
    const newBlog: BlogItem = {
      id: Date.now().toString(),
      src: data.src || '/dashboard.png',
      category: data.category || 'Updates',
      title: data.title || 'New Post',
      span: data.span || 'col-span-1 row-span-1',
      date: data.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase(),
      author: data.author || 'Admin',
      content: data.content || '<p>Content goes here.</p>',
      tags: data.tags || []
    };
    blogs.unshift(newBlog);
    await fs.writeFile(DB_FILE, JSON.stringify(blogs, null, 2));
    return newBlog;
  } else {
    const index = blogs.findIndex(b => b.id.toString() === data.id?.toString());
    if (index === -1) throw new Error('Blog not found');
    
    blogs[index] = { ...blogs[index], ...data };
    await fs.writeFile(DB_FILE, JSON.stringify(blogs, null, 2));
    return blogs[index];
  }
}

export async function deleteBlog(id: string | number) {
  let blogs = await getBlogs();
  blogs = blogs.filter(b => b.id.toString() !== id.toString());
  await fs.writeFile(DB_FILE, JSON.stringify(blogs, null, 2));
}
