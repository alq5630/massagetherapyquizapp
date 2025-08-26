// quizzes.js
// Define your quizzes here. Each quiz has a unique "id", a "title", and an array of questions.
// Question format:
// { type: 'MC'|'TF'|'SHORT', prompt: '...', options?: ['A. ...','B. ...',...], answer: 'B'|'TRUE'|'list|of|accepted', explanation?: '...' }

window.QUIZ_CATALOG = [
  {
  id: "chapter-3-tools-of-the-trade",
  title: "Chapter 3: Tools of the Trade",
  questions: [
    {
      type: "MC",
      prompt: "Which type of massage table is used most often by therapists?",
      options: ["a) Stationary table", "b) Portable table", "c) Hydrotherapy table", "d) Electric lift table"],
      answer: "B",
      explanation: "Portable tables are most common, about 95% of all tables sold."
    },
    {
      type: "MC",
      prompt: "What is the typical width of a massage table?",
      options: ["a) 18–20 inches", "b) 22–24 inches", "c) 28–33 inches", "d) 36–40 inches"],
      answer: "C",
      explanation: "Most massage tables are between 28–33 inches wide."
    },
    {
      type: "MC",
      prompt: "Which table frame is lighter and allows quicker height adjustments?",
      options: ["a) Steel", "b) Aluminum", "c) Wood", "d) Plastic"],
      answer: "B",
      explanation: "Aluminum frames are lighter and adjust faster than wood."
    },
    {
      type: "MC",
      prompt: "What is the main disadvantage of a wider table (e.g., 33 inches)?",
      options: ["a) Less comfortable for clients", "b) Harder for therapist to reach across", "c) Harder to adjust height", "d) Costs more than narrow tables"],
      answer: "B",
      explanation: "Wider tables can make it harder for the therapist to comfortably reach the far side."
    },
    {
      type: "MC",
      prompt: "Which table padding thickness is commonly recommended for comfort?",
      options: ["a) 0.5 inch", "b) 1 inch", "c) 2–3 inches", "d) 5 inches"],
      answer: "C",
      explanation: "2–3 inches balances comfort and support."
    },
    {
      type: "MC",
      prompt: "Which face support helps maintain proper cervical alignment?",
      options: ["a) Flat pillow", "b) Face rest cradle", "c) Rolled towel", "d) None of the above"],
      answer: "B",
      explanation: "A face rest cradle reduces strain and keeps the neck aligned."
    },
    {
      type: "TF",
      prompt: "Vinyl table fabric should be cleaned with strong solvents daily.",
      options: [],
      answer: "FALSE",
      explanation: "Use mild spray/soap; strong solvents can damage the fabric."
    },
    {
      type: "TF",
      prompt: "Portable tables are designed for frequent setup and breakdown.",
      options: [],
      answer: "TRUE",
      explanation: "They’re built to be folded and transported often."
    },
    {
      type: "TF",
      prompt: "A lift-assist or electric table can reduce therapist strain during treatments.",
      options: [],
      answer: "TRUE",
      explanation: "Power or lift-assist tables help adjust height without manual strain."
    },
    {
      type: "SHORT",
      prompt: "List three key features you should consider when selecting a massage table.",
      options: [],
      answer: "width|height adjustability|padding|length|frame type|fabric quality",
      explanation: "Students should recall at least three: width, height adjustability, padding, length, frame type, fabric quality."
    },
    {
      type: "SHORT",
      prompt: "Describe two ways to care for table fabric to prevent damage.",
      options: [],
      answer: "always cover with linens|clean with mild spray|avoid extreme temps|avoid sharp objects",
      explanation: "Linens protect fabric; mild cleaning prevents cracking; avoid extreme heat/cold; avoid punctures."
    },
    {
      type: "MC",
      prompt: "Which lubricant is generally best for gliding strokes while still giving control?",
      options: ["a) Heavy oil", "b) Water", "c) Lotion/cream", "d) Talc powder"],
      answer: "C",
      explanation: "Lotions/creams give good glide with controlled friction."
    },
    {
      type: "MC",
      prompt: "Which is a safe practice when working with lubricants?",
      options: ["a) Dipping into a common jar", "b) Using pumps or squeeze bottles", "c) Reusing leftover product", "d) Storing in open containers"],
      answer: "B",
      explanation: "Pumps/squeeze bottles reduce contamination risk."
    },
    {
      type: "TF",
      prompt: "Essential oils should be applied undiluted directly to the client’s skin.",
      options: [],
      answer: "FALSE",
      explanation: "They should be properly diluted before application."
    },
    {
      type: "MC",
      prompt: "What’s a common benefit of using bolsters?",
      options: ["a) Increases table height", "b) Enhances client comfort and alignment", "c) Replaces face cradle", "d) Disinfects the table"],
      answer: "B",
      explanation: "Bolsters improve comfort and alignment (e.g., under ankles/knees)."
    },
    {
      type: "MC",
      prompt: "Which accessory helps with therapist convenience during sessions?",
      options: ["a) Table cart or carry case", "b) Heating pad for clients", "c) Weighted blanket", "d) Decorative candles"],
      answer: "A",
      explanation: "Carts/carry cases help transport and organize equipment."
    },
    {
      type: "TF",
      prompt: "Professional appearance does not affect client trust.",
      options: [],
      answer: "FALSE",
      explanation: "Appearance and hygiene help build trust and credibility."
    },
    {
      type: "SHORT",
      prompt: "Explain why pumps or squeezable bottles are better for dispensing lubricants than dipping from a jar.",
      options: [],
      answer: "prevents contamination|keeps product sanitary|reduces waste",
      explanation: "Prevents cross-contamination, keeps lubricant sanitary, and reduces waste."
    },
    {
      type: "SHORT",
      prompt: "Give two examples of accessories that improve client comfort and two that help therapist convenience.",
      options: [],
      answer: "face rest|bolsters|stool|table cart|carry case",
      explanation: "Face rest and bolsters improve comfort; stool and carts help therapist convenience."
    },
    {
      type: "SHORT",
      prompt: "Why is professional appearance important for massage therapists?",
      options: [],
      answer: "builds client trust|ensures hygiene|shows professionalism",
      explanation: "Professional appearance builds trust, ensures hygiene, and maintains credibility."
    }
  ]
}

];

// Email config (see script.js for how it's used)
// For Formspree, create a form and paste the endpoint URL here.
window.EMAIL_CONFIG = {
  ENABLE_EMAIL: true,
  ENDPOINT: "https://formspree.io/f/xgvlervy", 
  TO_ADDRESS: "ayeshaqahash@gmail.com", 
};
