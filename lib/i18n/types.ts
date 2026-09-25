export type Locale = "en" | "pt" | "es" | "fr" | "ar";

export interface Dictionary {
  common: {
    language: string;
    languages: {
      en: string;
      pt: string;
      es: string;
      fr: string;
      ar: string;
    };
  };
  nav: {
    about: string;
    ecosystem: string;
    marketplace: string;
    roadmap: string;
    events: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    headlineDesktop: {
      line1: string;
      line2: string;
      line3: string;
    };
    headlineMobile: {
      line1: string;
      line2: string;
      line3: string;
    };
    supportDesktop: string;
    supportMobile: string;
    ctaPrimary: string;
    ctaSecondary: string;
    indicators: {
      globalNetwork: string;
      live: string;
      keyMarkets: string;
      keyMarketsLabel: string;
      connections: string;
      connectionsLabel: string;
    };
  };
  vision: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    statementP1: string;
    statementP2: string;
    quote: string;
    authorName: string;
    authorRole: string;
  };
  market: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    descLine1: string;
    descLine2: string;
    featuredTop: string;
    featuredValue: string;
    featuredBottom: string;
    metrics: {
      shareValue: string;
      shareLabel: string;
      companiesValue: string;
      companiesLabel: string;
      adoptionValue: string;
      adoptionLabel: string;
      hubsValue: string;
      hubsLabel: string;
      aiValue: string;
      aiLabel: string;
    };
  };
  ecosystem: {
    label: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
    web2LayerName: string;
    web3LayerName: string;
    steps: {
      step1Title: string;
      step1Copy: string;
      step2Title: string;
      step2Copy: string;
      step3Title: string;
      step3Copy: string;
      step4Title: string;
      step4Copy: string;
      step5Title: string;
      step5Copy: string;
      step6Title: string;
      step6Copy: string;
    };
  };
  products: {
    web2: {
      label: string;
      titleMain: string;
      titleHighlight: string;
      copy: string;
      capabilities: [string, string, string];
      capabilityDetails: [string, string, string];
    };
    web3: {
      label: string;
      titleMain: string;
      titleHighlight: string;
      copy: string;
      capabilities: [string, string, string];
      capabilityDetails: [string, string, string];
    };
  };
  marketplace: {
    label: string;
    titleMain: string;
    titleHighlight: string;
    intro: string;
    categories: {
      all: string;
      ai: string;
      sales: string;
      content: string;
      operations: string;
      web3: string;
    };
    explore: string;
    exploreApp: string;
    closeDetails: string;
    apps: {
      eva: {
        title: string;
        subtitle: string;
        description: string;
        features: string[];
      };
      presence: {
        title: string;
        subtitle: string;
        description: string;
        features: string[];
      };
      journey: {
        title: string;
        subtitle: string;
        description: string;
        features: string[];
      };
      zones: {
        title: string;
        subtitle: string;
        description: string;
        features: string[];
      };
      rewards: {
        title: string;
        subtitle: string;
        description: string;
        features: string[];
      };
      studio: {
        title: string;
        subtitle: string;
        description: string;
        features: string[];
      };
      seo: {
        title: string;
        subtitle: string;
        description: string;
        features: string[];
      };
      contracts: {
        title: string;
        subtitle: string;
        description: string;
        features: string[];
      };
    };
  };
  network: {
    eyebrow: string;
    titleMain: string;
    titleHighlight: string;
    intro: string;
    signature: {
      line1: string;
      line2: string;
      line3: string;
    };
    milestones: [string, string, string];
  };
  roadmap: {
    eyebrow: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
    phases: {
      phase1: {
        year: string;
        items: string[];
      };
      phase2: {
        year: string;
        items: string[];
      };
      phase3: {
        year: string;
        items: string[];
      };
    };
  };
  closing: {
    leadership: {
      eyebrow: string;
      titleMain: string;
      titleHighlight: string;
      description: string;
      button: string;
      facts: {
        expVal: string;
        expLabel: string;
        companiesVal: string;
        companiesLabel: string;
        expertiseVal: string;
        expertiseLabel: string;
      };
      attributionName: string;
      attributionRole: string;
    };
    events: {
      eyebrow: string;
      titleMain: string;
      titleHighlight: string;
      description: string;
      items: {
        title: string;
        detail: string;
      }[];
    };
    cta: {
      titleMain: string;
      titleHighlight: string;
      buttonPrimary: string;
      buttonSecondary: string;
    };
    footer: {
      copyright: string;
    };
  };
}
