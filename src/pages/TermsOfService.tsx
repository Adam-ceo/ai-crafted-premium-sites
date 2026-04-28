import LegalLayout from "@/components/LegalLayout";

const sections = [
  {
    heading: "Acceptance of terms",
    paragraphs: [
      "By engaging Luxiflow for any web design or development service, you (\"the Client\") agree to these Terms of Service in full.",
      "These terms form the contract between you and Luxiflow unless varied in writing by both parties.",
    ],
  },
  {
    heading: "Scope of services",
    paragraphs: [
      "Luxiflow provides bespoke website design, development, and related consultancy. The exact scope of any engagement is defined in a written project brief approved by both parties before work begins.",
      "Any work outside the agreed scope is treated as a change request and quoted separately.",
    ],
  },
  {
    heading: "Quotation and acceptance",
    paragraphs: [
      "All quotes are valid for 30 days from issue. A project is considered accepted once you confirm in writing and pay the agreed deposit.",
    ],
  },
  {
    heading: "Payment terms",
    paragraphs: [
      "A non-refundable deposit of 50 percent of the project fee is due before work begins. The balance is invoiced on completion and payable within 14 days.",
      "All prices are quoted in euros (EUR) and exclude VAT where applicable.",
      "Late payment may attract statutory interest in accordance with Hungarian law.",
    ],
  },
  {
    heading: "Client responsibilities",
    paragraphs: [
      "You agree to provide the content, brand assets, access credentials, and feedback required to keep the project on schedule. Delays caused by missing client input may extend the timeline correspondingly.",
    ],
  },
  {
    heading: "Revisions",
    paragraphs: [
      "Each engagement includes one round of revisions at the design stage and one at the development stage, as defined in the brief. Additional revisions are quoted separately.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "Until full payment is received, Luxiflow retains ownership of all design and code produced for the project.",
      "On receipt of final payment, all intellectual property rights in the deliverables transfer to the Client, with the exception of any third-party libraries or assets which remain subject to their respective licences.",
      "Luxiflow retains the right to display the completed work in its portfolio and case studies.",
    ],
  },
  {
    heading: "Post-launch support",
    paragraphs: [
      "Each project includes a 30-day post-launch support window during which Luxiflow will fix bugs and make minor adjustments at no extra cost.",
      "Support extending beyond 30 days, or covering new features, is provided under a separate retainer agreement.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "Luxiflow is not liable for any indirect, consequential, or incidental damages arising from the use of the deliverables. Total liability under any engagement is limited to the fees paid for that engagement.",
    ],
  },
  {
    heading: "Governing law and jurisdiction",
    paragraphs: [
      "These terms are governed by the laws of Hungary. Any dispute arising under them is subject to the exclusive jurisdiction of the Hungarian courts.",
    ],
  },
];

export default function TermsOfService() {
  return <LegalLayout title="Terms of Service" sections={sections} />;
}
