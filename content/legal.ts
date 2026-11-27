// DRAFT legal text for HRSM to review (ideally with a lawyer) before launch.

export type LegalSection = { heading: string; body: string[] }
export type LegalDoc = {
  title: string
  intro: string
  updated: string
  sections: LegalSection[]
}

const updated = "27 November 2026"

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  updated,
  intro:
    "This policy explains what information HRSM collects through this website, how we use it, and the choices you have.",
  sections: [
    {
      heading: "Information we collect",
      body: [
        "When you send an inquiry we collect the details you enter: your name, company, email address, phone number, project location, estimated budget, and message.",
        "Like most websites, we may also collect basic usage information such as pages visited and device type through analytics tools.",
      ],
    },
    {
      heading: "How we use your information",
      body: [
        "We use inquiry details only to respond to you, prepare quotes, and manage our business relationship with you. We do not sell your personal information.",
        "Analytics information helps us understand how the website is used and how to improve it.",
      ],
    },
    {
      heading: "Sharing and storage",
      body: [
        "Your information is stored securely and shared only with service providers that help us run the website and send email, and only as needed for those services.",
        "We keep inquiry details for as long as needed to handle your request and meet our legal and business obligations.",
      ],
    },
    {
      heading: "Cookies",
      body: [
        "This website uses essential cookies for security and, where enabled, analytics cookies. You can block cookies in your browser settings, though some features may not work.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        "You may ask us to access, correct, or delete the personal information we hold about you by contacting us using the details on the Contact page.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        "We may update this policy from time to time. The date at the top shows when it was last changed.",
      ],
    },
  ],
}

export const termsOfUse: LegalDoc = {
  title: "Terms",
  updated,
  intro:
    "By using this website you agree to these terms. If you do not agree, please do not use the site.",
  sections: [
    {
      heading: "Use of this website",
      body: [
        "The content on this website is provided for general information about HRSM and its services. You agree to use it lawfully and not to interfere with its operation.",
      ],
    },
    {
      heading: "No offer or contract",
      body: [
        "Information on this website, including descriptions of services and projects, is not a binding offer. Any work is subject to a written agreement between HRSM and the client.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "The text, images, logos, and design on this website belong to HRSM or its licensors. You may not copy or reuse them without written permission.",
      ],
    },
    {
      heading: "Accuracy and liability",
      body: [
        "We work to keep the website accurate and up to date but do not guarantee that it is free of errors. HRSM is not liable for losses arising from your use of the website or from links to third-party sites.",
      ],
    },
    {
      heading: "Changes and governing law",
      body: [
        "We may change these terms at any time by updating this page. These terms are governed by the laws of Bangladesh.",
      ],
    },
  ],
}
