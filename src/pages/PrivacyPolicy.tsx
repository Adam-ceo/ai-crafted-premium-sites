import LegalLayout from "@/components/LegalLayout";

const sections = [
  {
    heading: "Introduction",
    paragraphs: [
      "Luxiflow (\"we\", \"us\", \"our\") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect personal data when you visit luxiflow.io or engage our services.",
      "We comply with the EU General Data Protection Regulation (GDPR) and applicable Hungarian data protection law.",
    ],
  },
  {
    heading: "Data we collect",
    paragraphs: [
      "When you submit our contact form, we collect: your full name, email address, indicated budget range, and the project description you provide.",
      "When you book a discovery call through our scheduling provider, that provider may collect additional information such as your time zone and preferred meeting time.",
      "We do not collect, store, or use any analytics, advertising, or tracking cookies.",
    ],
  },
  {
    heading: "Why we process your data",
    paragraphs: [
      "We process your contact form data on the legal basis of pre-contractual interest: to respond to your enquiry and to scope a potential engagement.",
      "If we enter into a service agreement, we process your data on the legal basis of contract performance.",
    ],
  },
  {
    heading: "Third-party processors",
    paragraphs: [
      "Contact form submissions are delivered to our inbox using EmailJS, a third-party email-routing service. EmailJS processes your message strictly to deliver it to us and applies its own privacy and security controls.",
      "Discovery calls are scheduled using Calendly. Calendly collects scheduling-related data subject to its own privacy policy.",
      "We do not sell, rent, or trade your personal data with any party.",
    ],
  },
  {
    heading: "Data retention",
    paragraphs: [
      "We retain enquiry data for a maximum of 24 months from your last interaction with us, after which it is permanently deleted.",
      "Where we enter into a service agreement, contract-related data is retained for the period required by applicable tax and accounting law (typically eight years in Hungary).",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "Under GDPR you have the right to access, rectify, erase, restrict, port, and object to the processing of your personal data, and to withdraw any consent you have given.",
      "To exercise any of these rights, email us at hello@luxiflow.io. We will respond within 30 days.",
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "We apply reasonable technical and organisational measures to protect your data, including encrypted transit (HTTPS), restricted access, and use of reputable processors.",
    ],
  },
  {
    heading: "International transfers",
    paragraphs: [
      "Some of our processors may store data outside the European Economic Area. Where this happens, we rely on standard contractual clauses or equivalent safeguards.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "For any privacy-related question, contact us at hello@luxiflow.io. You also have the right to lodge a complaint with the Hungarian National Authority for Data Protection and Freedom of Information (NAIH).",
    ],
  },
];

export default function PrivacyPolicy() {
  return <LegalLayout title="Privacy Policy" sections={sections} />;
}
