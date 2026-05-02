import type React from "react";
import {Container} from "@mantine/core";
import {Breather} from "@/src/components/Breather/Breather";


const Page: React.FC = () => {
  return (
    <Container size="xl" p="xs" h="90vh">
      <Breather />
    </Container>
  )
}

export default Page;