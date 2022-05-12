import { FormEvent, useContext, useState } from "react";
import { Flex, Button, Input, Stack } from "@chakra-ui/react";

import { AuthContext } from "../contexts/AuthContext";
import { withSSRGuest } from "../utils/withSSRGuest";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        onSubmit={handleSubmit}
        width="100%"
        maxWidth={360}
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4" width="80%">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </Stack>
        <Button type="submit" mt="6" colorScheme="pink" width="80%" size="md">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
