import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fpkmgeskyglfmxqmpprm.supabase.co";

const supabaseKey = "sb_publishable_66HvqP3qPLURNIhprPMA-w_nQ6sd37T";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);