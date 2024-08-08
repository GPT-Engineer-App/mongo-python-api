import { Container, VStack, Heading, Text, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CampaignList from "../components/CampaignList";

const Index = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={2}>GoPhish Campaign Dashboard</Heading>
          <Text fontSize="lg" color="gray.600" mb={4}>View and manage your phishing campaigns</Text>
          <Button as={Link} to="/create-campaign" colorScheme="green" size="lg">
            Create New Campaign
          </Button>
        </Box>
        <CampaignList />
      </VStack>
    </Container>
  );
};

export default Index;
