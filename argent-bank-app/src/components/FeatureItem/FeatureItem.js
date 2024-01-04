import "./FeatureItem.css";

/**
 * FeatureItem Component
 * @param {string} image: The loaded icon to be displayed
 * @param {string} altText: The alternative text for the icon
 * @param {string} title: The title of the feature
 * @param {string} description: The description of the feature
 * @returns {JSX.Element}: The JSX element representing the FeatureItem component
 */

export default function FeatureItem({ image, altText, title, description }) {
  return (
    <div className="FeatureItem">
      <img src={image} alt={altText} className="FeatureItem__icon" />
      <h3 className="FeatureItem__title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
