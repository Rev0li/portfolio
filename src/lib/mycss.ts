/**
 * MyCss (CDN, version figée) : adresse des fichiers partagés (stickers, icônes, favicon).
 * La même version est écrite dans app.html (feuilles de style, favicon) ; un test vérifie
 * que les deux restent alignées.
 */
export const MYCSS_VERSION = 'v1.3.0';
export const MYCSS = `https://cdn.jsdelivr.net/gh/Rev0li/MyCss@${MYCSS_VERSION}`;

/** Adresse absolue d'un fichier de assets/ (ex. asset('stickers/onigiri.svg')). */
export const asset = (path: string) => `${MYCSS}/assets/${path}`;

/**
 * Valeur de --ico pour .rv-ico (icône par masque, couleur du texte).
 * Adresse absolue obligatoire : une adresse relative serait lue depuis le dossier du CSS.
 */
export const ico = (dir: 'ui' | 'tools', name: string) => `url('${asset(`icons/${dir}/${name}.svg`)}')`;
