// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'Projec_url';
const supabaseKey = 'API_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
