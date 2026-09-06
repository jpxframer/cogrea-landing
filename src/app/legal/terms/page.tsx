import type { Metadata } from "next";

import { GetStarted } from "@/components/get-started";
import { LegalDocument, MailLink, type LegalSection } from "@/components/legal-document";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Terms of Service — Cogrea",
  description:
    "The terms governing your access to and use of the Cogrea platform and related services.",
};

const INTRO =
  "Cogrea International Inc., doing business as Cogrea (“Cogrea,” “we,” “us,” or “our”), " +
  "respects the privacy of our users (“user,” “you,” or “your”). These Terms of Service " +
  "(“Terms”), along with our Privacy Policy, govern your access to and use of the Cogrea " +
  "platform and related services. By accessing or using Cogrea, you agree to be bound by " +
  "these Terms. Please read them carefully before proceeding.";

const sections: LegalSection[] = [
  {
    title: "Acceptance of Terms",
    blocks: [
      {
        kind: "p",
        content:
          "By registering for, accessing, or using our platform, you confirm that you have read, " +
          "understood, and agree to be legally bound by these Terms and our Privacy Policy. If you " +
          "do not agree to any part of these Terms, you may not use our platform or services. " +
          "These Terms constitute a legally binding agreement between you and Cogrea.",
      },
    ],
  },
  {
    title: "Modifications to the Terms",
    blocks: [
      {
        kind: "p",
        content:
          "Cogrea reserves the right, at our sole discretion, to modify, update, or replace these " +
          "Terms at any time. If we make material changes, we will notify you by updating the " +
          "“Effective Date” at the top of this page and, where appropriate, by posting a prominent " +
          "notice on the platform. Your continued use of the platform after any changes become " +
          "effective constitutes your acceptance of the revised Terms. It is your responsibility " +
          "to review these Terms periodically for updates.",
      },
    ],
  },
  {
    title: "License Grant",
    blocks: [
      {
        kind: "p",
        content:
          "Subject to your continued compliance with these Terms, Cogrea grants you a limited, " +
          "non-exclusive, non-transferable, and revocable license to access and use the platform " +
          "and its services solely for your personal, non-commercial use related to career " +
          "development, learning, and job search activities.",
      },
      { kind: "p", content: "This license does not permit:" },
      {
        kind: "ul",
        items: [
          "Any resale, sublicensing, or commercial exploitation of the platform or its content;",
          "The creation of derivative works based on any part of the platform, including its AI generated outputs;",
          "The use of data mining, web scraping, bots, or other automated tools to extract or interact with platform data;",
          "Circumventing or attempting to bypass any access or usage restrictions.",
          "All rights not expressly granted to you under these Terms are reserved by Cogrea and its licensors.",
        ],
      },
    ],
  },
  {
    title: "Restrictions on Use",
    blocks: [
      {
        kind: "p",
        content:
          "You agree to use the Cogrea platform solely for lawful purposes and in accordance with these Terms.",
      },
      { kind: "p", content: "You shall not:" },
      {
        kind: "ul",
        items: [
          "Use the platform in any manner that violates any applicable local, national, or international law or regulation;",
          "Use the platform to engage in any misleading, fraudulent, or unethical activity, including misrepresenting your identity, qualifications, or employment status;",
          "Access or attempt to access any data, systems, or content not intended for you;",
          "Use any automated system, including bots, scrapers, or spiders, to extract data or interact with the platform;",
          "Interfere with or disrupt the integrity, security, or performance of the platform or its underlying infrastructure;",
          "Attempt to reverse engineer, decompile, or otherwise access or derive the source code or algorithms of any part of the platform, including its AI models;",
          "Use the platform to transmit or upload any malicious code, viruses, or harmful content;",
          "Violate the intellectual property rights, privacy rights, or any other rights of Cogrea or third parties.",
        ],
      },
      {
        kind: "p",
        content:
          "Cogrea reserves the right to suspend or terminate access to the platform for any user who violates these restrictions.",
      },
    ],
  },
  {
    title: "Integration with Third-Party Institution APIs",
    blocks: [
      {
        kind: "p",
        content:
          "The Cogrea platform may integrate with third-party APIs, systems, or services, such as " +
          "educational institutions, employers, government databases, or job boards to enhance its " +
          "functionality and provide users with more personalized and effective career services.",
      },
      { kind: "p", content: "By using the platform, you acknowledge and agree that:" },
      {
        kind: "ul",
        items: [
          "Such integrations may involve the sharing or retrieval of your data with or from third party services;",
          "Cogrea is not responsible for the accuracy, availability, or reliability of data or services provided by third parties;",
          "Your use of third-party services may be subject to additional terms, conditions, or privacy policies imposed by those third parties;",
          "Cogrea is not liable for any damages or losses arising from your interaction with or reliance on third-party APIs or services.",
        ],
      },
      {
        kind: "p",
        content:
          "It is your responsibility to ensure that any data you submit to or retrieve via these " +
          "integrations complies with applicable laws and your own obligations to those third parties.",
      },
    ],
  },
  {
    title: "User Responsibilities",
    blocks: [
      {
        kind: "p",
        content:
          "You are solely responsible for maintaining the confidentiality of your account information, " +
          "including your username and password. You agree to accept responsibility for all " +
          "activities that occur under your account. If you believe that your account has been " +
          "compromised, you must immediately notify Cogrea.",
      },
      {
        kind: "p",
        content:
          "You are also responsible for ensuring that all information you provide to Cogrea is " +
          "accurate, complete, and up-to-date. You agree to promptly update your account " +
          "information if any changes occur.",
      },
    ],
  },
  {
    title: "Contact Information",
    blocks: [
      {
        kind: "p",
        content: (
          <>
            If you have any questions, concerns, or suggestions regarding these Terms, please write
            to us at <MailLink address="info@cogrea.com" />. We appreciate your feedback and will do
            our best to address any issues or inquiries in a timely manner.
          </>
        ),
      },
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <SiteHeader />
      <LegalDocument title="Terms of Service" intro={INTRO} sections={sections} />
      <GetStarted />
      <SiteFooter />
    </>
  );
}
