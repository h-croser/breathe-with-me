import type React from "react";
import {Container} from "@mantine/core";
import {Breather} from "@/src/components/Breather/Breather";
import {
  GroundingNotificationProvider
} from "@/src/components/Grounding/GroundingNotificationProvider/GroundingNotificationProvider";


const Page: React.FC = () => {
  return (
    <>
      <Container size="xl" p="xs" h="90vh">
        <Breather />
      </Container>
      <GroundingNotificationProvider />
    </>
  )
}

export default Page;