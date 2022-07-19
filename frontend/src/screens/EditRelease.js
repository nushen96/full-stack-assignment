import { useParams, useLocation } from "react-router-dom";
import ContentHeader from "../components/ContentHeader";
import { useState } from "react";
import { statusBoolToStr, statusStrToBool } from "../utils/stepsUtils";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditRelease() {
  const params = useParams();
  const location = useLocation();
  let navigate = useNavigate();
  const { name, date, steps, additional_info } = location.state;
  const [newName, setNewName] = useState(name);
  const [newDate, setNewDate] = useState(date);
  const [newSteps, setNewSteps] = useState(steps);
  const [newAdditionalInfo, setNewAdditionalInfo] = useState(
    additional_info || ""
  );
  const crumbs = [
    { label: "All releases", link: "/" },
    { label: name, link: "/create" },
  ];
  

  function handleStepChange(checked, label) {
    const tempSteps = newSteps.map((step) => {
      if (step.label === label) {
        return { ...step, status: statusBoolToStr(checked) };
      }
      return step;
    });
    setNewSteps([...tempSteps]);
  }

  function submitEditForm() {
    const newRelease = {
      name: newName,
      date: newDate,
      steps: newSteps,
      additional_info:
        newAdditionalInfo && newAdditionalInfo !== ""
          ? newAdditionalInfo
          : null,
    };
    axios
      .put(`http://localhost:8000/releases/${params.id}`, newRelease)
      .then((response) => {
        navigate("/");
      });
  }

  function deleteRelease() {
    axios
      .delete(`http://localhost:8000/releases/${params.id}`)
      .then((response) => {
        navigate("/");
      });
  }

  return (
    <div className="content-container">
      <ContentHeader
        crumbs={crumbs}
        hasButton={true}
        buttonText="Delete"
        buttonIcon={<FaTrash />}
        buttonAction={deleteRelease}
      />
      <div className="content-body">
        <div className="edit-form">
          <div className="form-row">
            <div className="form-element">
              <label htmlFor="name">Release</label>
              <input
                placeholder="Ex: Version 1"
                id="name"
                name="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="form-element">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="steps-list">
              {newSteps.map((newStep) => (
                <div className="steps-list-element" key={newStep.label}>
                  <input
                    type="checkbox"
                    checked={statusStrToBool(newStep.status)}
                    onChange={(e) =>
                      handleStepChange(e.target.checked, newStep.label)
                    }
                  />
                  <label>{newStep.label}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="form-row-spaced">
            <div className="form-element">
              <label htmlFor="name">Additional information</label>
              <textarea
                placeholder="Please enter any other information notes for the release"
                id="additional-info"
                name="additional-info"
                value={newAdditionalInfo}
                rows={5}
                cols={35}
                onChange={(e) => setNewAdditionalInfo(e.target.value)}
              />
            </div>
            <button
              disabled={!newDate || newName === ""}
              className="button-with-icon primary-button"
              onClick={submitEditForm}
            >
              <p>Save</p>
              <FaCheck />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
