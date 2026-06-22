import { getAllPosts, getPostBySlug } from '../../lib/queries'
import { urlFor } from '../../lib/sanity'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import styles from './post.module.css'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className={styles.container}>
      <p className={styles.meta}>
        {post.author} · {new Date(post.publishedDate).toLocaleDateString()}
      </p>
      <h1 className={styles.title}>{post.title}</h1>
      {post.coverImage && (
        <img
          src={urlFor(post.coverImage).width(1200).height(600).url()}
          alt={post.title}
          className={styles.cover}
        />
      )}
      {post.tags && (
        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      )}
      <article className={styles.body}>
        <PortableText value={post.body} />
      </article>
    </main>
  )
}