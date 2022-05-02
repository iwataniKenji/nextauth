import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

// função usada para páginas que apenas possam ser acessadas por visitantes
export function withSSRGuest<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    // mostra todos os cookies armazenados na página
    console.log(ctx.req.cookies);

    // verifica existência do cookie
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

    return await fn(ctx);
  };
}
