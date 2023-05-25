import { Navigate , Outlet, Route } from 'react-router-dom';
import { ROUTES } from '../../../configs/routes';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';


interface ProtectedRouteProps {
  path: string;
  element: React.ReactElement;
}

const ProtectedRoute = (Props:any) => {
  const auth =  Cookies.get(ACCESS_TOKEN_KEY);


  if(auth){
    return <Outlet/>
  }
  return <Navigate to={ROUTES.login}/>  
};

export default ProtectedRoute;
