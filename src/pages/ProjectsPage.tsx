import { Link } from "react-router-dom";

const projects = [
  { id: "fav-portal", title: "Fav Portal" },
  { id: "egg-timer", title: "Egg Timer" },
];

export default function ProjectsPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Projects</h1>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <Link to={`/projects/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>

      <p>
        <Link to="/">← Home</Link>
      </p>
    </div>
  );
}
