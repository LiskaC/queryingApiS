import { useEffect, useState } from 'react'

interface Post {
  id: number
  title: string
  body: string
}

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

export default function YourTab() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch(`${BASE_URL}?_limit=5`)
        const data = await res.json()
        setPosts(data)
      } catch {
        setError('Failed to load posts.')
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  async function handleCreate() {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, userId: 1 }),
      })
      const newPost = await res.json()
      setPosts([newPost, ...posts])
      setTitle('')
      setBody('')
    } catch {
      setError('Failed to create post.')
    }
  }

  async function handleDelete(id: number) {
    try {
      await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
      setPosts(posts.filter((p) => p.id !== id))
    } catch {
      setError('Failed to delete post.')
    }
  }

  return (
    <div className='your-tab'>
      <h2>JSONPlaceholder Posts</h2>

      <div className='demo-card'>
        <h3>Create Post</h3>
        <input
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder='Body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className='demo-btn' onClick={handleCreate} disabled={!title || !body}>
          POST
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className='error'>{error}</p>}

      <div className='demo-cards'>
        {posts.map((post) => (
          <div key={post.id} className='demo-card'>
            <p className='demo-name'>{post.title}</p>
            <p className='demo-role'>{post.body}</p>
            <button className='demo-btn' onClick={() => handleDelete(post.id)}>
              DELETE
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
