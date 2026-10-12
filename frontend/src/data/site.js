export const SITE = {
  name: "SV Developers",
  tagline: "Building Your Future",
  positioning: "Your Trusted Real Estate Partner in Hyderabad",
  phoneDisplay: "+91 93475 30281",
  phoneHref: "tel:+919347530281",
  whatsappNumber: "919347530281",
  whatsapp: "https://wa.me/919347530281",
  location: "Hyderabad, Telangana, India",
  experienceNote:
    "SV Developers is a newly established company. “55 years” refers to the combined industry experience of our six-member core team.",
};

// Drop the official logo file into /public (e.g. /public/sv-logo.png) and set
// this to "/sv-logo.png". Until then a crafted navy-and-gold lockup is shown.
export const LOGO_URL = null;

export const waLink = (text) =>
  `${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Our Team", to: "/team" },
  { label: "Why Choose Us", to: "/why-choose-us" },
  { label: "Contact", to: "/contact" },
];
