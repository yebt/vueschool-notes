import { fakerES_MX as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'
import type { Project  } from '../src/types/Project'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL ?? '',
  process.env.SERVICE_ROLE_KEY ?? '', // Use a service key cause the supabase key because row level security add a constrains to security
)

// interface Project {
//   name: string
//   slug: string
//   status: 'in-progress' | 'completed'
//   collaborators: number[]
// }

const seedProjects = async (numEntries = 1) => {
  const projectsToInsert: Project[] = []
  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)
    projectsToInsert.push({
      name: name,
      slug: name.replaceAll(/ /g, '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3, 4]),
    })
  }

  const result = await supabase.from('projects').insert(projectsToInsert)

  console.log(result)
}

await seedProjects(10)
