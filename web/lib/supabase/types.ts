export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      assigned_homework: {
        Row: {
          created_at: string
          grade_or_feedback: string | null
          id: string
          question: string
          session_id: string
          submitted_answer: string
        }
        Insert: {
          created_at?: string
          grade_or_feedback?: string | null
          id?: string
          question: string
          session_id: string
          submitted_answer: string
        }
        Update: {
          created_at?: string
          grade_or_feedback?: string | null
          id?: string
          question?: string
          session_id?: string
          submitted_answer?: string
        }
        Relationships: [
          {
            foreignKeyName: "assigned_homework_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "class_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      class_sessions: {
        Row: {
          closed_at: string | null
          course_id: string
          created_at: string
          id: string
          session_date: string
        }
        Insert: {
          closed_at?: string | null
          course_id: string
          created_at?: string
          id?: string
          session_date: string
        }
        Update: {
          closed_at?: string | null
          course_id?: string
          created_at?: string
          id?: string
          session_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_sessions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          end_date: string | null
          final_date: string | null
          final_grade: Database["public"]["Enums"]["grade"] | null
          id: string
          is_certified: boolean | null
          midterm_date: string | null
          midterm_grade: Database["public"]["Enums"]["grade"] | null
          name: string
          start_date: string | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          final_date?: string | null
          final_grade?: Database["public"]["Enums"]["grade"] | null
          id?: string
          is_certified?: boolean | null
          midterm_date?: string | null
          midterm_grade?: Database["public"]["Enums"]["grade"] | null
          name: string
          start_date?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          final_date?: string | null
          final_grade?: Database["public"]["Enums"]["grade"] | null
          id?: string
          is_certified?: boolean | null
          midterm_date?: string | null
          midterm_grade?: Database["public"]["Enums"]["grade"] | null
          name?: string
          start_date?: string | null
        }
        Relationships: []
      }
      digests: {
        Row: {
          confusions: string
          created_at: string
          id: string
          one_liner: string
          session_id: string
          summary: string
          understood_concept: string
        }
        Insert: {
          confusions: string
          created_at?: string
          id?: string
          one_liner: string
          session_id: string
          summary: string
          understood_concept: string
        }
        Update: {
          confusions?: string
          created_at?: string
          id?: string
          one_liner?: string
          session_id?: string
          summary?: string
          understood_concept?: string
        }
        Relationships: [
          {
            foreignKeyName: "digests_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "class_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_homework: {
        Row: {
          correct_answer_explanation: string
          created_at: string
          id: string
          is_correct: boolean
          question: string
          session_id: string | null
          technique_id: string | null
          technique_name: string
          user_answer: string
        }
        Insert: {
          correct_answer_explanation: string
          created_at?: string
          id?: string
          is_correct: boolean
          question: string
          session_id?: string | null
          technique_id?: string | null
          technique_name: string
          user_answer: string
        }
        Update: {
          correct_answer_explanation?: string
          created_at?: string
          id?: string
          is_correct?: boolean
          question?: string
          session_id?: string | null
          technique_id?: string | null
          technique_name?: string
          user_answer?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_homework_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "class_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_homework_technique_id_fkey"
            columns: ["technique_id"]
            isOneToOne: false
            referencedRelation: "techniques"
            referencedColumns: ["id"]
          },
        ]
      }
      lecture_files: {
        Row: {
          course_id: string
          file_name: string
          id: string
          storage_path: string
          techniques_generated: boolean
          uploaded_at: string
        }
        Insert: {
          course_id: string
          file_name: string
          id?: string
          storage_path: string
          techniques_generated?: boolean
          uploaded_at?: string
        }
        Update: {
          course_id?: string
          file_name?: string
          id?: string
          storage_path?: string
          techniques_generated?: boolean
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lecture_files_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      session_files: {
        Row: {
          lecture_file_id: string
          session_id: string
        }
        Insert: {
          lecture_file_id: string
          session_id: string
        }
        Update: {
          lecture_file_id?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_files_lecture_file_id_fkey"
            columns: ["lecture_file_id"]
            isOneToOne: false
            referencedRelation: "lecture_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_files_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "class_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      technique_history: {
        Row: {
          activity: string
          created_at: string
          date: string
          delta: number
          id: string
          note: string | null
          result: number
          technique_id: string
        }
        Insert: {
          activity: string
          created_at?: string
          date: string
          delta: number
          id?: string
          note?: string | null
          result: number
          technique_id: string
        }
        Update: {
          activity?: string
          created_at?: string
          date?: string
          delta?: number
          id?: string
          note?: string | null
          result?: number
          technique_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "technique_history_technique_id_fkey"
            columns: ["technique_id"]
            isOneToOne: false
            referencedRelation: "techniques"
            referencedColumns: ["id"]
          },
        ]
      }
      technique_prerequisites: {
        Row: {
          prerequisite_id: string
          technique_id: string
        }
        Insert: {
          prerequisite_id: string
          technique_id: string
        }
        Update: {
          prerequisite_id?: string
          technique_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "technique_prerequisites_prerequisite_id_fkey"
            columns: ["prerequisite_id"]
            isOneToOne: false
            referencedRelation: "techniques"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "technique_prerequisites_technique_id_fkey"
            columns: ["technique_id"]
            isOneToOne: false
            referencedRelation: "techniques"
            referencedColumns: ["id"]
          },
        ]
      }
      technique_reviews: {
        Row: {
          central_agent: string
          central_verdict: string
          id: string
          note: string | null
          nova_verdict: string
          reviewed_at: string
          technique_id: string
        }
        Insert: {
          central_agent: string
          central_verdict: string
          id?: string
          note?: string | null
          nova_verdict: string
          reviewed_at?: string
          technique_id: string
        }
        Update: {
          central_agent?: string
          central_verdict?: string
          id?: string
          note?: string | null
          nova_verdict?: string
          reviewed_at?: string
          technique_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "technique_reviews_technique_id_fkey"
            columns: ["technique_id"]
            isOneToOne: false
            referencedRelation: "techniques"
            referencedColumns: ["id"]
          },
        ]
      }
      technique_sources: {
        Row: {
          source_file: string
          technique_id: string
        }
        Insert: {
          source_file: string
          technique_id: string
        }
        Update: {
          source_file?: string
          technique_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "technique_sources_technique_id_fkey"
            columns: ["technique_id"]
            isOneToOne: false
            referencedRelation: "techniques"
            referencedColumns: ["id"]
          },
        ]
      }
      techniques: {
        Row: {
          content_type: string | null
          created_at: string
          explanation: string | null
          id: string
          last_reviewed: string | null
          reasoning: string | null
          score: number
          skill_name: string
          slug: string
          status: string | null
          subject: string
          unit: string | null
          use_case: string | null
          use_case_source: string | null
        }
        Insert: {
          content_type?: string | null
          created_at?: string
          explanation?: string | null
          id?: string
          last_reviewed?: string | null
          reasoning?: string | null
          score?: number
          skill_name: string
          slug: string
          status?: string | null
          subject: string
          unit?: string | null
          use_case?: string | null
          use_case_source?: string | null
        }
        Update: {
          content_type?: string | null
          created_at?: string
          explanation?: string | null
          id?: string
          last_reviewed?: string | null
          reasoning?: string | null
          score?: number
          skill_name?: string
          slug?: string
          status?: string | null
          subject?: string
          unit?: string | null
          use_case?: string | null
          use_case_source?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      grade: "F" | "D" | "D+" | "C" | "C+" | "B" | "B+" | "A"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      grade: ["F", "D", "D+", "C", "C+", "B", "B+", "A"],
    },
  },
} as const
