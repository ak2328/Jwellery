import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dgenjgipagxuuztkqegz.supabase.co'
const supabaseAnonKey = 'sb_publishable_dpddBmyXAYSjPhaxxXrjog_tVlgBIIn'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
