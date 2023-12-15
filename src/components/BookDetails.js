// Import necessary dependencies
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailsPage = ({ history }) => {
  const { bookKey } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go back to user lists
      </button>
      <h2>Book Details</h2>
      <p>Book Key: {bookKey}</p>
    </div>
  );
};

export default DetailsPage;
