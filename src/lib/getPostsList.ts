import fs from 'fs';
import path from 'path';

export type PostListItem = {
  slug: string;
  title: string;
  date: string;
};

export function getPostsList(): PostListItem[] {
  const contentDir = path.join(process.cwd(), 'content');
  const slugs = fs.readdirSync(contentDir);

  const posts = slugs
    .filter((slug) => {
      const metadataPath = path.join(contentDir, slug, 'en', 'metadata.json');
      return fs.existsSync(metadataPath);
    })
    .map((slug) => {
      const metadataPath = path.join(contentDir, slug, 'en', 'metadata.json');
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      return {
        slug,
        title: metadata.title as string,
        date: metadata.date as string,
      };
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
