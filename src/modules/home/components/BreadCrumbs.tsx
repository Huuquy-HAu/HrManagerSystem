import { Link, useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
export default function BreadCrumbs() {
  const location = useLocation();
  const crumbs = location.pathname.split("/");
  const { id } = useParams();
  return (
    <div className="home-breadcrumb">
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link className="text-link" to={`/${crumbs[0]}`}>
          General
        </Link>
        {crumbs.length > 2 ? (
          <Link className="text-link" to={`/${crumbs[1]}`}>{`${crumbs[1].charAt(0).toUpperCase() + crumbs[1].slice(1)
            } Management`}</Link>
        ) : (
          <Typography className="text-black">{`${crumbs[1].charAt(0).toUpperCase() + crumbs[1].slice(1)
            } Management`}</Typography>
        )}
        {crumbs.length >= 3 && (
          <Typography className="text-black">{id ? "Edit employee" : "Add new employee"}</Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
