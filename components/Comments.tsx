import { Post } from '../typings'

interface Props {
  post: Post
}

const Comments = ({ post }: Props) => {
  return (
    <div className="my-10 my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-blue-500">
      <h3 className="text-4xl">Comments</h3>
      <hr className="pb-2" />
      {post.comments.map((comment) => (
        <div key={comment._id}>
          <p>
            <span className="text-blue-500">{comment.name}:</span>{' '}
            {comment.comment}
          </p>
        </div>
      ))}
    </div>
  )
}
export default Comments
