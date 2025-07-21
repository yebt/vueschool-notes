import { fakerES_MX as faker } from '@faker-js/faker'
import { AuthError, createClient, PostgrestError } from '@supabase/supabase-js'
// import { Tables } from './types.ts'

interface ProjectMin {
  name: string
  slug: string
  description: string
  status: 'in-progress' | 'completed'
  collaborators: string[]
}

interface TasksMin {
  name: string
  status: 'in-progress' | 'completed'
  description: string
  due_date: Date
  profile_id: string
  project_id: number
  // collaborators: (1 | 3 | 2 | 4)[]
  collaborators: string[]
}

const supabase = createClient(
  process.env.VITE_SUPABASE_URL ?? '',
  process.env.SERVICE_ROLE_KEY ?? '', // Use a service key cause the supabase key because row level security add a constrains to security
)

const testingUserEmail = process.env.TESTING_USER_EMAIL

const logErrorAndExit = (tableName: string, error: PostgrestError | AuthError) => {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`,
  )
  process.exit(1)
}

const logStep = (stepMessage: string) => {
  console.log(stepMessage)
}

const PrimaryTestUserExists = async (): Promise<string | null> => {
  logStep('Check if primary test user exists ...')
  const { data, error } = await supabase
    .from('auth.users')
    .select('id, email')
    .eq('email', testingUserEmail)
    .single()

  if (error) {
    console.log('Primary test user not found. Will create one.')
    return null
  }

  logStep('Primary test user is found.')
  return data?.id
}

const createPrimaryTestUser = async (): Promise<string | null> => {
  logStep('Creating primary test user ...')
  if (!testingUserEmail) {
    console.log('No testing email found')
    process.exit(1)
  }

  const firstName = 'Test'
  const lastName = 'Accound'
  const userName = 'testaccount1'
  const fullName = `${firstName} ${lastName}`
  const email = testingUserEmail
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: 'password',
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: fullName,
        userName: userName,
      },
    },
  })

  if (error) {
    logErrorAndExit('Users', error)
  }

  if (data && data.user) {
    const userId = data.user.id
    await supabase.from('profiles').insert({
      id: userId,
      full_name: fullName,
      username: userName,
      bio: 'The main testing account',
      avatar_url: `https://i.pravatar.cc/150?u=${userId}`,
    })
    logStep('Primary test user created successfully.')
    return userId
  }
  return null
}

const seedProjects = async (numEntries = 1, userId: string) => {
  logStep('Seeding projects...')

  const projectsToInsert: ProjectMin[] = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)

    projectsToInsert.push({
      name: name,
      slug: name.replaceAll(/ /g, '-'),
      description: faker.lorem.paragraphs(2),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([userId]),
    })
  }

  // Retrive the inserted ids
  const { data, error } = await supabase.from('projects').insert(projectsToInsert).select('id')

  if (error) return logErrorAndExit('Projects', error)

  logStep('Projects seeded successfully')

  return data
}

const seedTasks = async (numEntries: number, projectIds: number[], userId: string) => {
  logStep('Seeding tasks')
  const tasksToInsert: TasksMin[] = []

  for (let i = 0; i < numEntries; i++) {
    tasksToInsert.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      profile_id: userId,
      project_id: faker.helpers.arrayElement(projectIds),
      collaborators: faker.helpers.arrayElements([userId]),
    })
  }

  // Retrive the inserted ids
  const { data, error } = await supabase.from('tasks').insert(tasksToInsert).select('id')

  if (error) return logErrorAndExit('Tasks', error)

  logStep('Tasks seeded successfully')

  return data
}

const seedDatabase = async (numEntriesPerTable: number) => {
  const testUserId = await PrimaryTestUserExists()

  const userId = testUserId ? testUserId : await createPrimaryTestUser()
  if (!userId) {
    console.log('Error taking the user id')
    process.exit(1)
  }

  const projectIds = (await seedProjects(numEntriesPerTable, userId)).map((project) => project.id)
  await seedTasks(numEntriesPerTable, projectIds, userId)
}

const numEntriesPerTable = 10

seedDatabase(numEntriesPerTable)
