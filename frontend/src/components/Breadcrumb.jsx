import {Link} from "react-router-dom"

export default function Breadcrumb({crumbs}) {
    return (
        <div className="breadcrumb-container">
            {crumbs.map(({label,link}) => (<Link key={label} className="breadcrumb-element" to={link}>
                {label}
            </Link>))}
        </div>
    )
}