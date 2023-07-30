import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Admin Components
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAddAdvisor from "./pages/admin/AddAdvisor";
import AdminProfile from "./pages/admin/MyProfile";
import AdminViewUsers from "./pages/admin/ViewUsers";
import Complaints from "./pages/admin/AllComplaint";
import UserDetails from "./pages/admin/UserDetails";

// Advisor Components
import AdvisorDashboard from "./pages/advisor/Dashboard";
import AdvisorProfile from "./pages/advisor/MyProfile";
import AdvisorUpdateProfile from "./pages/advisor/UpdateProfile";
import AdvisorViewLeads from "./pages/advisor/ViewLeads";
import AdvisorViewLeadsDetails from "./pages/advisor/ViewLeadsDetails";
import AdvisorAddProduct from "./pages/advisor/AddProduct";
import AdvisorProducts from "./pages/advisor/MyProduct";
import AdvisorViewCompany from "./pages/advisor/ViewCompany";
import AdvisorMyAvailability from "./pages/advisor/MyAvailability";
import AdvisorNotification from "./pages/advisor/Notification";
import AdvisorAppointmentDetails from "./pages/advisor/AppointmentDetails";
import AdvisorMyAppointment from "./pages/advisor/MyAppointment";
import ComplaintDetails from "./pages/advisor/ComplaintDetails";

// Leads Components
import LeadsDashboard from "./pages/leads/Dashboard";
import LeadsProfile from "./pages/leads/MyProfile";
import LeadsViewAdvisor from "./pages/leads/ViewAdvisor";
import LeadsViewAdvisorDetails from "./pages/leads/ViewAdvisorDetails";
import LeadsAdvisorRatingList from "./pages/leads/AdvisorRatingList";
import LeadsBookAppointment from "./pages/leads/BookAppointment";
import LeadsMyAppointment from "./pages/leads/MyAppointment";
import LeadsAppointmentDetails from "./pages/leads/AppointmentDetails";
import LeadsNotification from "./pages/leads/Notification";
import LeadsSubmitComplaint from "./pages/leads/SubmitComplaint";
import MyComplaint from "./pages/leads/MyComplaint";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivacyAndPolicy from "./pages/PrivacyAndPolicy";
import RatingAndReview from "./pages/leads/RatingAndReview";
import MyCredentials from "./pages/advisor/MyCredentials";
import MyRating from "./pages/advisor/MyRatings";
import ViewRatings from "./pages/admin/ViewRatings";
import MyMedicalHistory from "./pages/leads/MyMedicalHistory";
import AdvisorSubmitComplaint from "./pages/advisor/AdvisorSubmitComplaint";
import AdvisorComplaint from "./pages/advisor/AdvisorComplaint";
import AllAppointments from "./pages/admin/AllAppointments";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy-and-policy" element={<PrivacyAndPolicy />} />

        {/* Admin Routes */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-advisor" element={<AdminAddAdvisor />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/view-users" element={<AdminViewUsers />} />
          <Route path="/admin/view-ratings" element={<ViewRatings />} />
          <Route path="/admin/complaints" element={<Complaints />} />
          <Route path="/admin/user-details" element={<UserDetails />} />
          <Route path="/admin/appointment" element={<AllAppointments />} />
        </Route>

        {/* Advisor Routes */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/advisor/dashboard" element={<AdvisorDashboard />} />
          <Route path="/advisor/profile" element={<AdvisorProfile />} />
          <Route
            path="/advisor/update-profile"
            element={<AdvisorUpdateProfile />}
          />
          <Route path="/advisor/view-leads" element={<AdvisorViewLeads />} />
          <Route
            path="/advisor/leads-details"
            element={<AdvisorViewLeadsDetails />}
          />
          <Route path="/advisor/add-product" element={<AdvisorAddProduct />} />
          <Route path="/advisor/my-products" element={<AdvisorProducts />} />
          <Route
            path="/advisor/view-company"
            element={<AdvisorViewCompany />}
          />
          <Route
            path="/advisor/availability"
            element={<AdvisorMyAvailability />}
          />
          <Route
            path="/advisor/notification"
            element={<AdvisorNotification />}
          />
          <Route
            path="/advisor/appointment-details"
            element={<AdvisorAppointmentDetails />}
          />
          <Route
            path="/advisor/my-appointment"
            element={<AdvisorMyAppointment />}
          />
          <Route
            path="/advisor/complaint-details"
            element={<ComplaintDetails />}
          />
          <Route path="/advisor/my-credentials" element={<MyCredentials />} />
          <Route path="/advisor/my-rating" element={<MyRating />} />
          <Route
            path="/advisor/submit-complaint"
            element={<AdvisorSubmitComplaint />}
          />
          <Route path="/advisor/my-complaint" element={<AdvisorComplaint />} />
        </Route>

        {/* Leads Routes */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/leads/dashboard" element={<LeadsDashboard />} />
          <Route path="/leads/profile" element={<LeadsProfile />} />
          <Route path="/leads/view-advisor" element={<LeadsViewAdvisor />} />
          <Route
            path="/leads/advisor-details"
            element={<LeadsViewAdvisorDetails />}
          />
          <Route
            path="/leads/advisor-rating-list"
            element={<LeadsAdvisorRatingList />}
          />
          <Route
            path="/leads/book-appointment"
            element={<LeadsBookAppointment />}
          />
          <Route
            path="/leads/my-appointment"
            element={<LeadsMyAppointment />}
          />
          <Route
            path="/leads/appointment-details"
            element={<LeadsAppointmentDetails />}
          />
          <Route path="/leads/notification" element={<LeadsNotification />} />
          <Route
            path="/leads/submit-complaint"
            element={<LeadsSubmitComplaint />}
          />
          <Route path="/leads/my-complaint" element={<MyComplaint />} />
          <Route
            path="/leads/rating-and-review"
            element={<RatingAndReview />}
          />
          <Route path="/leads/medical-history" element={<MyMedicalHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
