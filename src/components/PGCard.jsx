import React from "react";

const PGCard = ({ pg }) => {
  return (
    <div className="border rounded-xl p-6 shadow-md bg-white hover:shadow-xl transition flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          {pg.pgName}
        </h2>
        <p className="text-gray-700 font-medium">
          {pg.locality}, {pg.city}
        </p>
        <a
          href={pg.googleMapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm underline mt-1 block"
        >
          View on Map
        </a>
        <div className="text-xs text-gray-400 mt-2">
          Owner: {pg.owner.fullName} | {pg.owner.mobileNumber}
        </div>
      </div>
    </div>
  );
};

export default PGCard;
