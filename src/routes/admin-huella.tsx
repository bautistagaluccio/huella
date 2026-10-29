import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Enquiry = Tables<"enquiries">;
const STATUSES = ["new", "contacted", "proposal", "won", "lost"] as const;

export const Route = createFileRoute("/admin-huella")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Huella Admin — Enquiries" },
      { name: "description", content: "Private Huella workspace for managing trip enquiries." },
      { property: "og:title", content: "Huella Admin" },
      { property: "og:description", content: "Private Huella enquiry management." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const input =
  "w-full rounded-full bg-cream/70 px-5 py-3 text-[14px] ring-1 ring-ink/10 outline-none placeholder:text-ink/40 focus:ring-clay/50";
const btn =
  "rounded-full bg-ink px-6 py-3 text-[12px] uppercase tracking-[0.14em] text-cream transition-colors hover:bg-clay disabled:opacity-60";

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!ready) return <Shell><p className="text-ink/50">Loading…</p></Shell>;
  if (!session) return <Shell><Login /></Shell>;
  return <Shell email={session.user.email}><Gate userId={session.user.id} /></Shell>;
}

function Shell({ children, email }: { children: React.ReactNode; email?: string | undefined }) {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="mx-auto flex max-w-[1360px] items-center justify-between px-6 py-6">
        <a href="/" className="flex items-center gap-3">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-clay" />
          <span className="font-display text-[15px] font-medium uppercase tracking-[0.3em]">Huella</span>
          <span className="text-[11px] uppercase tracking-[0.25em] text-clay">Admin</span>
        </a>
        {email && (
          <div className="flex items-center gap-4 text-[13px] text-ink/60">
            <span className="hidden sm:inline">{email}</span>
            <button onClick={() => supabase.auth.signOut()} className="underline hover:text-clay">
              Sign out
            </button>
          </div>
        )}
      </header>
      <main className="mx-auto max-w-[1360px] px-6 pb-24">{children}</main>
    </div>
  );
}

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <div className="mx-auto mt-16 max-w-md rounded-[14px] bg-sand p-8 ring-1 ring-ink/5">
      <h1 className="font-display text-[2rem] font-medium">
        {mode === "in" ? "Sign in" : "Create account"}
      </h1>
      <form
        className="mt-6 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setMsg(null);
          if (mode === "in") {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) setMsg(error.message);
          } else {
            const { error } = await supabase.auth.signUp({
              email,
              password,
              options: { emailRedirectTo: `${window.location.origin}/admin-huella` },
            });
            setMsg(error ? error.message : "Check your email to confirm your account.");
          }
          setBusy(false);
        }}
      >
        <input className={input} type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={input} type="password" required minLength={8} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {msg && <p className="text-[13px] text-clay">{msg}</p>}
        <button className={btn} disabled={busy}>{mode === "in" ? "Sign in" : "Sign up"}</button>
      </form>
      <button
        onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg(null); }}
        className="mt-5 text-[13px] text-ink/60 underline hover:text-clay"
      >
        {mode === "in" ? "No account yet? Create one" : "Have an account? Sign in"}
      </button>
    </div>
  );
}

function Gate({ userId }: { userId: string }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  useEffect(() => {
    supabase.rpc("has_role", { _user_id: userId, _role: "admin" }).then(({ data }) => setIsAdmin(!!data));
  }, [userId]);
  if (isAdmin === null) return <p className="text-ink/50">Checking access…</p>;
  if (!isAdmin)
    return (
      <div className="mx-auto mt-16 max-w-md text-center">
        <h1 className="font-display text-[1.8rem] font-medium">No access yet</h1>
        <p className="mt-3 text-[14px] text-ink/60">This account isn't an administrator.</p>
      </div>
    );
  return <Cases />;
}

function Cases() {
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
  }, []);
  useEffect(() => { load(); }, [load]);

  const update = async (id: string, patch: Partial<Enquiry>) => {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));
    await supabase.from("enquiries").update(patch).eq("id", id);
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this enquiry permanently?")) return;
    await supabase.from("enquiries").delete().eq("id", id);
    setRows((r) => r.filter((x) => x.id !== id));
  };

  const shown = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-medium">Enquiries</h1>
        <div className="flex flex-wrap gap-2">
          {["all", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-4 py-2 text-[12px] uppercase tracking-[0.12em] ring-1 ring-ink/10 ${
                filter === s ? "bg-ink text-cream" : "bg-cream hover:text-clay"
              }`}
            >
              {s} ({s === "all" ? rows.length : rows.filter((r) => r.status === s).length})
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {shown.length === 0 && <p className="text-ink/50">No enquiries here yet.</p>}
        {shown.map((r) => (
          <div key={r.id} className="rounded-[14px] bg-sand p-5 ring-1 ring-ink/5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button className="text-left" onClick={() => setOpenId(openId === r.id ? null : r.id)}>
                <p className="font-display text-[1.25rem] font-medium">{r.full_name}</p>
                <p className="text-[13px] text-ink/60">
                  {r.discipline} · {r.email} · {new Date(r.created_at).toLocaleString()}
                </p>
              </button>
              <select
                value={r.status}
                onChange={(e) => update(r.id, { status: e.target.value })}
                className="rounded-full bg-cream px-4 py-2 text-[13px] uppercase tracking-[0.1em] ring-1 ring-ink/10 outline-none"
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            {openId === r.id && (
              <div className="mt-5 space-y-4 border-t border-ink/10 pt-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-clay">Message</p>
                  <p className="mt-1 whitespace-pre-wrap text-[14px] text-ink/80">{r.message || "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-clay">Internal notes</p>
                  <textarea
                    defaultValue={r.notes ?? ""}
                    maxLength={5000}
                    rows={3}
                    onBlur={(e) => update(r.id, { notes: e.target.value || null })}
                    className="mt-1 w-full rounded-[14px] bg-cream/70 px-4 py-3 text-[14px] ring-1 ring-ink/10 outline-none focus:ring-clay/50"
                    placeholder="Notes save when you click away"
                  />
                </div>
                <div className="flex gap-4">
                  <a href={`mailto:${r.email}`} className={btn}>Reply by email</a>
                  <button onClick={() => remove(r.id)} className="text-[13px] text-ink/50 underline hover:text-clay">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
