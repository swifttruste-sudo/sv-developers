export const TEAM = [
  { name: "Suresh", role: "Managing Director", years: 10 },
  { name: "Rajashekar", role: "Core Team", years: 12 },
  { name: "DVS Prasad", role: "Core Team", years: 15 },
  { name: "Prasad", role: "Core Team", years: 10 },
  { name: "Venu", role: "Core Team", years: 4 },
  { name: "Srikanth", role: "Core Team", years: 4 },
];

export const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
