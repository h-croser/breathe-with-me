import React, {PropsWithChildren} from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from "@mantine/notifications";
import { mantineTheme } from '@/src/app/mantineTheme';
import { Shell } from "@/src/components/Shell/Shell";
import { SettingsProvider } from "@/src/components/Settings/SettingsProvider/SettingsProvider";
import type { Metadata } from "next";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Breathe with me',
  description: 'A tool for mitigating anxiety symptoms',
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
          <Notifications position="bottom-center" containerWidth={600} />
          <SettingsProvider>
            <Shell>
              {children}
            </Shell>
          </SettingsProvider>
        </MantineProvider>
      </body>
    </html>
  );
};

export default Layout;
