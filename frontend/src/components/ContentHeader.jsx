import Breadcrumb from "./Breadcrumb";

export default function ContentHeader({ crumbs, buttonText, buttonIcon, buttonAction }) {
  return (
    <div className="content-header-container">
      <Breadcrumb crumbs={crumbs}/>
      <button className="button-with-icon primary-button" onClick={() => buttonAction()}>
          <p>{buttonText}</p>
          {buttonIcon}
      </button>
    </div>
  );
}