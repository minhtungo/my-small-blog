import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'

interface Props {
  post: Post
}

const Post = ({ post }: Props) => {
  return (
    <main>
      <Header />
      <img
        className="h-52 w-full object-cover"
        src={urlFor(post.mainImage).url()}
      />

      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500">{post.title}</h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()}
            alt={`${post.author.name}`}
          />
          <p className="text-sm font-extralight">
            Posted by <span className="text-blue-700">{post.author.name} </span>
            - {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className='mt-10'>
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => {
                <h1 className="my-5 text-2xl font-bold" />
              },
              h2: (props: any) => {
                <h1 className="my-5 text-xl font-bold" />
              },
              li: (props: any) => {
                <h1 className="ml-4 list-disc" />
              },
              link: ({ href, children }: any) => {
                <a href={href} className="text-blue-500 hover:text-blue-700">
                  {children}
                </a>
              },
            }}
          />
        </div>
      </article>
    </main>
  )
}
export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
  _id,
  slug {
    current
    }
  }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        _createdAt,
        title,
        author-> {
            name,
            image
        },
        'comments': *[
            _type == 'comment' &&
            post._ref == ^._id &&
            approved == true],
        description,
        mainImage,
        slug,
        body
    } `

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
  }
}
