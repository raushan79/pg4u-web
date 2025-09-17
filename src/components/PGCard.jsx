import React from "react";

const PGCard = ({ pg }) => {
  const primaryImage =
    pg.imageUrls?.[0] || pg.imageUrl || pg.images?.[0] || null;
  const addressLine =
    pg.address || pg.fullAddress || `${pg.locality ?? ""}, ${pg.city ?? ""}`;
  const ownerName = pg.owner?.fullName || "Owner info unavailable";
  const ownerPhone = pg.owner?.mobileNumber || null;
  const hasPhone = Boolean(ownerPhone);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="w-full bg-gray-100">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={pg.pgName}
            className="h-48 w-full object-cover object-center md:h-56"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 text-sm font-semibold text-blue-700">
            Image coming soon
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-blue-800">{pg.pgName}</h2>
          <p className="text-sm font-medium text-gray-700">
            {pg.locality}, {pg.city}
          </p>

          {addressLine && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-700">Address:</span> {addressLine}
            </p>
          )}

          {pg.googleMapLink && (
            <a
              href={pg.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
            >
              View on Google Maps ↗
            </a>
          )}

          <div className="rounded-lg bg-blue-50 p-3 text-xs text-blue-800">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-blue-500">
              PG Owner
            </p>
            <p className="text-base font-semibold text-blue-900">{ownerName}</p>
            {hasPhone && (
              <p className="text-sm text-blue-700">
                Phone: <span className="font-semibold">{ownerPhone}</span>
              </p>
            )}
          </div>
        </div>

        {hasPhone && (
          <div className="mt-auto flex justify-center pt-4">
            <a
              href={`tel:${ownerPhone}`}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <span role="img" aria-label="phone">
                📞
              </span>
              Call {ownerName.split(" ")[0] || "Owner"}
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

export default PGCard;
