import React from 'react';
import styles from './Legal.module.css';

export default function PrivacyPolicy() {
  return (
      <div className={styles.legalContainer}>
        <div className={styles.legalContent}>
          <h1>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2>1. Information We Collect</h2>
            <p>
              At Soph's Menu, we collect information you provide directly to us, such as when you create an account, 
              submit recipes, write reviews, or contact us. This may include:
            </p>
            <ul>
              <li>Name and email address</li>
              <li>Profile information</li>
              <li>Recipe content and photos</li>
              <li>Reviews and ratings</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>
          </section>

          <section>
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties.
            </p>
          </section>

          <section>
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2>5. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our site. You can control 
              cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2>7. Children's Privacy</h2>
            <p>
              Our service is not directed to children under 13. We do not knowingly collect personal information 
              from children under 13. If we become aware that we have collected such information, we will take 
              steps to delete it.
            </p>
          </section>

          <section>
            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting 
              the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at:
            </p>
            <p>
              Email: smadden1234567890@gmail.com<br />
            </p>
          </section>
        </div>
      </div>
  );
}
