import { useNavigate, Link } from "react-router-dom";

function Analysis() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="">Analysis</h1>
      <div className="flex gap-3">
        <button onClick={() => navigate(-1)} className="border py-2 px-4 rounded">
          Back
        </button>
        <Link to="/palette" className="border py-2 px-4 rounded">
          To Palette
        </Link>
      </div>
    </div>
  );
}

export default Analysis;