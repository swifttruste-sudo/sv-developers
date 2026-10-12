import { createContext, useContext, useEffect, useState } from "react";

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("sv-compare") || "[]");
      return Array.isArray(saved) ? saved.filter((x) => typeof x === "string").slice(0, 3) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("sv-compare", JSON.stringify(ids));
  }, [ids]);

  const toggle = (id) =>
    setIds((list) =>
      list.includes(id) ? list.filter((x) => x !== id) : list.length >= 3 ? list : [...list, id]
    );

  const clear = () => setIds([]);

  return (
    <CompareContext.Provider value={{ ids, toggle, clear, max: 3 }}>
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);
