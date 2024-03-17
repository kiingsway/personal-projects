import React from 'react';
import './_app.css';
import type { AppProps } from 'next/app';
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { app_name } from '../app/parameters';
import { ConfigProvider, theme, Layout } from 'antd';
import styles from './_app.module.scss';
import '@/app/i18n';
import useAppStorage from '@/app/hooks/useAppStorage';
import useCurrencies from '@/app/hooks/currencies';
import { useLanguage } from '@/app/hooks/useLanguage';
import AppHeader from '@/pages-components/AppHeader';

const { Header, Content, Footer } = Layout;

export default function App({ Component, pageProps }: AppProps): JSX.Element {

  const { darkAlgorithm: algorithm } = theme;

  const currencyExchange = { BRL: 5, CAD: 1.35, EUR: 0.92 };

  const currencyState = useCurrencies();
  const appStorage = useAppStorage();
  const language = useLanguage();

  const props = { ...pageProps, appStorage, currencyState, currencyExchange, language };

  return (
    <>
      <Head><title>{app_name}</title></Head>
      <Analytics />
      <ConfigProvider theme={{ algorithm }}>
        <Layout className={styles.app}>
          <Header className={styles.app_header}>
            <AppHeader favoriteTabs={appStorage.appStorage.fav_tabs} handleTab={appStorage.handleTab} />
          </Header>
          <Content className={styles.app_content}>
            <div className={styles.app_content_main}>
              <Component {...props} />
            </div>
          </Content>
          <Footer className={styles.app_footer} />
        </Layout>
      </ConfigProvider>
    </>
  );
}