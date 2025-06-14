// components/Layout.tsx

import React from 'react';
import Head from 'next/head';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Project Procurement' }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Project Procurement Application" />
      </Head>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
