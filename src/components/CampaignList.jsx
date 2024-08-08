import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Text, Spinner } from '@chakra-ui/react';
import { fetchCampaigns } from '../services/gophishApi';

const CampaignList = () => {
  const { data: campaigns, isLoading, isError, error } = useQuery({
    queryKey: ['campaigns'],
    queryFn: fetchCampaigns,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Text>Error fetching campaigns: {error.message}</Text>;

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
            </Tr>
          </Thead>
          <Tbody>
            {campaigns.map((campaign) => (
              <Tr key={campaign.id}>
                <Td>{campaign.name}</Td>
                <Td>{new Date(campaign.created_date).toLocaleDateString()}</Td>
                <Td>{campaign.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text>No campaigns found.</Text>
      )}
    </Box>
  );
};

export default CampaignList;
