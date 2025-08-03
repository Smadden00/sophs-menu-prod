import styles from './Legal.module.css';

export default function TermsOfService() {
  return (
      <div className={styles.legalContainer}>
        <div className={styles.legalContent}>
          <h1>Terms of Service</h1>
          <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Soph's Menu ("Service"), you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>
              Soph's Menu is a platform that allows users to share recipes, write reviews, and discover new 
              culinary experiences. We reserve the right to modify or discontinue the service at any time.
            </p>
          </section>

          <section>
            <h2>3. User Accounts</h2>
            <p>
              To access certain features, you must create an account. You are responsible for:
            </p>
            <ul>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Providing accurate and complete information</li>
            </ul>
          </section>

          <section>
            <h2>4. User Content</h2>
            <p>
              By submitting content (recipes, reviews, photos, etc.) to our service, you:
            </p>
            <ul>
              <li>Retain ownership of your content</li>
              <li>Grant us a license to use, display, and distribute your content</li>
              <li>Warrant that you have the right to submit the content</li>
              <li>Agree that your content does not violate any laws or third-party rights</li>
            </ul>
          </section>

          <section>
            <h2>5. Prohibited Uses</h2>
            <p>You may not use our service to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Submit false, misleading, or fraudulent information</li>
              <li>Infringe on intellectual property rights</li>
              <li>Upload malicious code or viruses</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Spam or send unsolicited communications</li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>
          </section>

          <section>
            <h2>6. Content Moderation</h2>
            <p>
              We reserve the right to review, edit, or remove any content that violates these terms or is 
              otherwise objectionable. We may suspend or terminate accounts that repeatedly violate our policies.
            </p>
          </section>

          <section>
            <h2>7. Intellectual Property</h2>
            <p>
              The service and its original content, features, and functionality are owned by Soph's Menu and are 
              protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2>8. Disclaimer of Warranties</h2>
            <p>
              The service is provided "as is" without warranties of any kind. We do not warrant that the service 
              will be uninterrupted, secure, or error-free. Recipe information is provided by users and we make 
              no guarantees about accuracy or safety.
            </p>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>
            <p>
              In no event shall Soph's Menu be liable for any indirect, incidental, special, consequential, or 
              punitive damages, including without limitation, loss of profits, data, use, goodwill, or other 
              intangible losses.
            </p>
          </section>

          <section>
            <h2>10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Soph's Menu from and against any claims, 
              damages, obligations, losses, liabilities, costs, or debt arising from your use of the service 
              or violation of these terms.
            </p>
          </section>

          <section>
            <h2>11. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the service immediately, without prior notice, 
              for conduct that we believe violates these terms or is harmful to other users or our business interests.
            </p>
          </section>

          <section>
            <h2>12. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of [Your State/Country], 
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2>13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes. 
              Your continued use of the service after such modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2>14. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p>
              Email: legal@sophsmenu.com<br />
              Address: [Your Business Address]
            </p>
          </section>
        </div>
      </div>
  );
}
