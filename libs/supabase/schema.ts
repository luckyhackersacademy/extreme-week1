export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applicants: {
        Row: {
          bio: string | null
          experiences: string | null
          experiences_embeddings: string | null
          has_fit: boolean | null
          id: string
          job_id: string | null
          linkedin_url: string | null
          name: string | null
          technologies: string | null
          technologies_embeddings: string | null
        }
        Insert: {
          bio?: string | null
          experiences?: string | null
          experiences_embeddings?: string | null
          has_fit?: boolean | null
          id?: string
          job_id?: string | null
          linkedin_url?: string | null
          name?: string | null
          technologies?: string | null
          technologies_embeddings?: string | null
        }
        Update: {
          bio?: string | null
          experiences?: string | null
          experiences_embeddings?: string | null
          has_fit?: boolean | null
          id?: string
          job_id?: string | null
          linkedin_url?: string | null
          name?: string | null
          technologies?: string | null
          technologies_embeddings?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applicants_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          id: string
          must_to_have: string | null
          must_to_have_embedding: string | null
          nice_to_have: string | null
          nice_to_have_embedding: string | null
          profile_id: string | null
          title: string | null
        }
        Insert: {
          id?: string
          must_to_have?: string | null
          must_to_have_embedding?: string | null
          nice_to_have?: string | null
          nice_to_have_embedding?: string | null
          profile_id?: string | null
          title?: string | null
        }
        Update: {
          id?: string
          must_to_have?: string | null
          must_to_have_embedding?: string | null
          nice_to_have?: string | null
          nice_to_have_embedding?: string | null
          profile_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      match_documents: {
        Args: {
          query_embedding: string
          job_id: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          name: string
          experiences: string
          technologies: string
          similarity: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
