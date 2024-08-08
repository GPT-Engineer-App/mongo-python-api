// Update this page (the content is just a fallback if you fail and example)
import { Container, VStack } from "@chakra-ui/react";
import CampaignList from "../components/CampaignList";

const Index = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <CampaignList />
      </VStack>
    </Container>
  );
};

export default Index;
