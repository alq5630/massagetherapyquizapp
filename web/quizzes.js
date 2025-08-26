// quizzes.js
// Define your quizzes here. Each quiz has a unique "id", a "title", and an array of questions.
// Question format:
// { type: 'MC'|'TF'|'SHORT', prompt: '...', options?: ['A. ...','B. ...',...], answer: 'B'|'TRUE'|'list|of|accepted', explanation?: '...' }

window.QUIZ_CATALOG = [
  {
    id: "ethics-01",
    title: "Ethics: Professional Boundaries (Set 1)",
    questions: [
      {
        type: "TF",
        prompt: "A dual relationship can sometimes be ethical with informed consent and supervision.",
        answer: "TRUE",
        explanation: "When unavoidable, transparency and documentation reduce risk."
      },
      {
        type: "MC",
        prompt: "Which action best maintains client autonomy?",
        options: ["A. Making decisions for the client", "B. Providing choices and informed consent", "C. Withholding risks to avoid anxiety", "D. Recommending without discussing alternatives"],
        answer: "B",
        explanation: "Informed choice respects autonomy."
      },
      {
        type: "SHORT",
        prompt: "Name one element of informed consent.",
        answer: "risks|benefits|alternatives|scope|privacy|confidentiality",
        explanation: "Key elements include risks, benefits, alternatives, scope, and privacy/confidentiality."
      }
    ]
  },
  {
    id: "a-and-p-01",
    title: "Anatomy & Physiology: Nerves (Set 1)",
    questions: [
      {
        type: "MC",
        prompt: "Which nerve innervates the diaphragm?",
        options: ["A. Vagus", "B. Phrenic", "C. Ulnar", "D. Median"],
        answer: "B",
        explanation: "C3–C5 keeps the diaphragm alive."
      },
      {
        type: "TF",
        prompt: "The radial nerve primarily supplies flexor muscles of the forearm.",
        answer: "FALSE",
        explanation: "Radial nerve mainly supplies extensors."
      },
      {
        type: "SHORT",
        prompt: "Name one primary hormone of the sympathetic response.",
        answer: "epinephrine|adrenaline|norepinephrine",
        explanation: "Any of these is acceptable."
      }
    ]
  }
];

// Email config (see script.js for how it's used)
// For Formspree, create a form and paste the endpoint URL here.
window.EMAIL_CONFIG = {
  ENABLE_EMAIL: true,
  ENDPOINT: "https://formspree.io/f/your_form_id_here", // <-- replace with your Formspree endpoint OR your own API endpoint
  TO_ADDRESS: "your_email@example.com", // used by some providers; Formspree reads from template
};
