import { useEffect, useState } from "react";
import axios from "axios";
import { MessageCircle, RefreshCw, Send } from "lucide-react";
import { formatApiErrorDetail } from "@/components/admin/AdminLogin";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// API serializes the Mongo id under the alias "_id"
const withId = (doc) => ({ ...doc, id: doc._id || doc.id });

const waNumber = (phone) => {
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  return `91${digits}`;
};

function EnquiryCard({ enquiry, onReplied }) {
  const [reply, setReply] = useState("");
  const [openReply, setOpenReply] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const waMessage = `Hello ${enquiry.name}, thank you for your enquiry with SV Developers about "${enquiry.interest || "our projects"}". ${reply}`;

  const sendReply = async (viaWhatsApp) => {
    if (!reply.trim()) return;
    setBusy(true);
    setError("");
    try {
      const { data } = await axios.post(
        `${API}/admin/enquiries/${enquiry.id}/reply`,
        { reply },
        { withCredentials: true }
      );
      if (viaWhatsApp) {
        window.open(`https://wa.me/${waNumber(enquiry.phone)}?text=${encodeURIComponent(waMessage)}`, "_blank");
      }
      onReplied(data);
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  return (
    <article data-testid={`admin-enquiry-card-${enquiry.id}`} className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold text-navy" data-testid="admin-enquiry-name">{enquiry.name}</p>
          <p className="text-[13px] text-steel">{enquiry.phone}{enquiry.email ? ` · ${enquiry.email}` : ""}</p>
        </div>
        <div className="text-right">
          <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${enquiry.replied_at ? "border-navy/25 bg-ice text-navy" : "border-gold/60 bg-gold/10 text-[#9a6c00]"}`} data-testid="admin-enquiry-status">
            {enquiry.replied_at ? "Replied" : "New"}
          </span>
          <p className="mt-1.5 text-[11px] text-steel">{new Date(enquiry.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>
        </div>
      </div>

      <p className="mt-3 text-[13px] font-semibold text-navy">Interest: {enquiry.interest || "—"}</p>
      {enquiry.message && <p className="mt-2 rounded-lg bg-ivory px-4 py-3 text-sm leading-6 text-charcoal" data-testid="admin-enquiry-message">{enquiry.message}</p>}
      {enquiry.reply_text && (
        <p className="mt-2 rounded-lg border-l-2 border-gold bg-gold-light/40 px-4 py-3 text-sm leading-6 text-charcoal" data-testid="admin-enquiry-reply">
          <span className="font-semibold text-navy">Your reply: </span>{enquiry.reply_text}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!openReply ? (
          <button type="button" data-testid={`admin-reply-toggle-${enquiry.id}`} onClick={() => setOpenReply(true)} className="btn-outline-navy !px-4 !py-2 !text-[11px]">
            <MessageCircle size={14} /> {enquiry.replied_at ? "Reply again" : "Reply"}
          </button>
        ) : (
          <>
            <textarea
              data-testid={`admin-reply-input-${enquiry.id}`}
              rows={3}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply — it will be sent via WhatsApp with a greeting prefix…"
              className="field-input w-full sm:w-auto sm:flex-1"
            />
            <div className="flex gap-2">
              <button type="button" data-testid={`admin-reply-whatsapp-${enquiry.id}`} disabled={busy || !reply.trim()} onClick={() => sendReply(true)} className="btn-gold !px-4 !py-2 !text-[11px] disabled:opacity-50">
                <Send size={13} /> {busy ? "Saving…" : "Send via WhatsApp"}
              </button>
              <button type="button" data-testid={`admin-reply-save-${enquiry.id}`} disabled={busy || !reply.trim()} onClick={() => sendReply(false)} className="btn-outline-navy !px-4 !py-2 !text-[11px] disabled:opacity-50">
                Mark replied
              </button>
            </div>
          </>
        )}
      </div>
      {error && <p className="mt-3 text-xs font-medium text-destructive" data-testid="admin-reply-error">{error}</p>}
    </article>
  );
}

export default function AdminDashboard({ admin, onLogout }) {
  const [enquiries, setEnquiries] = useState(null);
  const [loadError, setLoadError] = useState("");

  const load = async () => {
    setLoadError("");
    try {
      const { data } = await axios.get(`${API}/admin/enquiries`, { withCredentials: true });
      setEnquiries(data.map(withId));
    } catch (err) {
      if (err.response?.status === 401) return onLogout();
      setLoadError(formatApiErrorDetail(err.response?.data?.detail));
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newCount = (enquiries || []).filter((e) => !e.replied_at).length;

  return (
    <section className="bg-ivory py-14 lg:py-20" data-testid="admin-dashboard">
      <div className="container-x max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-navy">Enquiries Inbox</h1>
            <p className="mt-1.5 text-sm text-steel" data-testid="admin-summary">
              Signed in as {admin?.email} · {enquiries ? `${enquiries.length} total · ${newCount} new` : "Loading…"}
            </p>
          </div>
          <div className="flex gap-3">
            <button type="button" data-testid="admin-refresh-button" onClick={load} className="btn-outline-navy !px-4 !py-2 !text-[11px]">
              <RefreshCw size={14} /> Refresh
            </button>
            <button type="button" data-testid="admin-logout-button" onClick={onLogout} className="btn-navy !px-4 !py-2 !text-[11px]">
              Sign Out
            </button>
          </div>
        </div>

        {loadError && <p className="mt-8 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive" data-testid="admin-load-error">{loadError}</p>}

        <div className="mt-10 space-y-5">
          {enquiries && enquiries.length === 0 && (
            <p className="rounded-xl border border-dashed border-navy/25 bg-white p-10 text-center text-sm text-steel" data-testid="admin-empty-state">
              No enquiries yet. Submissions from the website contact form will appear here.
            </p>
          )}
          {enquiries && enquiries.map((e) => (
            <EnquiryCard key={e.id} enquiry={e} onReplied={(updated) => setEnquiries((list) => list.map((x) => (x.id === withId(updated).id ? withId(updated) : x)))} />
          ))}
        </div>
      </div>
    </section>
  );
}
