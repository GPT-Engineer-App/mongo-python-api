import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { Box, Heading, Text, Spinner, VStack, HStack, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { fetchCampaignDetails } from '../services/gophishApi';

const CampaignDetails = () => {
  const { id } = useParams();
  const { data: campaign, isLoading, isError, error } = useQuery({
    queryKey: ['campaign', id],
    queryFn: () => fetchCampaignDetails(id),
  });

  if (isLoading) return <Spinner size="xl" />;
  if (isError) return (
    <Alert status="error">
      <AlertIcon />
      Error fetching campaign details: {error.message}
    </Alert>
  );

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>Campaign Details</Heading>
      <VStack align="start" spacing={4}>
        <HStack>
          <Text fontWeight="bold">Name:</Text>
          <Text>{campaign.name}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Created Date:</Text>
          <Text>{new Date(campaign.created_date).toLocaleDateString()}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Status:</Text>
          <Text>{campaign.status}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Launch Date:</Text>
          <Text>{campaign.launch_date ? new Date(campaign.launch_date).toLocaleString() : 'Not launched'}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Send By Date:</Text>
          <Text>{campaign.send_by_date ? new Date(campaign.send_by_date).toLocaleString() : 'Not set'}</Text>
        </HStack>
      </VStack>
      <Button as={Link} to="/" mt={4} colorScheme="blue">
        Back to Campaigns
      </Button>
    </Box>
  );
};

export default CampaignDetails;
