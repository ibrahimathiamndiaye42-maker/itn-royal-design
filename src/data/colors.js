/** Familles de couleurs du filtre. `hex: null` = pastille multicolore. */
export const colorFamilies = [
  { id: 'noir', label: 'Noir', hex: '#141414' },
  { id: 'blanc', label: 'Blanc et crème', hex: '#F1EBDD' },
  { id: 'beige', label: 'Beige et sable', hex: '#CDB89A' },
  { id: 'gris', label: 'Gris', hex: '#8E8E94' },
  { id: 'marron', label: 'Marron', hex: '#6B4630' },
  { id: 'rouge', label: 'Rouge et bordeaux', hex: '#A3213A' },
  { id: 'rose', label: 'Rose et fuchsia', hex: '#D9467F' },
  { id: 'orange', label: 'Orange', hex: '#E27B22' },
  { id: 'jaune', label: 'Jaune et moutarde', hex: '#D9AE23' },
  { id: 'vert', label: 'Vert', hex: '#2F7D4F' },
  { id: 'turquoise', label: 'Turquoise', hex: '#1FA5A8' },
  { id: 'bleu', label: 'Bleu', hex: '#2250B8' },
  { id: 'violet', label: 'Violet et lilas', hex: '#7040A8' },
  { id: 'multicolore', label: 'Multicolore', hex: null },
];

export const colorFamilyById = Object.fromEntries(colorFamilies.map((c) => [c.id, c]));
