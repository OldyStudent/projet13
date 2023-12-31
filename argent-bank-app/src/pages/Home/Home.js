import "./Home.css";

import iconChat from "../../assets/icons/icon-chat.png";
import iconSecurity from "../../assets/icons/icon-security.png";
import iconMoney from "../../assets/icons/icon-money.png";

export default function Home() {
  return (
    <main className="Home">
      <div className="Home__hero">
        <section className="Home__hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="Home__hero__subtitle">No fees.</p>
          <p className="Home__hero__subtitle">No minimum deposit.</p>
          <p className="Home__hero__subtitle">High interest rates.</p>
          <p className="Home__hero__text">
            Open a savings account with Argent Bank today!
          </p>
        </section>
      </div>

      <section className="Home__features">
        <h2 className="sr-only">Features</h2>
        <div className="feature-item">
          <img src={iconChat} alt="Chat Icon" className="feature-icon" />
          <h3 className="feature-item-title">You are our #1 priority</h3>
          <p>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </div>

        <div className="feature-item">
          <img src={iconMoney} alt="Chat Icon" className="feature-icon" />
          <h3 className="feature-item-title">
            More savings means higher rates
          </h3>
          <p>
            The more you save with us, the higher your interest rate will be!
          </p>
        </div>
        <div className="feature-item">
          <img src={iconSecurity} alt="Chat Icon" className="feature-icon" />
          <h3 className="feature-item-title">Security you can trust</h3>
          <p>
            We use top of the line encryption to make sure your data and money
            is always safe.
          </p>
        </div>
      </section>
    </main>
  );
}
