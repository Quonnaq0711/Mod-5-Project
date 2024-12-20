import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import LandingPage from './components/LandingPage/LandingPage';
import IndividualSpot from './components/SpotDetails/IndividualSpot';
import CreateASpot from './components/CreateSpot/createspot';
import NotFound from './components/NotFound /notfound';
import ManageSpots from './components/ManageSpot/ManageSpots';
import UpdateSpot from './components/ManageSpot/UpdateSpotForm';
import DeleteModal from './components/ManageSpot/DeleteSpot';
import UpdateReview from './components/ReviewModal/UpdateReview';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />    
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />, 
      },
     {
        path: '/spots/:spotId',
        element: <IndividualSpot />,
      },
      {
        path: '/spots',
        element: <CreateASpot />,
      },
      {
        path: "/user",
        element: <ManageSpots />
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpot />
      },
      {
        path: '/spots/:spotId/delete',
        element: <DeleteModal />
      },
      {
        path:'/reviews/:reviewId/edit',
        element: <UpdateReview />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
