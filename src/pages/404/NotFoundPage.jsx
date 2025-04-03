import Loader from "Components/Loader";
import React from "react";

const NotFoundPage = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const interval = setTimeout(() => {
      setLoading(false);
    }, 5000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
          Not Found
        </div>
      )}
    </>
  );
};

export default NotFoundPage;
