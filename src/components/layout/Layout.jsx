import Footer from './Footer';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div className='bg-white min-h-screen flex flex-col'>
      <NavBar />
      <main className='flex-1 px-1 mt-10 h-full'>
        <div className='mx-auto max-w-3xl'>{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
