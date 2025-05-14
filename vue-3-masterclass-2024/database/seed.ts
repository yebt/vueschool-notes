import { fakerES_MX as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL ?? '',
  process.env.SERVICE_ROLE_KEY ?? '', // Use a service key cause the supabase key because row level security add a constrains to security
)

console.log(supabase);

