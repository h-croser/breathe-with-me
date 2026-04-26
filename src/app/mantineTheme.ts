import { createTheme } from '@mantine/core';
import { Playfair_Display, Lato, Inconsolata } from 'next/font/google';

const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-lato',
});

const inconsolata = Inconsolata({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-inconsolata',
});

export const mantineTheme = createTheme({
  fontFamily: `${lato.style.fontFamily}, sans-serif`,
  fontFamilyMonospace: `${inconsolata.style.fontFamily}, monospace`,
  headings: {
    fontFamily: `${playfairDisplay.style.fontFamily}, serif`,
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
