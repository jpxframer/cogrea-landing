import type { Metadata } from "next";

import { GetStarted } from "@/components/get-started";
import { LegalDocument, MailLink, type LegalSection } from "@/components/legal-document";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Privacy Policy — Cogrea",
  description:
    "How Cogrea collects, uses, discloses and safeguards your information across our platform and related services.",
};

// The mobile frame repeats the Terms of Service intro; this is the desktop
// frame's Privacy-specific copy. See memory.md.
const INTRO =
  "Cogrea International Inc., doing business as Cogrea (“Cogrea,” “we,” “us,” or “our”), is " +
  "committed to protecting your privacy and handling your personal data with transparency " +
  "and care. This Privacy Policy explains how we collect, use, disclose, and safeguard your " +
  "information when you use our platform, applications, websites, and related services " +
  "(collectively, the “Services”).";

const sections: LegalSection[] = [
  {
    title: "1. Information We Collect",
    blocks: [
      { kind: "p", content: "We may collect the following categories of information:" },
      { kind: "p", content: "a. Information You Provide Directly" },
      {
        kind: "ul",
        items: [
          "Account Information: Name, email address, phone number, username, password, nationality, and other registration details.",
          "Profile Information: Education, skills, work history, certifications, career goals, and uploaded documents (e.g., resumes, cover letters).",
          "Payment Information: Payment card details, billing address, or other financial information (processed through third-party payment processors; we do not store full payment card numbers).",
          "Communications: Your messages, inquiries, feedback, or other correspondence with us.",
          "User-Generated Content: Posts, uploads, assessments, and any other content you submit through the platform.",
        ],
      },
      { kind: "p", content: "b. Information Collected Automatically" },
      { kind: "p", content: "When you use our Services, we may automatically collect:" },
      {
        kind: "ul",
        items: [
          "Device and browser information",
          "IP address and location data",
          "Usage data such as pages visited, features used, time spent, and clickstream data",
          "Log files, cookies, and similar tracking technologies (see Section 8: Cookies and Tracking)",
        ],
      },
      { kind: "p", content: "c. Information from Third Parties" },
      {
        kind: "ul",
        items: [
          "Integrated Services: Data from third-party APIs (e.g., educational institutions, employers, job boards) if you choose to connect them to your account.",
          "Public Sources: Professional profiles, public databases, and social media.",
        ],
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    blocks: [
      { kind: "p", content: "We use your information for the following purposes:" },
      {
        kind: "ol",
        items: [
          "To provide, maintain, and improve our Services.",
          "To personalize your user experience and career recommendations.",
          "To process transactions and manage your subscription.",
          "To communicate with you about your account, updates, or support requests.",
          "To verify your identity, qualifications, or employment history.",
          "To comply with legal obligations and enforce our Terms of Service.",
          "To detect, prevent, and address security or fraud issues.",
          "For research, analytics, and product development.",
        ],
      },
    ],
  },
  {
    title: "3. How We Share Your Information",
    blocks: [
      {
        kind: "p",
        content:
          "We do not sell your personal data. We may share your information only in the following cases:",
      },
      {
        kind: "ul",
        items: [
          "With Service Providers: Vendors and contractors who help us operate the platform, payment processors, hosting providers, and analytics tools.",
          "With Integrated Third Parties: Employers, educational institutions, or job boards if you choose to share your profile or connect accounts.",
          "For Legal Compliance: When required by law, legal process, or government request.",
          "For Business Transfers: In connection with a merger, acquisition, financing, or sale of assets.",
          "With Your Consent: In cases where you explicitly authorize sharing.",
        ],
      },
    ],
  },
  {
    title: "4. Your Privacy Rights",
    blocks: [
      { kind: "p", content: "Depending on where you live, you may have the following rights:" },
      {
        kind: "ul",
        items: [
          "Access & Portability: Request a copy of the personal data we hold about you.",
          "Correction: Request that we correct inaccurate or incomplete information.",
          "Deletion: Request that we delete your personal data, subject to legal obligations.",
          "Restriction: Request limits on how we use your information.",
          "Opt-Out of Marketing: Stop receiving promotional communications from us.",
          "Withdraw Consent: If we process your data based on consent, you may withdraw it at any time.",
        ],
      },
      {
        kind: "p",
        content: (
          <>
            To exercise your rights, contact us at <MailLink address="privacy@cogrea.com" />. We may
            require verification of your identity before processing your request.
          </>
        ),
      },
    ],
  },
  {
    title: "5. Data Retention",
    blocks: [
      { kind: "p", content: "We retain your personal data only for as long as necessary to:" },
      {
        kind: "ul",
        items: [
          "Provide our Services,",
          "Comply with legal obligations,",
          "Resolve disputes, and",
          "Enforce agreements.",
        ],
      },
      {
        kind: "p",
        content:
          "When no longer needed, your information will be securely deleted or anonymized.",
      },
    ],
  },
  {
    title: "6. Changes to This Privacy Policy",
    blocks: [
      {
        kind: "p",
        content:
          "We may update this Privacy Policy from time to time. If we make material changes, we will " +
          "update the “Effective Date” and notify you as required by law. Your continued use of the " +
          "Services after changes take effect constitutes acceptance of the revised policy.",
      },
    ],
  },
  {
    title: "Contact Information",
    blocks: [
      {
        kind: "p",
        content:
          "If you have questions, concerns, or complaints regarding this Privacy Policy or our " +
          "privacy practices, contact us at: Cogrea International Inc.",
      },
      {
        kind: "p",
        content: (
          <>
            Email: <MailLink address="privacy@cogrea.com" />
          </>
        ),
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <LegalDocument title="Privacy Policy" intro={INTRO} sections={sections} />
      <GetStarted />
      <SiteFooter />
    </>
  );
}
