import { client } from './sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { PortableTextBlock } from '@portabletext/types'

export type BlogPost = {
  title: string
  slug: string
  excerpt: string
  body: PortableTextBlock[]
  coverImage?: SanityImageSource
  author: string
  publishedDate: string
  tags?: string[]
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedDate desc) {
      title,
      "slug": slug.current,
      excerpt,
      author,
      publishedDate,
      coverImage,
      tags
    }`
  )
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      excerpt,
      body,
      author,
      publishedDate,
      coverImage,
      tags
    }`,
    { slug: slug }
  )
}