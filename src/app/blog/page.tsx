import Link from 'next/link'
import { getAllPosts } from '../lib/queries'
import { urlFor } from '../lib/sanity'
import styles from './blog.module.css'

export const revalidate = 60

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Blog</h1>
      {posts.length === 0 && (
        <p className={styles.empty}>No posts yet. Add one in your Sanity Studio.</p>
      )}
      <div className={styles.grid}>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.card}>
            {post.coverImage && (
              <img
                src={urlFor(post.coverImage).width(600).height(340).url()}
                alt={post.title}
                className={styles.cardImage}
              />
            )}
            <div className={styles.cardBody}>
              <p className={styles.meta}>
                {post.author} · {new Date(post.publishedDate).toLocaleDateString()}
              </p>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
              {post.tags && (
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}