import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";


const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	console.log("products", products);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text fontSize={"30"} fontWeight={"bold"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"} textAlign={"center"}>
          Current Product 🚀
        </Text>
        <SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</SimpleGrid>
       {products.length === 0 && (
  <VStack spacing={4}>
    <Text fontSize='xl' textAlign="center" fontWeight='bold' color='gray.500'>
      No products found 😢
    </Text>
    <ChakraLink
      as={RouterLink}
      to="/create"
      fontSize="lg"
      color="blue.500"
      _hover={{ textDecoration: "underline" }}
    >
      ➕ Create a product
    </ChakraLink>
  </VStack>
)}
      </VStack>
    </Container>
  )
}

export default HomePage