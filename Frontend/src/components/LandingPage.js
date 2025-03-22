

import React from "react";
import "../styles/LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-text">
                    <h1>Prepare Smarter, Succeed Faster!</h1>
                    <p>Get a structured approach to ace your interviews with expert-curated content and real-time practice.</p>
                    <button className="cta-button" onClick={() => navigate("/login")}>Get Started</button>
                </div>
                <div className="hero-image">
                    {/* <img src=".\images\landing_interview.jpg" alt="Interview Preparation" /> */}
                    <img src="/images/landing_interview.jpg" alt="Interview Preparation" />

                </div>
            </section>
        </div>
    );
};

export default LandingPage;




