// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tbcpjiqfudduukclqimz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiY3BqaXFmdWRkdXVrY2xxaW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyOTgzMzMsImV4cCI6MjA0NTg3NDMzM30.OptMjCLU9EKUGU91RFJ_q_ZBmLBtqpreCLYjGw32-bI';

export const supabase = createClient(supabaseUrl, supabaseKey);
