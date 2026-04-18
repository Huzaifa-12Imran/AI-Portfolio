import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDir = path.join(process.cwd(), 'content');

export function getContentFiles(dir: string) {
  const fullDir = path.join(contentDir, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
}

export function readMdx(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  return { frontmatter: data, content, readingTime: stats.text };
}

export function getAllPosts() {
  const files = getContentFiles('blog');
  return files.map((file) => {
    const fullPath = path.join(contentDir, 'blog', file);
    const { frontmatter, content, readingTime } = readMdx(fullPath);
    return {
      slug: file.replace(/\.mdx?$/, ''),
      title: frontmatter.title || 'Untitled',
      excerpt: frontmatter.excerpt || '',
      date: frontmatter.date || '',
      tags: frontmatter.tags || [],
      readingTime,
      content,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllProjects() {
  const files = getContentFiles('projects');
  return files.map((file) => {
    const fullPath = path.join(contentDir, 'projects', file);
    const { frontmatter, content } = readMdx(fullPath);
    return {
      slug: file.replace(/\.mdx?$/, ''),
      ...frontmatter,
      content,
    };
  });
}
