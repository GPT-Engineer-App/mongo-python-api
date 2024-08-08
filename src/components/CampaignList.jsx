import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Text, Spinner, Button, Alert, AlertIcon, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { fetchCampaigns } from '../services/gophishApi';

const CampaignList = () => {
  const { data: campaigns, isLoading, isError, error } = useQuery({
    queryKey: ['campaigns'],
    queryFn: fetchCampaigns,
    retry: 3,
    retryDelay: 1000,
  });

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading campaigns...</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert status="error" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
        <AlertIcon boxSize="40px" mr={0} />
        <Text mt={4} mb={2} fontSize="lg">Error fetching campaigns</Text>
        <Text>{error.message}</Text>
      </Alert>
    );
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress': return 'yellow';
      case 'completed': return 'green';
      case 'scheduled': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>GoPhish Campaigns</Heading>
      {campaigns && campaigns.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Created Date</Th>
              <Th>Status</Th>
              <Th>Launch Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {campaigns.map((campaign) => (
              <Tr key={campaign.id}>
                <Td>{campaign.name}</Td>
                <Td>{new Date(campaign.created_date).toLocaleString()}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                </Td>
                <Td>{campaign.launch_date ? new Date(campaign.launch_date).toLocaleString() : 'Not launched'}</Td>
                <Td>
                  <Button as={Link} to={`/campaign/${campaign.id}`} colorScheme="blue" size="sm">
                    View Details
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Alert status="info">
          <AlertIcon />
          No campaigns found. Create a new campaign to get started.
        </Alert>
      )}
    </Box>
  );
};

export default CampaignList;
