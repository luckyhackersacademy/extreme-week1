import createServices from "@/services";
import type { Database } from "@/libs/supabase/schema";

export function useServices() {
  const supabaseClient = useSupabaseClient<Database>();
  const config = useRuntimeConfig();

  return createServices(supabaseClient, {
    signUpRedirect: config.public.siteUrl,
  });
}
