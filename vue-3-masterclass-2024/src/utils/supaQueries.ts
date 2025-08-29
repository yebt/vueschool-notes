import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const tasksWithProjectsQuery = supabase.from('tasks').select(`
    *,
    projects (
     id,
     name,
     slug
    )
  `)

// this could be move to types query
export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

// Projects list
export const projectsQuery = supabase.from('projects').select()
export type Projects = QueryData<typeof projectsQuery>

// Single project details
export const projectDetailsQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
      *,
      tasks (
        id,
        name,
        status,
        due_date
      )
      `,
    )
    .eq('slug', slug) // get by comparation
    .single() // get single obj
export type ProjectDetails = QueryData<ReturnType<typeof projectDetailsQuery>>

export const updateProjectQuery = (updateProject ={}, id: number) => {
  return supabase.from('projects').update(updateProject).eq('id', id)
}

// Single task details
export const taskDetailsQuery = (id: string) =>
  supabase
    .from('tasks')
    .select(
      `
      *,
      projects (
        id,
        name,
        slug
      )
    `,
    )
    .eq('id', Number(id))
    .single()

export type TaskDetailsQuery = QueryData<ReturnType<typeof taskDetailsQuery>>

export const updateTaskQuery = (updateTask = {}, id: number) =>{
  return supabase.from('tasks').update(updateTask).eq('id', id)
}

// Single Profile
export const profileQuery = ({ column, value }: { column: string; value: string }) => {
  return supabase.from('profiles').select().eq(column, value).single()
}

export const profilesQuery = supabase.from('profiles').select(`id, full_name`)

// Get profiles in ids
export const groupedProfilesQuery = (userIds: string[]) => {
  return supabase
    .from('profiles').select('username, avatar_url, id, full_name').in('id', userIds)
}
export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>

