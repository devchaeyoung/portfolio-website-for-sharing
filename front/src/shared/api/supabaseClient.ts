import { createClient } from '@supabase/supabase-js'
import { Database } from '../types'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
