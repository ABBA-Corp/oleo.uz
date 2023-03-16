import type { AppProps } from "next/app";
import "../styles/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TranslationsContextProvider from "../contexts/translations";
import SiteInfoContextProvider from "../contexts/siteinfo";
import ModalContextProvider from "../contexts/modal";
import ProductsContextProvider from "../contexts/products";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TranslationsContextProvider>
      <SiteInfoContextProvider>
        <ProductsContextProvider>
          <ModalContextProvider>
            <Component {...pageProps} />
          </ModalContextProvider>
        </ProductsContextProvider>
      </SiteInfoContextProvider>
    </TranslationsContextProvider>
  );
}

export const url = "https://oleo.uz";
