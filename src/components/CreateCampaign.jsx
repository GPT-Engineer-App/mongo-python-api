import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Box, Heading, VStack, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { createCampaign } from '../services/gophishApi';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      toast({
        title: 'Campaign created.',
        description: "We've created your campaign for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
    },
    onError: (error) => {
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const campaignData = Object.fromEntries(formData);
    mutation.mutate(campaignData);
  };

  return (
    <Box maxW="container.md" mx="auto" mt={8}>
      <Heading as="h2" size="xl" mb={6}>Create New Campaign</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Campaign Name</FormLabel>
            <Input name="name" placeholder="Enter campaign name" />
          </FormControl>
          <FormControl>
            <FormLabel>Launch Date</FormLabel>
            <Input name="launch_date" type="datetime-local" />
          </FormControl>
          <FormControl>
            <FormLabel>Send By Date</FormLabel>
            <Input name="send_by_date" type="datetime-local" />
          </FormControl>
          <Button type="submit" colorScheme="blue" isLoading={mutation.isLoading}>
            Create Campaign
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateCampaign;
