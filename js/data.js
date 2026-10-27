// Protect Your Crown — Services & Products catalog (Afro / Black hair focused)
function crownImg(id, w) {
  return 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=' + (w || 800);
}

const SERVICES_DATA = [
  {
    id: 'srv-1',
    category: 'tressage',
    image: crownImg(10506592),
    en: {
      categoryLabel: 'African Braiding & Protective Styles',
      title: 'Signature Knotless Box Braids (Small, Smedium, Medium, Jumbo)',
      description: 'Seamless, zero-tension knotless braids with crisp geometric parting. Bob, Mid-Back, Waist, or Butt-Length — crafted to protect edges and honor your 4C crown.',
      durationPlaceholder: 'Duration: Varies by size & length',
      pricePlaceholder: 'Rate: To Be Completed',
      bookBtn: 'Book Knotless Braids'
    },
    fr: {
      categoryLabel: 'Tresses Africaines & Coiffures Protectrices',
      title: 'Knotless Box Braids Signatures (Small, Smedium, Medium, Jumbo)',
      description: 'Tresses sans nœuds ultra-plates, sans tension, avec un tracé net. Carré, milieu du dos, taille ou longues — pour protéger vos tempes et sublimer votre couronne 4C.',
      durationPlaceholder: 'Durée : Selon taille & longueur',
      pricePlaceholder: 'Tarif : À compléter',
      bookBtn: 'Réserver mes Knotless'
    }
  },
  {
    id: 'srv-2',
    category: 'tressage',
    image: crownImg(8357450),
    en: {
      categoryLabel: 'African Braiding & Protective Styles',
      title: 'French Curl, Goddess & Boho Knotless Braids',
      description: 'Knotless braids finished with human-hair or premium curly tendrils for a soft, regal bohemian look — perfect for Black women’s protective styling.',
      durationPlaceholder: 'Duration: Upon Consultation',
      pricePlaceholder: 'Rate: To Be Completed',
      bookBtn: 'Book Boho / Goddess Braids'
    },
    fr: {
      categoryLabel: 'Tresses Africaines & Coiffures Protectrices',
      title: 'French Curl, Goddess & Boho Knotless Braids',
      description: 'Tresses sans nœuds agrémentées de mèches bouclées soyeuses pour un rendu bohème, féminin et royal — idéal en coiffure protectrice afro.',
      durationPlaceholder: 'Durée : Sur consultation',
      pricePlaceholder: 'Tarif : À compléter',
      bookBtn: 'Réserver Boho / Goddess'
    }
  },
  {
    id: 'srv-3',
    category: 'tressage',
    image: crownImg(4495851),
    en: {
      categoryLabel: 'African Braiding & Protective Styles',
      title: 'Fulani Tribal Braids, Stitch Cornrows & Lemonade Braids',
      description: 'Feed-in stitch cornrows, tribal Fulani patterns, and sleek crown designs — optionally finished with wooden or gold beads.',
      durationPlaceholder: 'Duration: Upon Consultation',
      pricePlaceholder: 'Rate: To Be Completed',
      bookBtn: 'Book Fulani / Cornrows'
    },
    fr: {
      categoryLabel: 'Tresses Africaines & Coiffures Protectrices',
      title: 'Tresses Fulani, Stitch Cornrows & Nattes Collées',
      description: 'Nattes collées Stitch ou Feed-in, motifs tribaux Fulani et coiffures couronnes avec perles et bijoux dorés en option.',
      durationPlaceholder: 'Durée : Sur consultation',
      pricePlaceholder: 'Tarif : À compléter',
      bookBtn: 'Réserver Fulani / Cornrows'
    }
  },
  {
    id: 'srv-4',
    category: 'tressage',
    image: crownImg(4603683),
    en: {
      categoryLabel: 'Locs, Soft Locs & Dreadlocks',
      title: 'Soft Locs, Butterfly Locs, Faux Locs & Traditional Dreadlocks',
      description: 'Lightweight Soft Locs, distressed Butterfly Locs, Faux Locs, and traditional dreadlock installs or retwists — designed for kinky and coily hair.',
      durationPlaceholder: 'Duration: Upon Consultation',
      pricePlaceholder: 'Rate: To Be Completed',
      bookBtn: 'Book Locs / Dreads'
    },
    fr: {
      categoryLabel: 'Locs, Soft Locs & Dreadlocks',
      title: 'Soft Locs, Butterfly Locs, Faux Locs & Dreadlocks',
      description: 'Soft Locs légères, Butterfly Locs, Faux Locs et dreadlocks traditionnelles (pose ou retwist) pensées pour cheveux crépus et texturés.',
      durationPlaceholder: 'Durée : Sur consultation',
      pricePlaceholder: 'Tarif : À compléter',
      bookBtn: 'Réserver Locs / Dreads'
    }
  },
  {
    id: 'srv-5',
    category: 'soins',
    image: crownImg(17258765),
    en: {
      categoryLabel: '4C Natural Hair Treatments',
      title: '4C Deep Steam Hydration, Chebe Mask & Twist-Out Ritual',
      description: 'Warm steam, African botanical butters, and moisture sealing for 4A–4C coils — shrink-smart care that defines your natural afro crown.',
      durationPlaceholder: 'Duration: To Be Confirmed',
      pricePlaceholder: 'Rate: To Be Completed',
      bookBtn: 'Book 4C Hydration Ritual'
    },
    fr: {
      categoryLabel: 'Soins Cheveux Crépus 4C',
      title: 'Rituel Vapeur Intense 4C, Masque au Chébé & Twist-Out',
      description: 'Bain de vapeur, beurres botaniques africains et scellage d’hydratation pour cheveux 4A–4C — sublimer votre afro naturel.',
      durationPlaceholder: 'Durée : À préciser',
      pricePlaceholder: 'Tarif : À compléter',
      bookBtn: 'Réserver ce soin 4C'
    }
  },
  {
    id: 'srv-6',
    category: 'soins',
    image: crownImg(7049517),
    en: {
      categoryLabel: '4C Natural Hair Treatments',
      title: 'Warm Botanical Hot Oil Bath & Scalp Detox for Locs & Braids',
      description: 'Section-by-section warm oil ritual with purifying scalp detox — ideal under braids, locs, dreadlocks, or natural afro styles.',
      durationPlaceholder: 'Duration: To Be Confirmed',
      pricePlaceholder: 'Rate: To Be Completed',
      bookBtn: 'Book Hot Oil Treatment'
    },
    fr: {
      categoryLabel: 'Soins Cheveux Crépus 4C',
      title: 'Bain d’Huiles Chaudes & Détox du Cuir Chevelu (Tresses & Locs)',
      description: 'Huiles tièdes section par section et détox du cuir chevelu — parfait sous tresses, locs, dreadlocks ou afro naturel.',
      durationPlaceholder: 'Durée : À préciser',
      pricePlaceholder: 'Tarif : À compléter',
      bookBtn: 'Réserver ce bain d’huiles'
    }
  },
  {
    id: 'srv-7',
    category: 'entretien',
    image: crownImg(13221801),
    en: {
      categoryLabel: 'Wigs & Lace Units',
      title: 'Lace Front, Closure & Glueless Wig Install (Body Wave, Curly, Afro)',
      description: 'Professional lace front / closure / glueless wig installs for Black women — melt, blend, and style body wave, curly, or afro-texture units without compromising your natural hair.',
      durationPlaceholder: 'Duration: To Be Confirmed',
      pricePlaceholder: 'Rate: To Be Completed',
      bookBtn: 'Book Wig Install'
    },
    fr: {
      categoryLabel: 'Perruques & Lace',
      title: 'Pose Perruque Lace Front, Closure & Glueless (Body Wave, Curly, Afro)',
      description: 'Pose professionnelle de perruques lace front / closure / glueless pour femmes noires — fusion invisible, coiffage body wave, curly ou texture afro, sans abîmer vos cheveux naturels.',
      durationPlaceholder: 'Durée : À préciser',
      pricePlaceholder: 'Tarif : À compléter',
      bookBtn: 'Réserver pose perruque'
    }
  },
  {
    id: 'srv-8',
    category: 'entretien',
    image: crownImg(11728801),
    en: {
      categoryLabel: 'Prep, Silk Press & Takedown',
      title: 'Crown Prep, Edge Refresh, Silk Press & Anti-Breakage Takedown',
      description: 'Wash & stretch prep before braids or wigs, silk press for sleek afro styles, edge refresh, or gentle oil-slip takedown to keep every inch of growth.',
      durationPlaceholder: 'Duration: To Be Confirmed',
      pricePlaceholder: 'Rate: To Be Completed',
      bookBtn: 'Book Prep / Refresh'
    },
    fr: {
      categoryLabel: 'Préparation, Silk Press & Dépose',
      title: 'Crown Prep, Retouche Contours, Silk Press & Dépose Anti-Casse',
      description: 'Préparation lavage/étirage avant tresses ou perruque, silk press, retouche des tempes, ou dépose douce aux huiles pour garder chaque centimètre de pousse.',
      durationPlaceholder: 'Durée : À préciser',
      pricePlaceholder: 'Tarif : À compléter',
      bookBtn: 'Réserver Prep / Retouche'
    }
  }
];

