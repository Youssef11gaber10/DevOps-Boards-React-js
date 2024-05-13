import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Mainlayout from './Components/Layouts/Mainlayout/Mainlayout';
import Notfound from './Components/Layouts/Notfoundlayout/Notfound';
import Categories from './Components/Categories/Categories';
import Proddetails from './Components/Products/ProductDetails/Proddetails';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Brands from './Components/Brands/Brands';

import Profile from './Components/Profile/Profile';
import AuthProvider from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify';

import Recovery from './Components/Login/Recovery';

import ProductCategory from './Components/Categories/ProductCategory';
import ProductSubCategorey from './Components/Categories/ProductSubCategorey';
import ProductBrand from './Components/Brands/ProductBrand';
import Projects from './Components/Projects/Projects';
import Tasks from './Components/Tasks/Tasks';
import CreateProject from './Components/Projects/Project/CreateProject/CreateProject';
import CreateTask from './Components/Tasks/CreateTask/CreateTask';
import UpdateTask from './Components/Tasks/CreateTask/UpdateTask';
import UpdateProject from './Components/Projects/Project/CreateProject/UpdateProject';
import ProjectDeveloper from './Components/Projects/Project/ProjectDeveloper';
import Acceptance from './Components/Projects/Project/CreateProject/Acceptance';
import TaskDeveloper from './Components/Tasks/TaskDeveloper';





function App() {

  const routes = createBrowserRouter([
    {
      path: '/', element: <Mainlayout />,
      children: [
        { index: true, element: <Login /> },
        {
          path: "/ecommerce-react-app", element:
            <ProtectedRoute>
              
                <Home />
              
            </ProtectedRoute>
        },

        {
          path: '/home', element:

            <ProtectedRoute>
              
                <Home />
              
            </ProtectedRoute>
        },
        {
          path: '/projects', element:

            <ProtectedRoute>
              
                <Projects />
              
            </ProtectedRoute>
        },
        {
          path: '/projectDeveloper', element:

            <ProtectedRoute>
              
                <ProjectDeveloper />
              
            </ProtectedRoute>
        },
        {
          path: '/acceptance/:id', element:

            <ProtectedRoute>
              
                <Acceptance />
              
            </ProtectedRoute>
        },
        {
          path: '/taskDeveloper', element:

            <ProtectedRoute>
              
                <TaskDeveloper />
              
            </ProtectedRoute>
        },
        {
          path: '/tasks', element:

            <ProtectedRoute>
              
                <Tasks />
              
            </ProtectedRoute>
        },
        ,
        {
          path: '/createproject', element:

            <ProtectedRoute>
              
                <CreateProject />
              
            </ProtectedRoute>
        },
        {
          path: '/createtask', element:

            <ProtectedRoute>
              
                <CreateTask />
              
            </ProtectedRoute>
        }
        ,
        {
          path: '/updateproject/:name/:id', element:
            <ProtectedRoute>
              
                <UpdateProject />
              
            </ProtectedRoute>
        },
        {
          path: '/updatetask/:id', element:
            <ProtectedRoute>
              
                <UpdateTask />
              
            </ProtectedRoute>
        },
        {
          path: '/products', element:
            <ProtectedRoute>
              
                <Products />
              
            </ProtectedRoute>
        },
        {
          path: '/details/:id', element:
            <ProtectedRoute>
              
                <Proddetails />
              
            </ProtectedRoute>
        },
    
        {
          path: '/productcategory/:categoryId', element:

            <ProtectedRoute>
              
                <ProductCategory />
              
            </ProtectedRoute>

        },
        {
          path: '/productsubcategory/:subcategoryId', element:

            <ProtectedRoute>
              
                <ProductSubCategorey />
              
            </ProtectedRoute>

        },
        {
          path: '/productbrand/:brandId', element:

            <ProtectedRoute>
              
                <ProductBrand />
              
            </ProtectedRoute>

        },
        { path: '/profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
        { path: '/categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: '/brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        

        { path: '/account-recovery', element: <Recovery /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },

      ]
    },

    { path: '*', element: <Notfound /> }


  ])
  return (
    <>
      <AuthProvider>

          <RouterProvider router={routes} />
          <ToastContainer />

      </AuthProvider>
    </>
  );
}

export default App;
