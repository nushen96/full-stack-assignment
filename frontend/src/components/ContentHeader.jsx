import Breadcrumb from "./Breadcrumb";

export default function ContentHeader({
  crumbs,
  hasButton,
  buttonText,
  buttonIcon,
  buttonAction,
}) {
  return (
    <div className="content-header-container">
      <Breadcrumb crumbs={crumbs} />
      {hasButton ? (
        <button
          className="button-with-icon primary-button"
          onClick={buttonAction}
        >
          <p>{buttonText}</p>
          {buttonIcon}
        </button>
      ) : (<div>&nbsp;</div>)}
    </div>
  );
}
