// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cyvbtduwdgfqlowtmmam.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5dmJ0ZHV3ZGdmcWxvd3RtbWFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NzcwNTI5MiwiZXhwIjoxOTkzMjgxMjkyfQ.W5RciOjOxV4ZfXv7v15u7oRy8dKXwjKbw3a7I-82yTI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);