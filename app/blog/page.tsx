import { getPostData, getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default async function Account() {
  const posts = await getSortedPostsData();

  return (
    <section>
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        <div className='prose mx-auto lg:prose-lg prose-headings:text-gray-200 prose-strong:text-gray-400'>
          {posts &&
            posts.map((post: any) => (
              <article className="mb-24" key={post.id}>
                
                <Link href={`/blog/${post.id}`} className='m-0'>
                
                  <h3>{post.title}</h3>
                </Link>
                <div className='text-sm mb-2 text-slate-500'>{post.date}</div>
                <div className='text-slate-500'>{post.excerpt}</div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
