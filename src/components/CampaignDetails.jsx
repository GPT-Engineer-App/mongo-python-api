import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Spinner, VStack, HStack } from '@chakra-ui/react';
import { fetchCampaignDetails } from '../services/gophishApi';

const CampaignDetails = () => {
  const { id } = useParams();
  const { data: campaign, isLoading, isError, error } = useQuery({
    queryKey: ['campaign', id],
    queryFn: () => fetchCampaignDetails(id),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Text>Error fetching campaign details: {error.message}</Text>;

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
        {/* Add more campaign details as needed */}
      </VStack>
    </Box>
  );
};

export default CampaignDetails;
