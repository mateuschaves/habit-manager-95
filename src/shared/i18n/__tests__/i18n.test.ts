import { enUS } from '../locales/en-US';
import { ptBR } from '../locales/pt-BR';
import { translate } from '../index';

describe('i18n', () => {
  it('pt-BR and en-US expose the same keys', () => {
    expect(Object.keys(enUS).sort()).toEqual(Object.keys(ptBR).sort());
  });

  it('translates by language', () => {
    expect(translate('pt-BR', 'btn.cancel')).toBe('Cancelar');
    expect(translate('en-US', 'btn.cancel')).toBe('Cancel');
  });

  it('interpolates params', () => {
    expect(translate('pt-BR', 'bar.processes', { n: 8 })).toBe(
      'Processos: 8'
    );
    expect(
      translate('en-US', 'bsod.fatal', { name: 'meditar', days: 12 })
    ).toBe('A fatal error occurred in meditar.exe. A 12-day streak was lost.');
  });

  it('falls back to pt-BR for an unknown language', () => {
    // @ts-expect-error testing runtime fallback
    expect(translate('xx-YY', 'btn.ok')).toBe('OK');
  });
});
