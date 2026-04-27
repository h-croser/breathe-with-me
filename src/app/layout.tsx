import React, {PropsWithChildren} from 'react';
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import { mantineTheme } from '@/src/app/mantineTheme';
import {Shell} from "@/src/components/Shell/Shell";
import type { Metadata } from "next";
import '@mantine/core/styles.css';
import './globals.css';

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg' }
    ],
  },
};

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="icon" href="/icon.svg" type="image/svg" />
        <title>Breathe with me</title>
      </head>
      <body>
        <MantineProvider theme={mantineTheme} defaultColorScheme='auto'>
          <Shell>
            {children}
          </Shell>
        </MantineProvider>
      </body>
    </html>
  );
};

export default Layout;
