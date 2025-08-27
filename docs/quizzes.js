// quizzes.js
// Question format:
// { type: 'MC'|'TF'|'SHORT', prompt: '...', options?: ['A. ...','B. ...',...], answer: 'B'|'TRUE'|'list|of|accepted', explanation?: '...' }

window.QUIZ_CATALOG = [
  // Chapter 3 FIRST so it's default
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
        answer: "FALSE", explanation: "Use mild spray/soap; strong solvents can damage the fabric." },
      { type: "TF", prompt: "Portable tables are designed for frequent setup and breakdown.",
        answer: "TRUE", explanation: "They’re built to be folded and transported often." },
      { type: "TF", prompt: "A lift-assist or electric table can reduce therapist strain during treatments.",
        answer: "TRUE", explanation: "Power or lift-assist tables help adjust height without manual strain." },
      { type: "SHORT", prompt: "List three key features you should consider when selecting a massage table.",
        answer: "width|height adjustability|padding|length|frame type|fabric quality",
        explanation: "Students should recall at least three: width, height adjustability, padding, length, frame type, fabric quality." },
      { type: "SHORT", prompt: "Describe two ways to care for table fabric to prevent damage.",
        answer: "always cover with linens|clean with mild spray|avoid extreme temps|avoid sharp objects",
        explanation: "Linens protect fabric; mild cleaning prevents cracking; avoid extreme heat/cold; avoid punctures." },
      { type: "MC", prompt: "Which lubricant is generally best for gliding strokes while still giving control?",
        options: ["A. Heavy oil", "B. Water", "C. Lotion/cream", "D. Talc powder"],
        answer: "C", explanation: "Lotions/creams give good glide with controlled friction." },
      { type: "MC", prompt: "Which is a safe practice when working with lubricants?",
        options: ["A. Dipping into a common jar", "B. Using pumps or squeeze bottles", "C. Reusing leftover product", "D. Storing in open containers"],
        answer: "B", explanation: "Pumps/squeeze bottles reduce contamination risk." },
      { type: "TF", prompt: "Essential oils should be applied undiluted directly to the client’s skin.",
        answer: "FALSE", explanation: "They should be properly diluted before application." },
      { type: "MC", prompt: "What’s a common benefit of using bolsters?",
        options: ["A. Increases table height", "B. Enhances client comfort and alignment", "C. Replaces face cradle", "D. Disinfects the table"],
        answer: "B", explanation: "Bolsters improve comfort and alignment (e.g., under ankles/knees)." },
      { type: "MC", prompt: "Which accessory helps with therapist convenience during sessions?",
        options: ["A. Table cart or carry case", "B. Heating pad for clients", "C. Weighted blanket", "D. Decorative candles"],
        answer: "A", explanation: "Carts/carry cases help transport and organize equipment." },
      { type: "TF", prompt: "Professional appearance does not affect client trust.",
        answer: "FALSE", explanation: "Appearance and hygiene help build trust and credibility." },
      { type: "SHORT", prompt: "Explain why pumps or squeezable bottles are better for dispensing lubricants than dipping from a jar.",
        answer: "prevents contamination|keeps product sanitary|reduces waste",
        explanation: "Prevents cross-contamination, keeps lubricant sanitary, and reduces waste." },
      { type: "SHORT", prompt: "Give two examples of accessories that improve client comfort and two that help therapist convenience.",
        answer: "face rest|bolsters|stool|table cart|carry case",
        explanation: "Face rest and bolsters improve comfort; stool and carts help therapist convenience." },
      { type: "SHORT", prompt: "Why is professional appearance important for massage therapists?",
        answer: "builds client trust|ensures hygiene|shows professionalism",
        explanation: "Professional appearance builds trust, ensures hygiene, and maintains credibility." }
    ]
  },

   {
    id: "chapter-8-massage-techniques",
    title: "Chapter 8: Massage Techniques",
    questions: [
      { type: "MC", prompt: "Which massage technique is most commonly used to begin and end a session because it promotes relaxation and warms tissues?",
        options: ["A. Petrissage", "B. Effleurage", "C. Tapotement", "D. Compression"],
        answer: "B", explanation: "Effleurage is typically used to start and finish a massage because it relaxes and warms tissues." },

      { type: "MC", prompt: "A client presents with muscle adhesions and scar tissue in the shoulder area. Which technique would be most appropriate to address this?",
        options: ["A. Effleurage", "B. Tapotement", "C. Friction", "D. Vibration"],
        answer: "C", explanation: "Friction, especially cross-fiber, helps break down adhesions and scar tissue." },

      { type: "MC", prompt: "Which stroke is best to increase venous return and improve circulation?",
        options: ["A. Petrissage", "B. Effleurage", "C. Compression", "D. Vibration"],
        answer: "A", explanation: "Petrissage kneads and lifts tissues, improving circulation and venous return." },

      { type: "MC", prompt: "Which technique is most effective for loosening mucus in respiratory therapy?",
        options: ["A. Tapotement", "B. Petrissage", "C. Friction", "D. Vibration"],
        answer: "A", explanation: "Tapotement, especially cupping, is used in respiratory therapy to loosen mucus." },

      { type: "MC", prompt: "A therapist is working with a client in a chair massage setting, where the client remains clothed. Which technique is especially appropriate?",
        options: ["A. Effleurage", "B. Petrissage", "C. Compression", "D. Friction"],
        answer: "C", explanation: "Compression can be performed effectively through clothing, making it ideal for chair massage." },

      { type: "MC", prompt: "Which stroke involves lifting and squeezing soft tissues and is often described as a 'kneading' motion?",
        options: ["A. Effleurage", "B. Petrissage", "C. Friction", "D. Tapotement"],
        answer: "B", explanation: "Petrissage is the kneading technique that lifts and squeezes tissues." },

      { type: "MC", prompt: "A client needs a stimulating massage before an athletic event. Which technique would best prepare the muscles?",
        options: ["A. Effleurage", "B. Vibration", "C. Tapotement", "D. Petrissage"],
        answer: "C", explanation: "Tapotement is stimulating and energizing, making it ideal for pre-event sports massage." },

      { type: "MC", prompt: "Which technique can be used to desensitize an area before deeper work by shaking or trembling the tissues?",
        options: ["A. Effleurage", "B. Compression", "C. Friction", "D. Vibration"],
        answer: "D", explanation: "Vibration relaxes and desensitizes tissues before deeper massage." },

      { type: "MC", prompt: "Which stroke is typically applied in a cross-fiber (transverse) direction to help break down adhesions?",
        options: ["A. Petrissage", "B. Effleurage", "C. Friction", "D. Tapotement"],
        answer: "C", explanation: "Cross-fiber friction is used to break down adhesions and realign fibers." },

      { type: "MC", prompt: "A client reports chronic tightness in the calves. Which technique would best release tension and improve circulation in this muscle group?",
        options: ["A. Petrissage", "B. Effleurage", "C. Vibration", "D. Compression"],
        answer: "A", explanation: "Petrissage releases muscle tension and improves circulation in tight areas like the calves." }
    ]
  },
];

// Email config (Formspree or your endpoint)
window.EMAIL_CONFIG = {
  ENABLE_EMAIL: true,
  ENDPOINT: "https://formspree.io/f/xgvlervy",
  TO_ADDRESS: "ayeshaqahash@gmail.com",
};
