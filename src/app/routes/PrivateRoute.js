"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const {user} = useSelector((state)=>{
    return state;
})


  useEffect(() => {
    // Your authentication logic goes here
    // For example, you might check if the user is logged in
   

    if (!user.isSignedIn) {
      // Redirect to the login page if not authenticated
      router.push('/login');
    }
  }, [user]);

  if(!user.isSignedIn)
  {
    return <></>
  }

  // Render the children only if authenticated
  return <>{children}</>;
};

export default PrivateRoute;
