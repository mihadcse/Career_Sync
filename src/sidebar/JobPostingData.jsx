import React from "react";

const JobPostingData = () => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // convert date to string
  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Date of posting</h4>

      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span>All
        </label>

        <InputField
          handleChange={handleChange}
          value="London"
          title="London"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Seattle"
          title="Seattle"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Madrid"
          title="Madrid"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Boston"
          title="Boston"
          name="test"
        />
      </div>
    </div>
  );
};

export default JobPostingData;
