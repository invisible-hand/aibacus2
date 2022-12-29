const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='py-1 bg-gray-100'>
      <p className='text-center mt-1'>
        Aibacus - {year} &copy;. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
