import { Link } from "react-router-dom";

const ComingSoon = ({
  title = "Page Under Construction",
  description = "We're polishing this experience. Check back soon!",
}) => {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
        🚧
      </div>
      <div className="max-w-xl space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-blue-700 md:text-4xl">
          {title}
        </h1>
        <p className="text-base text-gray-600 md:text-lg">{description}</p>
      </div>
      <Link
        to="/"
        className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </section>
  );
};

export default ComingSoon;
