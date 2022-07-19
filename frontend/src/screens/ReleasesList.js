import { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { formatDate } from "../utils/formatDate";
import ContentHeader from "../components/ContentHeader";

const crumbs = [{label: "All releases", link:"home"}]

export default function ReleasesList() {
  const [releases, setReleases] = useState([]);

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
        <ContentHeader crumbs={crumbs} buttonIcon={<FaPlusCircle/>}/>
      {releases.length === 0 ? (
        <p>No release for now.</p>
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
