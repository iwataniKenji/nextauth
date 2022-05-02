import { GetServerSideProps } from "next";
import { FormEvent, useContext, useState } from "react";
import { parseCookies } from "nookies";

import { AuthContext } from "../contexts/AuthContext";
import styles from "../styles/Home.module.scss";

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
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button type="submit">Entrar</button>
    </form>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // mostra todos os cookies armazenados na página
  console.log(ctx.req.cookies);

  const cookies = parseCookies(ctx);

  // se token existir, redireciona para dashboard
  if (cookies["nextauth.token"]) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
