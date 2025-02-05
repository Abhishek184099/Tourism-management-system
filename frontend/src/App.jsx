import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import LandingPage from './pages/LandingPage';
import UserLogin from './pages/traveler/UserLogin';
import ServiceProviderLogin from './pages/service provider/ServiceProviderLogin';
import UserSignup from './pages/traveler/UserSignup';
import ServiceProviderSignup from "./pages/service provider/ServiceProvideSignup";
import UserPreferences from './pages/traveler/UserPreference';
import ExploreNepal from './pages/ExploreNepal';
import AdminPanel from './pages/service provider/AdminPanel';
import ManageDestinations from './pages/service provider/ManageDestination';
import AddDestination from './pages/service provider/AddDestination';
import {useAuthContext} from "./context/AuthContext";
import AllDestinations from './pages/AllDestination';
import DestinationDetails from './pages/DestinationDetails';
import AdminManagePackages from './pages/service provider/AdminManagePackages';
import AdminAddEditPackage from './pages/service provider/AdminAddEditPackage';
import AllPackages from './pages/traveler/AllPackages';
import PackageDetails from './pages/traveler/PackageDetails';
import BookingPaymentForm from './pages/traveler/BookingPaymentForm';
import UserBookings from './pages/traveler/UserBooking';
import AdminBookings from './pages/service provider/AdminBooking';
import EditDestination from './pages/service provider/EditDestination';

function App() {
   
  const {authUser} = useAuthContext()
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/service-provider-login" element={<ServiceProviderLogin />} />
        <Route path="/service-provider-signup" element={<ServiceProviderSignup />} />
        <Route path="/preferences" element={<UserPreferences />} />
        <Route path="/explorenepal" element={authUser ? <ExploreNepal /> : <Navigate to = "/"/>} />
        <Route path="/admin-dashboard" element={<AdminPanel />} />
        <Route path="/admin/destinations" element={<ManageDestinations />} />
        <Route path="/admin/add-destination" element={<AddDestination />} />
        <Route path="/all-destinations" element={<AllDestinations />} />
        <Route path="/destination/:id" element={<DestinationDetails />} /> 
        <Route path="/admin/package" element={<AdminManagePackages/>} /> 
        <Route path="/admin/add-package" element={<AdminAddEditPackage/>} /> 
        <Route path="/admin/edit-package/:packageId" element={<AdminAddEditPackage/>} /> 
        <Route path="/packages" element={<AllPackages />} />
        <Route path="/package/:packageId" element={<PackageDetails />} />
        <Route path="/book/:packageId" element={<BookingPaymentForm />} />
        <Route path="/my-bookings" element={<UserBookings />} />
        <Route path='/admin/bookings' element= {<AdminBookings/> }/>
        <Route path='/admin/edit-destination/:destinationId' element= {<EditDestination/> }/>







        

      </Routes>
      <Toaster />
    </div>
  )
}

export default App
