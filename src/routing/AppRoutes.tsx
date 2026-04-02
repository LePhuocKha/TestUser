import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom'
import { App } from '../App'
import Login from '../page/login/login'
import ProtectedRoute from './ProtectedRoute'
import UserInfor from '../page/userInfor'
import MainLayout from './MainLayout'
import Data from '../page/data'

const AppRoutes = () => {
   
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<ProtectedRoute />}>
          <Route element={<App />}>
           <Route element={<MainLayout />}>
            <Route path="/" element={<UserInfor />} />
            <Route path="/data" element={<Data />} />
          </Route>
          </Route>
        </Route>

        <Route path="/user/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes }