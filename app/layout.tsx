import './globals.css';

export const metadata = {
  title: 'Procurement Catalogue',
  icons: {
    icon: "/procurement.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
