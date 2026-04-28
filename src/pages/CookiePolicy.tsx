import LegalLayout from "@/components/LegalLayout";

const sections = [
  {
    heading: "What cookies are",
    paragraphs: [
      "Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, or to work more efficiently.",
    ],
  },
  {
    heading: "How we use cookies",
    paragraphs: [
      "Luxiflow.io uses only technically necessary cookies. These are required for the basic operation of the site and cannot be switched off.",
      "We do not use any analytics, advertising, profiling, or social media tracking cookies on this site.",
    ],
  },
  {
    heading: "Necessary cookies in detail",
    paragraphs: [
      "We may set a session-level cookie used to remember consent preferences and to maintain basic page state. This cookie does not track you across websites and does not contain personal information.",
    ],
  },
  {
    heading: "Third-party cookies",
    paragraphs: [
      "If you choose to book a call via our external scheduling provider (Calendly), you will be navigating to a third-party domain. Cookies set on that domain are governed by their own cookie policy.",
    ],
  },
  {
    heading: "Managing cookies",
    paragraphs: [
      "You can control or delete cookies via your browser settings. Most browsers allow you to refuse cookies entirely, although doing so may affect site functionality.",
    ],
  },
  {
    heading: "Updates to this policy",
    paragraphs: [
      "We may update this Cookie Policy from time to time to reflect changes in technology or law. The latest version is always available at luxiflow.io/cookie-policy.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Questions about cookies on this site? Email hello@luxiflow.io.",
    ],
  },
];

export default function CookiePolicy() {
  return <LegalLayout title="Cookie Policy" sections={sections} />;
}
