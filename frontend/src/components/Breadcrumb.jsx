export default function Breadcrumb({crumbs}) {
    return (
        <div className="breadcrumb-container">
            {crumbs.map(({label,link}) => (<a className="breadcrumb-element" href={link}>
                {label}
            </a>))}
        </div>
    )
}