import { useEffect, useState } from "react";
import { Profile, Couple, Transaction, Saving } from "./queries";
import * as queries from "./queries";
import { supabase } from "./supabase";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    queries.getProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    });

    const channel = supabase
      .channel("profile-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
        },
        () => {
          queries.getProfile().then(setProfile);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { profile, loading };
}

export function useCouple() {
  const [couple, setCouple] = useState<Couple | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    queries.getCouple().then((data) => {
      setCouple(data);
      setLoading(false);
    });

    const channel = supabase
      .channel("couple-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "couples",
        },
        () => {
          queries.getCouple().then(setCouple);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { couple, loading };
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    queries.getTransactions().then((data) => {
      setTransactions(data);
      setLoading(false);
    });

    const channel = supabase
      .channel("transaction-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
        },
        () => {
          queries.getTransactions().then(setTransactions);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { transactions, loading };
}

export function useSavings() {
  const [savings, setSavings] = useState<Saving[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    queries.getSavings().then((data) => {
      setSavings(data);
      setLoading(false);
    });

    const channel = supabase
      .channel("savings-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "savings",
        },
        () => {
          queries.getSavings().then(setSavings);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { savings, loading };
}
