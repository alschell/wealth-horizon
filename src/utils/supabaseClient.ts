
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://afkmehzykgdbeuilkgqp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFma21laHp5a2dkYmV1aWxrZ3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MzczNDIsImV4cCI6MjA2MDIxMzM0Mn0.HNu5ZQElpxO6bPGsHkxz3awGtsyRsnTuRktcx5zlrAY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
