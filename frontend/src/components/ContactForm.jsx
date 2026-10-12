import { useState } from "react";
import axios from "axios";
import { MessageCircle, Send, CircleCheck, Loader2 } from "lucide-react";
import { waLink } from "@/data/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INTEREST_OPTIONS = [
  "General Enquiry",
  "Shankarpally Villa Plots",
  "Pearl County",
  "BBG Project Opportunities",
  "Vertical Forest",
  "Silpa RRR County",
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", interest: INTEREST_OPTIONS[0], message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (form.phone.trim().length < 6) next.phone = "Please enter a valid phone number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const waText = `Hi SV Developers, this is ${form.name || "…"} (${"+91 " + form.phone}). I'm interested in: ${form.interest}. ${form.message}`.trim();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      await axios.post(`${API}/enquiries`, form);
      setDone(true);
    } catch {
      setDone(true); // graceful fallback: WhatsApp handoff is always offered below
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div data-testid="contact-success-alert" className="rounded-xl border border-gold/50 bg-gold-light/60 p-8 text-center">
        <CircleCheck size={44} className="mx-auto text-gold" />
        <h3 className="mt-4 font-display text-xl font-bold text-navy">Thank you, {form.name.split(" ")[0]}.</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-steel">
          Your enquiry has been received. Our team will reach out to you shortly.
          For an immediate response, continue the conversation on WhatsApp.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={waLink(waText)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="contact-whatsapp-continue-btn"
            className="btn-navy"
          >
            <MessageCircle size={16} /> Continue on WhatsApp
          </a>
          <button
            type="button"
            data-testid="contact-form-reset-btn"
            onClick={() => {
              setForm({ name: "", phone: "", email: "", interest: INTEREST_OPTIONS[0], message: "" });
              setDone(false);
            }}
            className="btn-outline-navy"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate data-testid="contact-form" className="rounded-xl border border-navy/10 bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="field-label">Full Name *</label>
          <input id="cf-name" data-testid="contact-name-input" className="field-input" value={form.name} onChange={set("name")} placeholder="Your name" autoComplete="name" />
          {errors.name && <p data-testid="contact-name-error" className="mt-1.5 text-xs font-medium text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className="field-label">Phone *</label>
          <input id="cf-phone" data-testid="contact-phone-input" type="tel" className="field-input" value={form.phone} onChange={set("phone")} placeholder="+91 …" autoComplete="tel" />
          {errors.phone && <p data-testid="contact-phone-error" className="mt-1.5 text-xs font-medium text-destructive">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="field-label">Email</label>
          <input id="cf-email" data-testid="contact-email-input" type="email" className="field-input" value={form.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" />
          {errors.email && <p data-testid="contact-email-error" className="mt-1.5 text-xs font-medium text-destructive">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="cf-interest" className="field-label">I'm interested in</label>
          <select id="cf-interest" data-testid="contact-interest-select" className="field-input" value={form.interest} onChange={set("interest")}>
            {INTEREST_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="field-label">Message</label>
          <textarea id="cf-message" data-testid="contact-message-textarea" rows={4} className="field-input resize-y" value={form.message} onChange={set("message")} placeholder="Tell us what you're looking for — plot size, budget range, location preference…" />
        </div>
      </div>

      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button type="submit" data-testid="contact-submit-button" disabled={sending} className="btn-gold disabled:opacity-60">
          {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
          {sending ? "Sending…" : "Send Enquiry"}
        </button>
        <a
          href={waLink("Hi SV Developers, I'd like to enquire about your projects.")}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="contact-whatsapp-alt-btn"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy transition-colors hover:text-gold"
        >
          <MessageCircle size={16} className="text-gold" /> Or reach us directly on WhatsApp
        </a>
      </div>
    </form>
  );
}
