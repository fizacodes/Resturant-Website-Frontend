import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomeLogin from "./Components/HomeLogin";
import WhyCuisine from "./Components/WhyCuisine";
import OurStory from "./Components/OurStory";
import JoinUs from "./Components/JoinUs";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import MenuManagement from "./Components/MenuManagement";
import ProtectedRoute from "./Components/ProtectedRoutes";
import PrivateHome from "./Components/PrivateHome";
import Menu from "./Components/Menu";
import ReservationTable from "./Components/ReservationTables";
import ReservationFetch from "./Components/ReservationFetch";

function App() {
  return (
    <Routes>

      {/* Public Home Page */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <HomeLogin />
            <WhyCuisine />
            <OurStory />
            <JoinUs />
            <Footer />
          </>
        }
      />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <Sidebar />
            <Dashboard />
          </ProtectedRoute>
        }
      />
       <Route
        path="/menu-management"
        element={
          <ProtectedRoute role="admin">
            <Sidebar />
            <MenuManagement />
          </ProtectedRoute>
        }
      />
       <Route
        path="/reservations"
        element={
          <ProtectedRoute role="admin">
            <Sidebar />
           <ReservationFetch/>
          </ProtectedRoute>
        }
      />
       <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute role="user">
            <PrivateHome/>
            <Menu/>
            <OurStory/>
            <ReservationTable/>
            <Footer/>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
