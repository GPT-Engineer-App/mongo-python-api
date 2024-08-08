// Update this page (the content is just a fallback if you fail and example)
import { Container, VStack, Heading, Text, Box } from "@chakra-ui/react";
import CampaignList from "../components/CampaignList";

const Index = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={2}>GoPhish Campaign Dashboard</Heading>
          <Text fontSize="lg" color="gray.600">View and manage your phishing campaigns</Text>
        </Box>
        <CampaignList />
      </VStack>
    </Container>
  );
};

export default Index;
