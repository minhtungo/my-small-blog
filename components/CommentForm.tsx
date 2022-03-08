import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Post } from '../typings'

import Comments from './Comments'

interface Props {
  post: Post
}

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

const CommentsForm = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      {submitted ? (
        <div className="mx-auto mt-10 flex max-w-2xl flex-col bg-blue-500 py-7 text-center text-white">
          <h3 className="text-3xl font-bold">
            Thank you for submitting your comment.
          </h3>
          <p>Once it is approved, it will appear below!</p>
        </div>
      ) : (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mb-10 flex max-w-2xl flex-col p-5"
          >
            <h3 className="text-sm text-blue-500">Enjoyed this article?</h3>
            <h4 className="text-3xl font-bold">Leave a comment below!</h4>
            <hr className="mt-2 py-3" />

            <input
              {...register('_id')}
              type="hidden"
              name="_id"
              value={post._id}
            />
            <label className="mb-5 block">
              <span className="text-slate-100">Name</span>
              <input
                {...register('name', { required: true })}
                className="form-input mt-1 block w-full rounded border bg-gray-900 py-2 px-3 shadow outline-none ring-blue-500 focus:ring"
                type="text"
                placeholder="Your name"
              />
              {errors.name && (
                <span className="text-sm text-red-500">Name is required.</span>
              )}
            </label>

            <label className="mb-5 block">
              <span className="text-slate-100">Email</span>
              <input
                {...register('email', { required: true })}
                className="form-input mt-1 block w-full rounded border bg-gray-900 py-2 px-3 shadow outline-none ring-blue-500 focus:ring"
                type="email"
                placeholder="Your email"
              />
              {errors.email && (
                <span className="text-sm text-red-500">Email is required.</span>
              )}
            </label>

            <label className="mb-5 block">
              <span className="text-slate-100">Comment</span>
              <textarea
                {...register('comment', { required: true })}
                className="form-textarea mt-1 block w-full rounded border bg-gray-900 py-2 px-3 shadow outline-none ring-blue-500 focus:ring"
                placeholder="Your comment"
                rows={5}
              />
              {errors.comment && (
                <span className="text-sm text-red-500">
                  Comment is required.
                </span>
              )}
            </label>

            <input
              type="submit"
              className="focus:shadow-outline cursor-pointer rounded bg-blue-500 px-4 py-2 font-bold shadow hover:bg-blue-700"
            />
          </form>
        </>
      )}
      <Comments post={post}/>
    </>
  )
}
export default CommentsForm
