import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  });

  return (
    <Flex flexDir="column" w="100vw" h="100vh" align="center" justify="center">
      <Stack spacing="4" align="center">
        <Text fontSize="lg">Dashboard: {user?.email}</Text>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          width="80%"
          size="md"
          onClick={signOut}
        >
          Sign out
        </Button>

        <Can permissions={["metrics.list"]}>
          <Text fontSize="lg">Permission conceived</Text>
        </Can>
      </Stack>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");

  console.log(response);

  return {
    props: {},
  };
});
