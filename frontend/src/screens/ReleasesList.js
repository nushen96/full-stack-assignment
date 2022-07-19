import { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { formatDate } from "../utils/formatDate";
import ContentHeader from "../components/ContentHeader";
import {useNavigate} from "react-router-dom"

const crumbs = [{label: "All releases", link:"/"}]

export default function ReleasesList() {
    let navigate = useNavigate();
  const [releases, setReleases] = useState([]);

  function navigateToCreate() {
      navigate("/create")
  }

  useEffect(() => {
    axios("http://localhost:8000/releases/")
      .then((response) => {
        setReleases(response.data);
      })
      .catch((error) => {
        console.log(`Error while fetching data ${error}`);
      });
  }, []);
  return (
    <div className="content-container">
        <ContentHeader crumbs={crumbs} hasButton={true} buttonText="New Release" buttonIcon={<FaPlusCircle/>} buttonAction={navigateToCreate}/>
      {releases.length === 0 ? (
        <div className="content-body">
            <p>No release for now.</p>
        </div>
      ) : (
        <table className="content-table">
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
          {releases.map(({ name, date, status }) => (
            <tr>
              <td>{name}</td>
              <td>{formatDate(date)}</td>
              <td>{status}</td>
              <td>
                <button className="button-with-icon action-button">
                  <p>Edit</p>
                  <FaPencilAlt />
                </button>
              </td>
              <td>
                <button className="button-with-icon action-button">
                  <p>Delete</p>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}
