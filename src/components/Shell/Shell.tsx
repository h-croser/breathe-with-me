'use client';

import React, {PropsWithChildren} from 'react';
import NextImage from 'next/image';
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Box, Container,
  Group,
  Image,
  rem,
  RemoveScroll, Title
} from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { ColorSchemeControl } from '@mantinex/mantine-header';
import {SettingsModal} from "@/src/components/Settings/SettingsModal/SettingsModal";
import { Link } from '@/src/components/Link/Link';
import '@mantinex/mantine-header/styles.css';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const HEADER_HEIGHT = 50;

export const Shell: React.FC<PropsWithChildren> = ({ children }) => {
  const { pinned } = useHeadroom({ fixedAt: HEADER_HEIGHT });

  return (
    <AppShell
      transitionDuration={300}
      header={{ height: HEADER_HEIGHT, collapsed: !pinned, offset: false }}
    >
      <AppShellHeader className={RemoveScroll.classNames.zeroRight} opacity={0.5}>
        <Container size="lg" h="100%" miw={300}>
          <Group align="center" justify="space-between" wrap="nowrap" px="sm" h="100%">
            <Box>
              <Link href="/" className="mantine-focus-auto">
                <Image
                  src={`${BASE_PATH}/icon.svg`}
                  alt="Logo"
                  height={40}
                  width={40}
                  component={NextImage}
                  priority
                />
              </Link>
            </Box>
            <Title fz={{base: 20, sm: 25, md: 30}}>Breathe with me</Title>
            <Group align="center" wrap="nowrap">
              <SettingsModal />
              <ColorSchemeControl />
            </Group>
          </Group>
        </Container>
      </AppShellHeader>
      <AppShellMain pt={rem(HEADER_HEIGHT)}>
        {children}
      </AppShellMain>
    </AppShell>
  );
};
