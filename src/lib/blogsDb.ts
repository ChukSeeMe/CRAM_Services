import fs from 'fs/promises';
import path from 'path';
import { galleryItems as initialData } from './galleryData';
import { getPool, initDB } from './postgres';

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

let dbInitialised = false;
async function ensureDB() {
  if (dbInitialised) return;
  await initDB();
  dbInitialised = true;
}

function rowToBlogItem(row: any): BlogItem {
  const meta = row.metadata || {};
  return {
    id: row.id,
    src: row.image_url || meta.src || '/dashboard.png',
    category: row.category || 'Updates',
    title: row.title,
    span: meta.span || 'col-span-1 row-span-1',
    date: meta.date || new Date(row.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase(),
    author: meta.author || 'Admin',
    content: row.content || '<p>Content coming soon.</p>',
    tags: meta.tags || [],
  };
}

export async function getBlogs(): Promise<BlogItem[]> {
  const pool = getPool();

  if (pool) {
    await ensureDB();
    const { rows } = await pool.query(
      `SELECT * FROM cram_blog_posts WHERE is_published = true ORDER BY created_at DESC`
    );
    if (rows.length > 0) return rows.map(rowToBlogItem);
    // If no rows yet, seed from initial data
    await seedInitialData(pool);
    const seeded = await pool.query(
      `SELECT * FROM cram_blog_posts WHERE is_published = true ORDER BY created_at DESC`
    );
    return seeded.rows.map(rowToBlogItem);
  }

  // Local JSON fallback
  try {
    const fileContent = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
}

async function seedInitialData(pool: any) {
  for (const item of initialData) {
    await pool.query(
      `INSERT INTO cram_blog_posts (title, content, category, image_url, metadata)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT DO NOTHING`,
      [
        item.title,
        item.content,
        item.category,
        item.src,
        JSON.stringify({ src: item.src, span: item.span, date: item.date, author: item.author, tags: item.tags })
      ]
    );
  }
}

export async function saveBlog(data: Partial<BlogItem> & { isNew?: boolean }): Promise<BlogItem> {
  const pool = getPool();

  if (pool) {
    await ensureDB();
    const meta = {
      src: data.src || '/dashboard.png',
      span: data.span || 'col-span-1 row-span-1',
      date: data.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase(),
      author: data.author || 'Admin',
      tags: data.tags || [],
    };

    if (data.isNew) {
      const { rows } = await pool.query(
        `INSERT INTO cram_blog_posts (title, content, category, image_url, metadata)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [data.title || 'New Post', data.content || '', data.category || 'Updates', data.src || '/dashboard.png', JSON.stringify(meta)]
      );
      return rowToBlogItem(rows[0]);
    } else {
      const { rows } = await pool.query(
        `UPDATE cram_blog_posts
         SET title = $1, content = $2, category = $3, image_url = $4, metadata = $5, updated_at = NOW()
         WHERE id = $6 RETURNING *`,
        [data.title, data.content, data.category, data.src, JSON.stringify(meta), data.id]
      );
      if (rows.length === 0) throw new Error('Blog not found');
      return rowToBlogItem(rows[0]);
    }
  }

  // Local JSON fallback
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
      tags: data.tags || [],
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
  const pool = getPool();

  if (pool) {
    await ensureDB();
    await pool.query(`DELETE FROM cram_blog_posts WHERE id = $1`, [id]);
    return;
  }

  let blogs = await getBlogs();
  blogs = blogs.filter(b => b.id.toString() !== id.toString());
  await fs.writeFile(DB_FILE, JSON.stringify(blogs, null, 2));
}
