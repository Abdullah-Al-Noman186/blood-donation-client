import './globals.css';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '../providers/AuthProvider';
import QueryProvider from '../providers/QueryProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'BloodLink — Blood Donation Platform',
  description: 'Connecting donors with those in need',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster position="top-center" reverseOrder={false} />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}