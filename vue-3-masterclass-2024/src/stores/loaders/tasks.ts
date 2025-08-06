import type { TaskDetailsQuery, TasksWithProjects } from '@/utils/supaQueries'
import { taskDetailsQuery, tasksWithProjectsQuery, updateTaskQuery } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useTasksStore = defineStore('task-store', () => {
  // Types
  interface ValidateCacheParams {
    ref: typeof tasksList | typeof singleTask
    supaQuery: typeof tasksWithProjectsQuery | typeof taskDetailsQuery
    loadKey: string
    loaderFn: typeof loadTasksList | typeof loadSingleTask
  }

  // Privates

  // States
  const tasksList = ref<TasksWithProjects | null>(null)
  const singleTask = ref<TaskDetailsQuery | null>(null)

  // Promises wrap
  const loadTasksList = useMemoize(async (_: string) => await tasksWithProjectsQuery)
  const loadSingleTask = useMemoize(async (id: string) => await taskDetailsQuery(id))

  // Funcitons
  const validateTasksCache = ({ ref, supaQuery, loadKey, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof supaQuery == 'function' ? supaQuery(loadKey) : supaQuery

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        }
        loaderFn.delete(loadKey)
        if (!error && data) ref.value = data
      })
    }
  }

  const getTasksList = async () => {
    tasksList.value = null
    const { data, error, status } = await loadTasksList('tasks')

    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) tasksList.value = data

    validateTasksCache({
      ref: tasksList,
      supaQuery: tasksWithProjectsQuery,
      loadKey: 'tasks',
      loaderFn: loadTasksList,
    })
  }

  const getSingleTask = async (id: string) => {
    singleTask.value = null

    const { data, error, status } = await loadSingleTask(id)

    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) singleTask.value = data

    validateTasksCache({
      ref: singleTask,
      supaQuery: taskDetailsQuery,
      loadKey: id,
      loaderFn: loadSingleTask,
    })
  }

  const updateTask = async () => {
    if (!singleTask.value) return

    const { projects, id, ...taskProperties } = singleTask.value

    await updateTaskQuery(taskProperties, singleTask.value.id)
  }

  return {
    tasksList,
    singleTask,
    getTasksList,
    getSingleTask,
    updateTask,
  }
})
