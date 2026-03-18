import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { useCozyStore } from '../store'

export const AdminPostsList: FC = () => {
  const posts = useCozyStore((s) => s.posts)
  const deletePost = useCozyStore((s) => s.deletePost)

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return
    deletePost(id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-[#3E2723]">Posts</h1>
        <Link
          to="/admin/posts/new"
          className="rounded-full bg-[#C4956A] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FFF9F1] shadow-[0_16px_40px_rgba(92,64,51,0.4)] transition hover:-translate-y-0.5"
        >
          Create new post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-[#E2CFB5] bg-[#FFF9F1]/60 p-12 text-center">
          <p className="text-sm text-[#6F4D3C]">No posts yet.</p>
          <p className="mt-2 text-xs text-[#8B6B4A]">Create your first post to get started.</p>
          <Link
            to="/admin/posts/new"
            className="mt-4 inline-block rounded-full bg-[#C4956A] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FFF9F1]"
          >
            Create new post
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex items-center justify-between rounded-2xl border border-[#E2CFB5] bg-[#FFF9F1]/90 px-4 py-3 shadow-[0_8px_24px_rgba(92,64,51,0.12)]"
            >
              <div>
                <h2 className="font-medium text-[#3E2723]">{post.title}</h2>
                <p className="text-xs text-[#8B6B4A]">
                  {post.status} · {new Date(post.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/admin/posts/${post.id}/edit`}
                  className="rounded-full border border-[#D4A574] px-3 py-1 text-xs font-medium text-[#8B6B4A] hover:bg-[#F5E6D3]"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(post.id, post.title)}
                  className="rounded-full border border-red-200 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
