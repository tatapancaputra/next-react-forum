import ReduxProvider from '@redux/Provider';
import '@styles/global.scss';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Daftar Semua Komunitas | KASKUS',
  description:
    'Forum diskusi hobi, rumah ribuan komunitas dan pusat jual beli barang hobi di Indonesia.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReduxProvider>
          <main className='app w-full fx'>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
