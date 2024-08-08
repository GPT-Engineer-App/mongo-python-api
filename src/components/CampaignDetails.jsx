import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { Box, Heading, Text, Spinner, VStack, HStack, Button, Alert, AlertIcon, Badge, Progress } from '@chakra-ui/react';
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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress': return 'yellow';
      case 'completed': return 'green';
      case 'scheduled': return 'blue';
      default: return 'gray';
    }
  };

  const calculateProgress = () => {
    if (!campaign.results) return 0;
    const total = campaign.results.length;
    const completed = campaign.results.filter(result => result.status === 'Completed').length;
    return (completed / total) * 100;
  };

  return (
    <Box maxW="container.lg" mx="auto" mt={8}>
      <Heading as="h2" size="xl" mb={6}>Campaign Details</Heading>
      <VStack align="start" spacing={6} bg="white" p={6} borderRadius="md" shadow="md">
        <HStack justifyContent="space-between" w="full">
          <Text fontSize="2xl" fontWeight="bold">{campaign.name}</Text>
          <Badge colorScheme={getStatusColor(campaign.status)} fontSize="md">{campaign.status}</Badge>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text fontWeight="bold">Created Date:</Text>
          <Text>{new Date(campaign.created_date).toLocaleDateString()}</Text>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text fontWeight="bold">Launch Date:</Text>
          <Text>{campaign.launch_date ? new Date(campaign.launch_date).toLocaleString() : 'Not launched'}</Text>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text fontWeight="bold">Send By Date:</Text>
          <Text>{campaign.send_by_date ? new Date(campaign.send_by_date).toLocaleString() : 'Not set'}</Text>
        </HStack>
        <Box w="full">
          <Text fontWeight="bold" mb={2}>Progress:</Text>
          <Progress value={calculateProgress()} colorScheme="green" hasStripe />
        </Box>
        {campaign.results && (
          <Box w="full">
            <Text fontWeight="bold" mb={2}>Results:</Text>
            <Text>Total Targets: {campaign.results.length}</Text>
            <Text>Emails Sent: {campaign.results.filter(result => result.status !== 'Sending').length}</Text>
            <Text>Opened: {campaign.results.filter(result => result.status === 'Opened').length}</Text>
            <Text>Clicked: {campaign.results.filter(result => result.status === 'Clicked').length}</Text>
          </Box>
        )}
      </VStack>
      <Button as={Link} to="/" mt={6} colorScheme="blue">
        Back to Campaigns
      </Button>
    </Box>
  );
};

export default CampaignDetails;
