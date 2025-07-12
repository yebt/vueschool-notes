import { fakerES_MX as faker } from '@faker-js/faker'
import { createClient, PostgrestError } from '@supabase/supabase-js'
// import { Tables } from './types.ts'

interface ProjectMin {
  name: string
  slug: string
  description: string
  status: 'in-progress' | 'completed'
  collaborators: number[]
}


interface TasksMin {
  name: string
  status: 'in-progress' | 'completed'
  description: string
  due_date: Date
  project_id: number
  collaborators: (1 | 3 | 2 | 4)[]
}

const supabase = createClient(
  process.env.VITE_SUPABASE_URL ?? '',
  process.env.SERVICE_ROLE_KEY ?? '', // Use a service key cause the supabase key because row level security add a constrains to security
)

const logErrorAndExit = (tableName: string, error: PostgrestError) => {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`,
  )
  process.exit(1)
}

const logStep = (stepMessage: string) => {
  console.log(stepMessage)
}

const seedProjects = async (numEntries = 1) => {
  logStep('Seeding projects...')

  const projectsToInsert: ProjectMin[] = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)

    projectsToInsert.push({
      name: name,
      slug: name.replaceAll(/ /g, '-'),
      description: faker.lorem.paragraphs(2),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3, 4]),
    })
  }

  // Retrive the inserted ids
  const { data, error } = await supabase.from('projects').insert(projectsToInsert).select('id')

  if (error) return logErrorAndExit('Projects', error)

  logStep('Projects seeded successfully')

  return data
}

const seedTasks = async (numEntries: number, projectIds: number[]) => {
  logStep('Seeding tasks')
  const tasksToInsert: TasksMin[] = []

  for (let i = 0; i < numEntries; i++) {
    tasksToInsert.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectIds),
      collaborators: faker.helpers.arrayElements([1, 2, 3, 4]),
    })
  }

  // Retrive the inserted ids
  const { data, error } = await supabase.from('tasks').insert(tasksToInsert).select('id')

  if (error) return logErrorAndExit('Tasks', error)

  logStep('Tasks seeded successfully')

  return data
}

const seedDatabase = async (numEntriesPerTable: number) => {
  const projectIds = (await seedProjects(numEntriesPerTable)).map((project) => project.id)
  await seedTasks(numEntriesPerTable, projectIds)
}

const numEntriesPerTable = 10

seedDatabase(numEntriesPerTable)
