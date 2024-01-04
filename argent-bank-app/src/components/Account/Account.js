import "./Account.css";

/**
 * User Bank Account Component
 * @param {string} title: Title of the account
 * @param {number} amount: Amount of money in the account
 * @param {string} currency: Used currency in the account
 * @param {string} description: Description of the account
 * @returns {JSX.Element}: The JSX element representing the Account component
 */
export default function Account({ title, amount, currency, description }) {
  return (
    <article className="Account">
      <div>
        <h3 className="Account__title">{title}</h3>
        <p className="Account__amount">
          {currency} {amount}
        </p>
        <p className="Account__description">{description}</p>
      </div>
      <div>
        <button className="Account__transactions-button">
          View transactions
        </button>
      </div>
    </article>
  );
}
