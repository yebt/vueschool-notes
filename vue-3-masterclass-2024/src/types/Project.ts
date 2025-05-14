export interface ProjectMin {
  name: string
  slug: string
  status: 'in-progress' | 'completed'
  collaborators: number[]
}

export interface Project {
  id: number
  name: string
  slug: string
  status: 'in-progress' | 'completed'
  collaborators: number[]
  created_at: Date
  updated_at: Date
}
