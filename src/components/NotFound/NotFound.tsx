import type React from 'react';
import { Link } from '@/src/components/Link/Link';
import { IconHome } from '@tabler/icons-react';
import { Button, Container, Text, Title, Stack, Paper } from '@mantine/core';

export const NotFound: React.FC = () => (
  <Container>
    <Paper shadow="sm" p="md" m="md" radius="lg">
      <Stack mb="md" gap="xs" align="center">
        <Stack gap={0}>
          <Title ta="center" order={1}>
            <Text inherit span ff="monospace" mr={10}>
              404
            </Text>{' '}
            page not found
          </Title>
        </Stack>
        <Button
          w="50%"
          size="md"
          variant="filled"
          color="moss"
          c="white"
          leftSection={<IconHome size={18} />}
          className="actionButton"
          component={Link}
          href="/"
        >
          Home
        </Button>
      </Stack>
    </Paper>
  </Container>
);
