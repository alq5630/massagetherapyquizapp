// quizzes.js
// Define your quizzes here. Each quiz has a unique "id", a "title", and an array of questions.
// Question format:
// { type: 'MC'|'TF'|'SHORT', prompt: '...', options?: ['A. ...','B. ...',...], answer: 'B'|'TRUE'|'list|of|accepted', explanation?: '...' }

window.QUIZ_CATALOG = [
  // --- Chapter 3 FIRST ---
  {
    id: "chapter-3-tools-of-the-trade",
    title: "Chapter 3: Tools of the Trade",
    questions: [
      { type: "MC", prompt: "Which type of massage table is used most often by therapists?",
        options: ["A. Stationary table", "B. Portable table", "C. Hydrotherapy table", "D. Electric lift table"],
        answer: "B", explanation: "Portable tables are most common, about 95% of all tables sold." },
      { type: "MC", prompt: "What is the typical width of a massage table?",
        options: ["A. 18–20 inches", "B. 22–24 inches", "C. 28–33 inches", "D. 36–40 inches"],
        answer: "C", explanation: "Most massage tables are between 28–33 inches wide." },
      { type: "MC", prompt: "Which table frame is lighter and allows quicker height adjustments?",
        options: ["A. Steel", "B. Aluminum", "C. Wood", "D. Plastic"],
        answer: "B", explanation: "Aluminum frames are lighter and adjust faster than wood." },
      { type: "MC", prompt: "What is the main disadvantage of a wider table (e.g., 33 inches)?",
        options: ["A. Less comfortable for clients", "B. Harder for therapist to reach across", "C. Harder to adjust height", "D. Costs more than narrow tables"],
        answer: "B", explanation: "Wider tables can make it harder for the therapist to comfortably reach the far side." },
      { type: "MC", prompt: "Which table padding thickness is commonly recommended for comfort?",
        options: ["A. 0.5 inch", "B. 1 inch", "C. 2–3 inches", "D. 5 inches"],
        answer: "C", explanation: "2–3 inches balances comfort and support." },
      { type: "MC", prompt: "Which face support helps maintain proper cervical alignment?",
        options: ["A. Flat pillow", "B. Face rest cradle", "C. Rolled towel", "D. None of the above"],
        answer: "B", explanation: "A face rest cradle reduces strain and keeps the neck aligned." },
      { type: "TF", prompt: "Vinyl table fabric should be cleaned with strong solvents daily.",
        options: [], answer: "FALSE", explanation: "Use mild spray/soap; strong solvents can damage the fabric." },
      { type: "TF", prompt: "Portable tables are designed for frequent setup and breakdown.",
        options: [], answer: "TRUE", explanation: "They’re built to be folded and transported often." },
      { type: "TF", prompt: "A lift-assist or electric table can reduce therapist strain during treatments.",
        options: [], answer: "TRUE", explanation: "Power or lift-assist tables help adjust height without manual strain." },
      { type: "SHORT", prompt: "List three key features you should consider when selecting a massage table.",
        options: [], answer: "width|height adjustability|padding|length|frame type|fabric quality",
        explanation: "Students should recall at least three: width, height adjustability, padding, length, frame type, fabric quality." },
      { type: "SHORT", prompt: "Describe two ways to care for table fabric to prevent damage.",
        options: [], answer: "always cover with linens|clean with mild spray|avoid extreme temps|avoid sharp objects",
        explanation: "Linens protect fabric; mild cleaning prevents cracking; avoid extreme heat/cold; avoid punctures." },
      { type: "MC", prompt: "Which lubricant is generally best for gliding strokes while still giving control?",
        options: ["A. Heavy oil", "B. Water", "C. Lotion/cream", "D. Talc powder"],
        answer: "C", explanation: "Lotions/creams give good glide with controlled friction." },
      { type: "MC", prompt: "Which is a safe practice when working with lubricants?",
        options: ["A. Dipping into a common jar", "B. Using pumps or squeeze bottles", "C. Reusing leftover product", "D. Storing in open containers"],
        answer: "B", explanation: "Pumps/squeeze bottles reduce contamination risk." },
      { type: "TF", prompt: "Essential oils should be applied undiluted directly to the client’s skin.",
        options: [], answer: "FALSE", explanation: "They should be properly diluted before application." },
      { type: "MC", prompt: "What’s a common benefit of using bolsters?",
        options: ["A. Increases table height", "B. Enhances client comfort and alignment", "C. Replaces face cradle", "D. Disinfects the table"],
        answer: "B", explanation: "Bolsters improve comfort and alignment (e.g., under ankles/knees)." },
      { type: "MC", prompt: "Which accessory helps with therapist convenience during sessions?",
        options: ["A. Table cart or carry case", "B. Heating pad for clients", "C. Weighted blanket", "D. Decorative candles"],
        answer: "A", explanation: "Carts/carry cases help transport and organize equipment." },
      { type: "TF", prompt: "Professional appearance does not affect client trust.",
        options: [], answer: "FALSE", explanation: "Appearance and hygiene help build trust and credibility." },
      { type: "SHORT", prompt: "Explain why pumps or squeezable bottles are better for dispensing lubricants than dipping from a jar.",
        options: [], answer: "prevents contamination|keeps product sanitary|reduces waste",
        explanation: "Prevents cross-contamination, keeps lubricant sanitary, and reduces waste." },
      { type: "SHORT", prompt: "Give two examples of accessories that improve client comfort and two that help therapist convenience.",
        options: [], answer: "face rest|bolsters|stool|table cart|carry case",
        explanation: "Face rest and bolsters improve comfort; stool and carts help therapist convenience." },
      { type: "SHORT", prompt: "Why is professional appearance important for massage therapists?",
        options: [], answer: "builds client trust|ensures hygiene|shows professionalism",
        explanation: "Professional appearance builds trust, ensures hygiene, and maintains credibility." }
    ]
  },

  // --- Other sample quizzes (keep or replace with your own) ---
  {
    id: "ethics-01",
    title: "Ethics: Professional Boundaries (Set 1)",
    questions: [
      { type: "TF", prompt: "A dual relationship can sometimes be ethical with informed consent and supervision.", answer: "TRUE",
        explanation: "When unavoidable, transparency and documentation reduce risk." },
      { type: "MC", prompt: "Which action best maintains client autonomy?",
        options: ["A. Making decisions for the client", "B. Providing choices and informed consent", "C. Withholding risks to avoid anxiety", "D. Recommending without discussing alternatives"],
        answer: "B", explanation: "Informed choice respects autonomy." },
      { type: "SHORT", prompt: "Name one element of informed consent.",
        answer: "risks|benefits|alternatives|scope|privacy|confidentiality",
        explanation: "Key elements include risks, benefits, alternatives, scope, and privacy/confidentiality." }
    ]
  },
  {
    id: "a-and-p-01",
    title: "Anatomy & Physiology: Nerves (Set 1)",
    questions: [
      { type: "MC", prompt: "Which nerve innervates the diaphragm?",
        options: ["A. Vagus", "B. Phrenic", "C. Ulnar", "D. Median"],
        answer: "B", explanation: "C3–C5 keeps the diaphragm alive." },
      { type: "TF", prompt: "The radial nerve primarily supplies flexor muscles of the forearm.",
        answer: "FALSE", explanation: "Radial nerve mainly supplies extensors." },
      { type: "SHORT", prompt: "Name one primary hormone of the sympathetic response.",
        answer: "epinephrine|adrenaline|norepinephrine", explanation: "Any of these is acceptable." }
    ]
  }
];

// Email config (Formspree or your endpoint)
window.EMAIL_CONFIG = {
  ENABLE_EMAIL: true,
  ENDPOINT: "https://formspree.io/f/your_form_id_here", // <-- replace
  TO_ADDRESS: "your_email@example.com",
};
