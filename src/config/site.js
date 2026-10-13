/**
 * Configuration centrale du site.
 * Tout ce qui change d'une boutique à l'autre (nom, WhatsApp, contacts, textes d'information)
 * se règle ici, nulle part ailleurs.
 */
export const SITE = {
  name: 'ITN Royal Design',
  shortName: 'Royal Design',
  tagline: 'Robes, tenues, draps et tapis de prière',
  description:
    'Robes, ensembles, tenues homme et couple, draps en coton et tapis de prière. Choisissez votre couleur et commandez sur WhatsApp.',

  currency: 'FCFA',
  locale: 'fr-FR',

  /** Passez à true quand vous avez vérifié src/data/prices.js (un rappel s'affiche en développement tant que c'est false). */
  pricesConfirmed: false,

  contact: {
    /** Numéro WhatsApp au format international, sans + ni espaces. */
    whatsapp: '221772392924',
    /** Affichage dans le pied de page. */
    phoneDisplay: '77 239 29 24',
    email: '',
    /** Laissez vide pour masquer. */
    address: '',
    hours: '',
  },

  /** URLs complètes ; laissez vide pour masquer l'icône. */
  social: {
    instagram: '',
    facebook: '',
    tiktok: '',
  },

  nav: [
    { label: 'Boutique', to: '/boutique' },
    { label: 'Femme', to: '/boutique/femme' },
    { label: 'Homme et couple', to: '/boutique/homme' },
    { label: 'Maison', to: '/boutique/maison' },
    { label: 'Prière', to: '/boutique/priere' },
  ],

  /**
   * Textes de la page « Infos ». Ils ne promettent aucun délai ni remboursement :
   * remplacez-les par vos conditions réelles quand elles sont arrêtées.
   */
  info: {
    ordering: [
      'Choisissez le modèle, la couleur et la taille, puis ajoutez au panier.',
      'Renseignez votre nom, votre numéro et votre adresse de livraison.',
      'Votre commande s’ouvre dans WhatsApp, prête à envoyer.',
      'Nous confirmons la disponibilité, le prix final et la livraison avec vous sur WhatsApp.',
    ],
    delivery:
      'Les frais, les délais de livraison et les moyens de paiement vous sont confirmés sur WhatsApp avant toute validation de commande.',
    returns:
      'Les conditions d’échange sont précisées sur WhatsApp au moment de la confirmation de votre commande.',
  },
};

export const whatsappLink = (text = '') =>
  `https://wa.me/${SITE.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
