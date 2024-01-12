import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/NavigationBar/NavBar";
import Wrapper from "@/components/LayoutWrapper";
import { LoginPage } from "@/components/LoginPage";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import * as en from "@/lang/en.json"
import * as vi from "@/lang/vi.json"
function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const messages = {
    vi,
    en
  };
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </IntlProvider>
  );
}

export default MyApp;
