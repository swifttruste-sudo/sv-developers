import { useEffect, useState } from "react";
import axios from "axios";
import PageMeta from "@/components/common/PageMeta";
import { FadePage } from "@/components/common/Reveal";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Admin() {
  const [checking, setChecking] = useState(true);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const robots = document.createElement("meta");
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "noindex");
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/admin/me`, { withCredentials: true })
      .then(({ data }) => setAdmin(data))
      .catch(() => setAdmin(null))
      .finally(() => setChecking(false));
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${API}/admin/logout`, {}, { withCredentials: true });
    } finally {
      setAdmin(null);
    }
  };

  return (
    <FadePage>
      <PageMeta title="Admin" description="SV Developers admin panel." />
      {checking ? (
        <div className="flex min-h-[80vh] items-center justify-center bg-ivory" data-testid="admin-checking">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent" />
        </div>
      ) : admin ? (
        <AdminDashboard admin={admin} onLogout={logout} />
      ) : (
        <AdminLogin onLogin={setAdmin} />
      )}
    </FadePage>
  );
}
