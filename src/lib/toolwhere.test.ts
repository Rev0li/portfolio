import { describe, expect, it } from 'vitest';
import { stack } from './content/home';
import { splitWhere } from './toolwhere';

describe('splitWhere', () => {
	it('sépare l’étiquette et le détail autour du tiret', () => {
		expect(splitWhere('Stage — charts de déploiement par environnement.')).toEqual({ tag: 'Stage', detail: 'Charts de déploiement par environnement.' });
	});
	it('garde deux lieux au plus, dans l’ordre', () => {
		expect(splitWhere('Perso et 42 — reverse proxy et TLS.').tag).toBe('Perso · 42');
		expect(splitWhere('Partout — stage, mes services perso, projets 42.').tag).toBe('Partout');
	});
	it('n’ajoute pas de détail quand l’étiquette dit tout', () => {
		expect(splitWhere('42 et perso.')).toEqual({ tag: '42 · Perso', detail: '' });
		expect(splitWhere('Formation.')).toEqual({ tag: 'Formation', detail: '' });
	});
	it('garde la phrase quand elle apporte plus que l’étiquette', () => {
		expect(splitWhere('Formation et entrepreneuriat.')).toEqual({ tag: 'Formation', detail: 'Formation et entrepreneuriat.' });
		expect(splitWhere('Assistant de code dans l’éditeur.')).toEqual({ tag: '', detail: 'Assistant de code dans l’éditeur.' });
	});
	it('donne une étiquette courte à chaque outil de la stack', () => {
		for (const [, tools] of stack) for (const [, where] of tools) expect(splitWhere(where).tag.length).toBeLessThanOrEqual(14);
	});
});
