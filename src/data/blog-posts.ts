export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  intro: string;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-your-website-is-losing-you-clients",
    category: "Business",
    date: "April 15, 2026",
    readTime: "5 min read",
    title: "Why Your Website Is Quietly Losing You Clients",
    excerpt: "Most founders underestimate how much a slow, outdated website costs them. Here is what the data says.",
    intro: "Your website is often the first thing a potential client meets — and the last thing many founders invest in. The cost of getting it wrong is usually invisible, but it is rarely small.",
    sections: [
      {
        heading: "First impressions happen in milliseconds",
        paragraphs: [
          "Research from Google shows that 53 percent of mobile visitors abandon a page that takes longer than three seconds to load. By the time your hero animation finishes, half of your potential customers are already gone.",
          "Slow does not just mean lost traffic. It signals carelessness. A founder who tolerates a sluggish site is, in the visitor's mind, a founder who tolerates sluggish work."
        ]
      },
      {
        heading: "Outdated design erodes trust",
        paragraphs: [
          "Visual design is the proxy people use to judge competence in a field they do not understand. If your site looks like it was built in 2017, your services feel like they belong there too.",
          "This is not about chasing trends. It is about not looking like you have stopped paying attention."
        ]
      },
      {
        heading: "Friction kills conversion",
        paragraphs: [
          "Every extra form field, every unclear call-to-action, every confusing menu costs you a percentage of the people who would otherwise have become clients.",
          "The math is brutal. A two percent improvement in conversion on a site that handles a hundred enquiries a month is two extra clients. Over a year, that is twenty-four. Over five years, more than a hundred."
        ]
      },
      {
        heading: "What good actually looks like",
        paragraphs: [
          "A high-performing website loads in under two seconds, communicates the offer in under five, and makes the next step obvious in under ten.",
          "It is fast, clear, and confident. Nothing more, nothing less."
        ]
      },
      {
        heading: "The honest fix",
        paragraphs: [
          "If your site has not been touched in two years, it is costing you. Rebuilding it does not need to take three months and twenty thousand euros. With the right process, two weeks and a sensible budget will do the job."
        ]
      }
    ]
  },
  {
    slug: "what-ai-actually-means-for-web-development",
    category: "Technology",
    date: "April 8, 2026",
    readTime: "4 min read",
    title: "What AI Actually Means for Web Development in 2026",
    excerpt: "AI has changed how websites are built but not in the way most people think. Here is what actually matters.",
    intro: "There is a lot of noise around AI in web development. Some of it is useful. Most of it is not. Here is the practical picture for founders trying to make sense of it.",
    sections: [
      {
        heading: "AI does not replace developers — it speeds up the boring parts",
        paragraphs: [
          "The myth is that AI will spit out a finished website on demand. The reality is that AI is excellent at the repetitive parts of the job — boilerplate code, layout scaffolding, copy variations — and weak at the parts that actually matter, like judgement, taste, and understanding what a specific business needs.",
          "Used well, AI compresses the timeline without compressing the quality. Used badly, it produces generic websites that look like everyone else's."
        ]
      },
      {
        heading: "The agencies still using AI as a gimmick",
        paragraphs: [
          "Some agencies have started slapping AI badges on their marketing without changing how they work. Their delivery times are the same. Their prices are the same. Nothing has actually changed except the language on their homepage.",
          "If your agency cannot tell you specifically how AI shortens your project — and what it does not touch — they are using the word, not the tool."
        ]
      },
      {
        heading: "What AI cannot do",
        paragraphs: [
          "AI cannot interview your customers. It cannot decide which of three competing offers should be your headline. It cannot judge whether a particular shade of gold communicates trust or cheapness in your industry.",
          "These are the questions that decide whether a website succeeds. They still require human attention."
        ]
      },
      {
        heading: "What it changes for you, the client",
        paragraphs: [
          "If you are paying for an eight-week build, you should ask why. The genuinely useful AI tooling — for design exploration, for boilerplate, for QA — has cut that timeline in half for studios that have invested in their workflow.",
          "Two weeks for a properly built website is now the new normal. Anything longer needs to justify itself."
        ]
      }
    ]
  },
  {
    slug: "how-we-deliver-websites-in-14-days",
    category: "Process",
    date: "April 1, 2026",
    readTime: "6 min read",
    title: "How We Actually Deliver a Website in 14 Days",
    excerpt: "People are often sceptical when we say 14 days. Here is exactly how the process works, step by step.",
    intro: "When founders hear that we deliver finished websites in fourteen days, the response is almost always a polite raised eyebrow. Here is exactly what those fourteen days look like, and why they are enough.",
    sections: [
      {
        heading: "Why traditional agencies take eight weeks",
        paragraphs: [
          "Most agencies have a process designed around their convenience, not yours. Long discovery phases. Three or four design rounds. A waterfall handover from designer to developer. Internal QA on a schedule that suits their team, not your launch.",
          "Each step adds days that do not add value to your finished site."
        ]
      },
      {
        heading: "Days 1 to 2: Discovery, in one focused call",
        paragraphs: [
          "We do not send you a forty-question brief document. We have a single sixty-minute call where we extract the few things that genuinely matter: who you serve, what you sell, what success looks like.",
          "By the end of day two you have a written brief summary in your inbox. You approve it before we move on."
        ]
      },
      {
        heading: "Days 3 to 5: Design, with AI doing the heavy lifting",
        paragraphs: [
          "We use AI tooling to produce wireframes and visual directions in hours, not weeks. You see something concrete on day three.",
          "We build in one round of revisions. Most projects do not use it. The brief was clear enough."
        ]
      },
      {
        heading: "Days 6 to 12: Build, with performance baked in",
        paragraphs: [
          "Code is written from scratch in React, with a strict performance budget. Lighthouse scores above ninety on every deliverable. Mobile-first. Accessible by default.",
          "We do not use page builders. We do not use bloated themes. The site is yours, end to end."
        ]
      },
      {
        heading: "Days 13 to 14: QA, launch, handover",
        paragraphs: [
          "Cross-browser testing on real devices. Accessibility audit. Final review with you. Deployment.",
          "On day fourteen the site is live and you have full ownership of the codebase. We stay on hand for thirty days to handle any small adjustments."
        ]
      },
      {
        heading: "Why fourteen days is enough — and when it is not",
        paragraphs: [
          "Fourteen days is enough for a focused, well-scoped marketing site, landing page, or portfolio. It is not enough for a complex SaaS application or a custom e-commerce platform with bespoke checkout flows. Those projects are scoped individually and quoted accordingly.",
          "But for the projects that fit, fourteen days is not a marketing claim. It is just what happens when an agency stops wasting your time."
        ]
      }
    ]
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