const PRODUCTS_DATA = [
  {
    id: 'prd-1',
    category: 'huiles',
    image: crownImg(5152515),
    en: {
      categoryLabel: 'Hair & Scalp Oil',
      name: 'Signature Crown Growth & Scalp Elixir',
      description: 'Dropper oil for braided, loc’d, and natural 4C scalps — nourish edges, soothe dryness, and lock in moisture under protective styles.',
      formatPlaceholder: 'Size (fl oz / ml): To Be Added',
      pricePlaceholder: 'Price: To Be Added',
      addBtn: '+ Add to Bag',
      buyBtn: 'Order Now'
    },
    fr: {
      categoryLabel: 'Huile Capillaire & Cuir Chevelu',
      name: 'Élixir Signature Pousse & Cuir Chevelu — Protect Your Crown',
      description: 'Huile pipette pour cuirs chevelus sous tresses, locs et afro 4C — nourrir les tempes, apaiser la sécheresse et sceller l’hydratation.',
      formatPlaceholder: 'Format (ml / fl oz) : À compléter',
      pricePlaceholder: 'Prix : À compléter',
      addBtn: '+ Sélection',
      buyBtn: 'Commander'
    }
  },
  {
    id: 'prd-2',
    category: 'huiles',
    image: crownImg(7049517),
    en: {
      categoryLabel: 'Hair & Scalp Oil',
      name: 'Loc & Braid Tension Relief Scalp Oil',
      description: 'Lightweight botanical blend to calm freshly braided or retwisted scalps, keep parts clean, and add luminous sheen to locs and dreadlocks.',
      formatPlaceholder: 'Size (fl oz / ml): To Be Added',
      pricePlaceholder: 'Price: To Be Added',
      addBtn: '+ Add to Bag',
      buyBtn: 'Order Now'
    },
    fr: {
      categoryLabel: 'Huile Capillaire & Cuir Chevelu',
      name: 'Huile Apaisante Locs, Tresses & Cuir Chevelu',
      description: 'Soin léger pour apaiser après tressage ou retwist, nettoyer les tracés et faire briller locs et dreadlocks.',
      formatPlaceholder: 'Format (ml / fl oz) : À compléter',
      pricePlaceholder: 'Prix : À compléter',
      addBtn: '+ Sélection',
      buyBtn: 'Commander'
    }
  },
  {
    id: 'prd-3',
    category: 'soins',
    image: crownImg(17258765),
    en: {
      categoryLabel: 'Crown Care Ritual',
      name: '4C Moisture Seal & Length Retention Duo',
      description: 'Moisture ritual for 3B–4C natural hair, afro wash-and-gos, braid-outs, and protective style maintenance. Specs to be completed by the house.',
      formatPlaceholder: 'Format: To Be Added',
      pricePlaceholder: 'Price: To Be Added',
      addBtn: '+ Add to Bag',
      buyBtn: 'Order Now'
    },
    fr: {
      categoryLabel: 'Rituel de Soin Couronne',
      name: 'Duo Hydratation 4C & Rétention de Longueur',
      description: 'Rituel pour cheveux naturels 3B–4C, afro wash-and-go, braid-outs et entretien des coiffures protectrices. Caractéristiques à renseigner.',
      formatPlaceholder: 'Format : À compléter',
      pricePlaceholder: 'Prix : À compléter',
      addBtn: '+ Sélection',
      buyBtn: 'Commander'
    }
  }
];
