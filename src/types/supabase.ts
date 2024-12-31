export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          avatar_url: string;
          email: string;
        };
        Insert: {
          id: string;
          created_at?: string;
          name: string;
          avatar_url?: string;
          email: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          avatar_url?: string;
          email?: string;
        };
      };
      couples: {
        Row: {
          id: string;
          created_at: string;
          partner1_id: string;
          partner2_id: string;
          savings_goal: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          partner1_id: string;
          partner2_id: string;
          savings_goal: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          partner1_id?: string;
          partner2_id?: string;
          savings_goal?: number;
        };
      };
      transactions: {
        Row: {
          id: string;
          created_at: string;
          description: string;
          amount: number;
          category: string;
          type: "personal" | "joint";
          partner_id: string;
          couple_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          description: string;
          amount: number;
          category: string;
          type: "personal" | "joint";
          partner_id: string;
          couple_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          description?: string;
          amount?: number;
          category?: string;
          type?: "personal" | "joint";
          partner_id?: string;
          couple_id?: string;
        };
      };
      savings: {
        Row: {
          id: string;
          created_at: string;
          amount: number;
          partner_id: string;
          couple_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          amount: number;
          partner_id: string;
          couple_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          amount?: number;
          partner_id?: string;
          couple_id?: string;
        };
      };
    };
  };
}
