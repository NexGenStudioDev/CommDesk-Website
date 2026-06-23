import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility function', () => {
  it('handles strings correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles empty strings', () => {
    expect(cn('class1', '', 'class2')).toBe('class1 class2');
  });

  it('handles arrays of class names', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });

  it('handles conditional class names (objects)', () => {
    expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2');
  });

  it('handles null and undefined', () => {
    expect(cn('class1', null, undefined, 'class2')).toBe('class1 class2');
  });

  it('handles boolean false values', () => {
    expect(cn('class1', false && 'class2', 'class3')).toBe('class1 class3');
  });

  it('handles numbers correctly', () => {
    // While unusual, numbers can be passed as valid CSS classes sometimes or as result of conditionals
    expect(cn('class1', 123)).toBe('class1 123');
  });

  it('handles mixed valid inputs gracefully', () => {
    expect(
      cn(
        'base-class',
        ['array-class1', 'array-class2'],
        { 'cond-class1': true, 'cond-class2': false },
        null,
        undefined,
        false && 'false-class',
        'final-class'
      )
    ).toBe('base-class array-class1 array-class2 cond-class1 final-class');
  });

  it('merges tailwind classes using tailwind-merge', () => {
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });
});
