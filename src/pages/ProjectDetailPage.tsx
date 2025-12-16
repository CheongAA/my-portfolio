import { Link, useParams } from "react-router-dom";

export default function ProjectDetailPage() {
  const { id } = useParams();

  return (
    <div style={{ padding: 24 }}>
      <h1>Project Detail</h1>
      <p>id: {id}</p>

      <p>
        <Link to="/projects">← Projects</Link>
      </p>
    </div>
  );
}
