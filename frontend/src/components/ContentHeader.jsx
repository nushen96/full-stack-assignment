import Breadcrumb from "./Breadcrumb";

export default function ContentHeader({ crumbs, buttonIcon }) {
  return (
    <div className="content-header-container">
      <Breadcrumb crumbs={crumbs}/>
      <button className="button-with-icon primary-button">
          <p>New Release</p>
          {buttonIcon}
      </button>
    </div>
  );
}