export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      deaf_auth_settings: {
        Row: {
          created_at: string | null
          custom_settings: Json | null
          haptic_feedback_enabled: boolean | null
          id: number
          project_id: number | null
          sign_language_support: string[] | null
          updated_at: string | null
          video_verification_enabled: boolean | null
          visual_cues_enabled: boolean | null
        }
        Insert: {
          created_at?: string | null
          custom_settings?: Json | null
          haptic_feedback_enabled?: boolean | null
          id?: never
          project_id?: number | null
          sign_language_support?: string[] | null
          updated_at?: string | null
          video_verification_enabled?: boolean | null
          visual_cues_enabled?: boolean | null
        }
        Update: {
          created_at?: string | null
          custom_settings?: Json | null
          haptic_feedback_enabled?: boolean | null
          id?: never
          project_id?: number | null
          sign_language_support?: string[] | null
          updated_at?: string | null
          video_verification_enabled?: boolean | null
          visual_cues_enabled?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "deaf_auth_settings_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      mcp_audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          event: string
          id: string
          ip_address: string | null
          service: string
          severity: string | null
          timestamp: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          event: string
          id: string
          ip_address?: string | null
          service: string
          severity?: string | null
          timestamp: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          event?: string
          id?: string
          ip_address?: string | null
          service?: string
          severity?: string | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      mcp_config: {
        Row: {
          api_url: string
          created_at: string | null
          environment: string
          features: Json | null
          id: number
          integrations: Json | null
          security_level: string | null
          service_name: string
          updated_at: string | null
          version: string
        }
        Insert: {
          api_url: string
          created_at?: string | null
          environment: string
          features?: Json | null
          id?: never
          integrations?: Json | null
          security_level?: string | null
          service_name: string
          updated_at?: string | null
          version: string
        }
        Update: {
          api_url?: string
          created_at?: string | null
          environment?: string
          features?: Json | null
          id?: never
          integrations?: Json | null
          security_level?: string | null
          service_name?: string
          updated_at?: string | null
          version?: string
        }
        Relationships: []
      }
      mcp_system_metrics: {
        Row: {
          active_users: number
          average_response_time: number
          cpu_usage: number
          error_rate: number
          id: number
          memory_usage: number
          storage_usage: Json | null
          timestamp: string | null
          total_requests: number
        }
        Insert: {
          active_users: number
          average_response_time: number
          cpu_usage: number
          error_rate: number
          id?: never
          memory_usage: number
          storage_usage?: Json | null
          timestamp?: string | null
          total_requests: number
        }
        Update: {
          active_users?: number
          average_response_time?: number
          cpu_usage?: number
          error_rate?: number
          id?: never
          memory_usage?: number
          storage_usage?: Json | null
          timestamp?: string | null
          total_requests?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          accessibility_settings: Json | null
          avatar_url: string | null
          full_name: string | null
          id: string
          is_deaf: boolean | null
          preferred_communication_method: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          accessibility_settings?: Json | null
          avatar_url?: string | null
          full_name?: string | null
          id: string
          is_deaf?: boolean | null
          preferred_communication_method?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          accessibility_settings?: Json | null
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          is_deaf?: boolean | null
          preferred_communication_method?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          auto_deploy_enabled: boolean | null
          client_id: string | null
          created_at: string | null
          deaf_auth_enabled: boolean | null
          description: string | null
          fibonrose_enabled: boolean | null
          github_repo: string | null
          id: number
          name: string
          pink_sync_enabled: boolean | null
          settings: Json | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          auto_deploy_enabled?: boolean | null
          client_id?: string | null
          created_at?: string | null
          deaf_auth_enabled?: boolean | null
          description?: string | null
          fibonrose_enabled?: boolean | null
          github_repo?: string | null
          id?: never
          name: string
          pink_sync_enabled?: boolean | null
          settings?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_deploy_enabled?: boolean | null
          client_id?: string | null
          created_at?: string | null
          deaf_auth_enabled?: boolean | null
          description?: string | null
          fibonrose_enabled?: boolean | null
          github_repo?: string | null
          id?: never
          name?: string
          pink_sync_enabled?: boolean | null
          settings?: Json | null
          status?: string | null
          updated_at?: string | null
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
