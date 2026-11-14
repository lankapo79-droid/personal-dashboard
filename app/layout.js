export const metadata = {
  title: 'Personal Dashboard',
  description: 'Cute personal dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#f4efe6' }}>{children}</body>
    </html>
  );
}