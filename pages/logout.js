import nookies from 'nookies';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Logoff(){
  const router = useRouter();
  
  useEffect(() => {
    nookies.destroy(null, 'USER_TOKEN');
    
    router.push('/login');
  }, [])

  return <div></div>
}