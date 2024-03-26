import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/libs/supabase/schema";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const jobId = "76d5ed92-0c7e-4e9d-9b4e-efad62960890";
  const response = await client
    .from("jobs")
    .select("*")
    .eq("id", jobId)
    .maybeSingle();

  const { data: applicants } = await client.rpc("match_documents", {
    query_embedding: response.data?.must_to_have_embedding!,
    job_id: jobId,
    match_threshold: 0.78,
    match_count: 1,
  });

  const [applicant] = applicants ?? [];

  if (!applicant) {
    return "any match";
  }

  await client
    .from("applicants")
    .update({
      has_fit: true,
    })
    .eq("id", applicant.id);

  return "match found!";
});
