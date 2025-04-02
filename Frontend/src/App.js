



import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPagenavbar from "./components/LandingPagenavbar";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Practice from "./pages/Practice";
import Progress from "./pages/Progress";
import MockInterviews from "./pages/MockInterviews";
import Quizzes from "./pages/Quizzes";
import LandingPage from "./components/LandingPage";
import LoginSignup from "./components/LoginSignup_1";
import FeaturesPage from "./pages/FeaturesPage";
import HowItWorks from "./pages/HowItWorks"; // Import How It Works Page
import Testimonials from "./pages/TestimonialsPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FAQs from "./pages/FAQs";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import AdminDashboard from "./pages/AdminDashboard";
//import AdminLogin from "./pages/AdminLogin";
//import AdminLogin from "./pages/adminLogin";
import AdminLogin from "./pages/adminLogin";

// Layout component to manage navbar logic
const Layout = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {isLandingPage ? <LandingPagenavbar /> : <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><LandingPage /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/roadmap" element={<Layout><Roadmap /></Layout>} />
        <Route path="/practice" element={<Layout><Practice /></Layout>} />
        <Route path="/progress" element={<Layout><Progress /></Layout>} />
        <Route path="/mock-interviews" element={<Layout><MockInterviews /></Layout>} />
        <Route path="/quizzes" element={<Layout><Quizzes /></Layout>} />
        <Route path="/login" element={<Layout><LoginSignup /></Layout>} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/Testimonials" element={<Testimonials />} />
        <Route path="/AboutUs" element={< AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/fAQs" element={<FAQs />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
