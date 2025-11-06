const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-600">
      <svg
        className="animate-spin h-10 w-10 text-blue-600 mb-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
        ></path>
      </svg>
      <p className="text-base font-medium">{text}</p>
    </div>
  );
};

export default Loader;
