import { useColorMode } from '@chakra-ui/react';
import Image from 'next/image';

const MoralisLogo = () => {
  const { colorMode } = useColorMode();

  return (
    <img className='header-logo'
    src={colorMode === 'dark' ? '/Logo-dark.svg' : '/Logo-light.svg'} alt="Logo" 
    />
    
    // <Image
    //   src={colorMode === 'dark' ? '/Logo-dark.svg' : '/Logo-light.svg'}
    //   height={50}
    //   width={250}
    //   alt="Logo"
    // />
  );
};

export default MoralisLogo;
