import { supabase } from "./supabase";
import { Database } from "../types/supabase";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Couple = Database["public"]["Tables"]["couples"]["Row"];
export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
export type Saving = Database["public"]["Tables"]["savings"]["Row"];

export async function getProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data;
}

export async function getCouple() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("couples")
    .select(
      `
      *,
      partner1:profiles!couples_partner1_id_fkey(*),
      partner2:profiles!couples_partner2_id_fkey(*)
    `,
    )
    .or(`partner1_id.eq.${user.id},partner2_id.eq.${user.id}`)
    .single();

  return data;
}

export async function getTransactions() {
  const couple = await getCouple();
  if (!couple) return [];

  const { data } = await supabase
    .from("transactions")
    .select("*")
    .eq("couple_id", couple.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function getSavings() {
  const couple = await getCouple();
  if (!couple) return [];

  const { data } = await supabase
    .from("savings")
    .select("*")
    .eq("couple_id", couple.id);

  return data || [];
}

export async function addTransaction(
  transaction: Omit<
    Database["public"]["Tables"]["transactions"]["Insert"],
    "id" | "created_at" | "couple_id" | "partner_id"
  >,
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const couple = await getCouple();
  if (!user || !couple) return null;

  const { data, error } = await supabase
    .from("transactions")
    .insert({
      ...transaction,
      partner_id: user.id,
      couple_id: couple.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function addSaving(amount: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const couple = await getCouple();
  if (!user || !couple) return null;

  const { data, error } = await supabase
    .from("savings")
    .insert({
      amount,
      partner_id: user.id,
      couple_id: couple.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSavingsGoal(goal: number) {
  const couple = await getCouple();
  if (!couple) return null;

  const { data, error } = await supabase
    .from("couples")
    .update({ savings_goal: goal })
    .eq("id", couple.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
