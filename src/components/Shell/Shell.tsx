'use client';

import React, {PropsWithChildren} from 'react';
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Box,
  Group,
  Image,
  rem,
  RemoveScroll
} from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { ColorSchemeControl } from '@mantinex/mantine-header';
import { Link } from '@/src/components/Link/Link';
import '@mantinex/mantine-header/styles.css';

const HEADER_HEIGHT = 80;

export const Shell: React.FC<PropsWithChildren> = ({ children }) => {
  const { pinned } = useHeadroom({ fixedAt: HEADER_HEIGHT });

  return (
    <AppShell
      transitionDuration={300}
      header={{ height: HEADER_HEIGHT, collapsed: !pinned, offset: false }}
    >
      <AppShellHeader className={RemoveScroll.classNames.zeroRight}>
        <Group align="center" justify="space-between" wrap="nowrap" p="md">
          <Box>
            <Link href="/" className="mantine-focus-auto">
              <Image src="/icon.svg" alt="Logo" height={40} />
            </Link>
          </Box>
          <ColorSchemeControl />
        </Group>
      </AppShellHeader>
      <AppShellMain pt={rem(HEADER_HEIGHT)}>
        {children}
      </AppShellMain>
    </AppShell>
  );
};
