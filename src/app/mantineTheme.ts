import { createTheme } from '@mantine/core';
import { Inconsolata, Elms_Sans } from 'next/font/google';

const inconsolata = Inconsolata({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-inconsolata',
});

const elmsSans = Elms_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-elms-sans',
});

export const mantineTheme = createTheme({
  fontFamily: `${elmsSans.style.fontFamily}, sans-serif`,
  fontFamilyMonospace: `${inconsolata.style.fontFamily}, monospace`,
  headings: {
    fontFamily: `${elmsSans.style.fontFamily}, sans-serif`,
  },
  fontSizes: {
    xs: '0.875rem',
    sm: '1rem',
    md: '1.125rem',
    lg: '1.375rem',
    xl: '1.75rem'
  },
  primaryColor: 'ocean',
  colors: {
    ocean: [
      '#e8f0f7',
      '#c7d9ed',
      '#a5c1e3',
      '#82aad8',
      '#5f93ce',
      '#3d7dc4',
      '#2d6aad',
      '#1e5896',
      '#10477f',
      '#033768',
    ],
    sage: [
      '#eaf0e8',
      '#d0dece',
      '#b6ccb4',
      '#9cba9a',
      '#83a980',
      '#6a9867',
      '#55844f',
      '#406f3b',
      '#2c5b27',
      '#194714',
    ]
  }
});
