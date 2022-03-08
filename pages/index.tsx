import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Posts from '../components/Posts'

import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  return (
    <div className="bg-black text-white">
      <Head>
        <title>Medium Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <Posts />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
  _id,
  title,
  author-> {
    name,
    image
  },
  description,
  mainImage,
  slug
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
