import { Router } from "react-router-dom";
import "../../css/policies&alerts/Policy.css";

function Policy() {
  return (
    <div className="policy-container">
      <h1>Policy</h1>
      <div className="policy-content">
        <section>
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Payment information</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Process transactions</li>
            <li>Send important notices</li>
          </ul>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information from unauthorized access and disclosure.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at: privacy@example.com
          </p>
        </section>

        <div className="policy-date">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default Policy;
