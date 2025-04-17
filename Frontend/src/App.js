

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./styles/AuthModal.css";

import Navbar from "./components/Navbar";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import LandingPagenavbar from "./components/LandingPagenavbar";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
// import AptitudeStart from "./pages/PracticeAptitude";
import AptitudeStart from './pages/AptitudeStart';
import AptitudeQuiz from './pages/AptitudeQuiz';
import Progress from "./pages/Progress";
import MockInterviews from "./pages/MockInterviews";
import Quizzes from "./pages/Quizzes";
import LandingPage from "./components/LandingPage";
import LoginSignup from "./components/LoginSignup_1";
import FeaturesPage from "./pages/FeaturesPage";
import HowItWorks from "./pages/HowItWorks";
import Testimonials from "./pages/TestimonialsPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FAQs from "./pages/FAQs";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import ReviewQuizPage from "./pages/ReviewQuizPage";
import RoadmapDetailPage from "./pages/RoadmapDetailPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/adminLogin";

import AdminForgotPasswordForm from "./pages/AdminForgotPasswordForm"; // Import ForgotPasswordForm component
import AdminResetPasswordForm from "./pages/AdminResetPasswordForm";
import AdminUsers from "./pages/AdminUsers";
import AddQuestion from "./pages/AddQuestion";
import AdminQuestions from "./pages/AdminQuestions";
import AddRoadmap from "./pages/AddRoadmap";
import AdminRoadmaps from "./pages/AdminRoadmap";
import EditRoadmap from "./pages/EditRoadmap";



import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

// Layout component to manage navbar logic
const Layout = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const [showModal, setShowModal] = useState(false); // ✅ Manage modal state here


  //   return (
  //     <>
  //       {isLandingPage ? <LandingPagenavbar /> : <Navbar />}
  //       {children}
  //     </>
  //   );
  // };

  return (
    <>
      {isLandingPage ? (
        <LandingPagenavbar setShowModal={setShowModal} /> // ✅ pass it to navbar
      ) : (
        <Navbar />
      )}

      {children}

      {/* ✅ Auth Modal */}
      {showModal && (
        <div className="auth-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            <LoginSignup />
          </div>
        </div>
      )}
    </>
  );
};



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><LandingPage /></Layout>} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/reset-password" element={<ResetPassword />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/Testimonials" element={<Testimonials />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/fAQs" element={<FAQs />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPasswordForm />} />
        <Route path="/admin/reset-password" element={<AdminResetPasswordForm />} />
        {/* ✅ Protected Routes - User login नसेल तर Access नाही */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/roadmap" element={<Layout><Roadmap /></Layout>} />
          {/* <Route path="/AptitudeStart " element={<Layout><AptitudeStart /></Layout>} /> */}
          <Route path="/aptitude/start" element={<AptitudeStart />} />
          <Route path="/aptitude/quiz/:difficulty" element={<AptitudeQuiz />} />
          <Route path="/progress" element={<Layout><Progress /></Layout>} />
          <Route path="/mock-interviews" element={<Layout><MockInterviews /></Layout>} />
          <Route path="/quizzes" element={<Layout><Quizzes /></Layout>} />
          <Route path="/review-quiz/:attemptId" element={<Layout><ReviewQuizPage /></Layout>} />
          <Route path="/roadmap/:roadmapid" element={<RoadmapDetailPage />} />


          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/questions" element={<AdminQuestions />} />
          <Route path="/admin/questions/add" element={<AddQuestion />} />
          <Route path="/admin/add-roadmap" element={<AddRoadmap />} />
          <Route path="/admin/roadmaps" element={<AdminRoadmaps />} />
          <Route path="/admin/roadmaps/edit/:id" element={<EditRoadmap />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

