import ContentHeader from "../components/ContentHeader";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const crumbs = [
  { label: "All releases", link: "/" },
  { label: "New release", link: "/create" },
];
export default function NewRelease() {
  let navigate = useNavigate();
  const [releaseName, setReleaseName] = useState("");
  function saveRelease() {
    axios.post('http://localhost:8000/releases/', {name: releaseName}).then(response => navigate("/"))
  }
  return (
    <div className="content-container">
      <ContentHeader crumbs={crumbs} />
      <div className="content-body">
        <div className="creation-form">
          <div className="form-element">
            <label for="releaseName">Name</label>
            <input
              placeholder="Ex: Version 1"
              id="releaseName"
              name="releaseName"
              value={releaseName}
              onChange={(e) => setReleaseName(e.target.value)}
            />
          </div>
          <button
            disabled={releaseName.length === 0}
            className="button-with-icon primary-button"
            onClick={saveRelease}
          >
            <p>Save</p>
            <FaCheck />
          </button>
        </div>
      </div>
    </div>
  );
}
