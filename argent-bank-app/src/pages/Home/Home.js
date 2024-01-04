import "./Home.css";
import { FeatureItem } from "../../components";
import { featureList } from "../../api/data/data";

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
        {featureList.map((feature) => (
          <FeatureItem
            key={feature.id}
            image={feature.icon}
            altText={feature.altText}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>
    </main>
  );
}
