import React from "react";
import InputField from "../Component/InputField";

const JobPostingData = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Date of Posting</h4>

      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="postingDate"
            id="anyTime"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span>All Time
        </label>

        <InputField
          handleChange={handleChange}
          value="last24hours"
          title="Last 24 Hours"
          name="postingDate"
        />
        <InputField
          handleChange={handleChange}
          value="last7days"
          title="Last 7 Days"
          name="postingDate"
        />
        <InputField
          handleChange={handleChange}
          value="last30days"
          title="Last 30 Days"
          name="postingDate"
        />
      </div>
    </div>
  );
};

export default JobPostingData;
