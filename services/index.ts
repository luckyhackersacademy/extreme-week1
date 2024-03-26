import { pipeline } from "@xenova/transformers";
import { v4 } from "uuid";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/libs/supabase/schema";
import type { User } from "@/entities/User";
import type { Job } from "@/entities/Job";
import type { Applicant } from "@/entities/Applicant";

interface Options {
  signUpRedirect: string;
}

export default (client: SupabaseClient<Database>, options: Options) => ({
  async signIn({ email, password }: User) {
    const response = await client.auth.signInWithPassword({
      email,
      password,
    });

    return response;
  },

  async signUp({ email, password }: User) {
    const response = await client.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: options.signUpRedirect,
      },
    });

    return response;
  },

  async signOut() {
    const response = await client.auth.signOut();
    return response;
  },

  async apply(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await $fetch<{
      bio: string;
      linkedinUrl: string;
      name: string;
      experiences: string;
      technologies: string;
    }>("/api/resume/upload", {
      method: "POST",
      body: formData,
    });

    return response;
  },

  async readAllApplicantsFromJob(jobId: string) {
    const response = await client
      .from("applicants")
      .select("*")
      .eq("job_id", jobId);

    return response.data?.map((applicant) => {
      return {
        id: applicant.id,
        linkedinUrl: applicant.linkedin_url!,
        jobId: applicant.job_id!,
        bio: applicant.bio!,
        name: applicant.name!,
        hasFit: applicant.has_fit!,
        experiences: applicant.experiences!,
        technologies: applicant.technologies!,
      };
    }) ?? [];
  },

  async readAllJobsForRecruterId(id: string) {
    const response = await client.from("jobs").select("*").eq("profile_id", id);

    return response.data?.map((job) => {
      return {
        id: job.id,
        title: job.title!,
        profileId: job.profile_id!,
        mustToHave: job.must_to_have!,
        niceToHave: job.nice_to_have!, 
      };
    }) ?? [];
  },

  async readOneJobById(id: string) {
    const response = await client
      .from("jobs")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    return {
      id: response.data?.id!,
      title: response.data?.title!,
      profileId: "",
      mustToHave: response.data?.must_to_have!,
      niceToHave: response.data?.nice_to_have!,
    };
  },

  async createApplicant({
    linkedinUrl,
    jobId,
    bio,
    name,
    experiences,
    technologies,
  }: Applicant) {
    const generateEmbedding = await pipeline(
      "feature-extraction",
      "Supabase/gte-small",
    );

    const [
      { data: experiences_embeddings },
      { data: technologies_embeddings },
    ] = await Promise.all([
      generateEmbedding(experiences, { pooling: "mean", normalize: true }),
      generateEmbedding(technologies, { pooling: "mean", normalize: true }),
    ]);

    const response = await client.from("applicants").insert({
      id: v4(),
      job_id: jobId,
      bio,
      name,
      experiences,
      technologies,
      linkedin_url: `https://${linkedinUrl}`,
      has_fit: false,

      experiences_embeddings: [...experiences_embeddings],
      technologies_embeddings: [...technologies_embeddings],
    });

    return response;
  },

  async createJob({ title, mustToHave, niceToHave, profileId }: Job) {
    const generateEmbedding = await pipeline(
      "feature-extraction",
      "Supabase/gte-small",
    );

    const [{ data: must_to_have_embedding }, { data: nice_to_have_embedding }] =
      await Promise.all([
        generateEmbedding(mustToHave, { pooling: "mean", normalize: true }),
        generateEmbedding(niceToHave, { pooling: "mean", normalize: true }),
      ]);

    const response = await client.from("jobs").insert({
      id: v4(),
      profile_id: profileId,
      title,
      must_to_have: mustToHave,
      nice_to_have: niceToHave,

      must_to_have_embedding: [...must_to_have_embedding],
      nice_to_have_embedding: [...nice_to_have_embedding],
    });

    return response;
  },
});
