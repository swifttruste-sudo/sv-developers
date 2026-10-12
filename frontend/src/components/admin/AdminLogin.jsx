import { useState } from "react";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import Logo from "@/components/Logo";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function formatApiErrorDetail(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).filter(Boolean).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { data } = await axios.post(`${API}/admin/login`, { email, password }, { withCredentials: true });
      onLogin(data);
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-ivory px-5 py-32">
      <form onSubmit={submit} data-testid="admin-login-form" className="w-full max-w-md rounded-xl border border-navy/10 bg-white p-8 shadow-card sm:p-10">
        <div className="flex justify-center">
          <Logo imgClassName="h-14 w-auto" />
        </div>
        <h1 className="mt-8 text-center font-display text-2xl font-bold text-navy">Admin Panel</h1>
        <p className="mt-2 text-center text-sm text-steel">Sign in to view and reply to enquiries.</p>

        {error && (
          <p data-testid="admin-login-error" className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
            {error}
          </p>
        )}

        <div className="mt-6">
          <label htmlFor="admin-email" className="field-label">Email</label>
          <input id="admin-email" data-testid="admin-email-input" type="email" autoComplete="username" className="field-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@svdevelopers.in" required />
        </div>
        <div className="mt-4">
          <label htmlFor="admin-password" className="field-label">Password</label>
          <input id="admin-password" data-testid="admin-password-input" type="password" autoComplete="current-password" className="field-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
        </div>

        <button type="submit" data-testid="admin-login-button" disabled={busy} className="btn-gold mt-7 w-full disabled:opacity-60">
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Lock size={15} />}
          {busy ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
