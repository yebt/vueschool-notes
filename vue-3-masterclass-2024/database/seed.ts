import { fakerES_MX as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL ?? '',
  process.env.SERVICE_ROLE_KEY ?? '', // Use a service key cause the supabase key because row level security add a constrains to security
)

const seedProjects = async () => {
  const name = faker.lorem.words(3)
  const result = await supabase
    .from('projects')
    .insert({
      name: name,
      slug: name.replaceAll(/ /g, '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1,2,3,4])
    })
  console.log(result);

}

await seedProjects()
