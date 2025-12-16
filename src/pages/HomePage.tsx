import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Home</h1>
      <p>포트폴리오 홈</p>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="/projects">Projects</Link>
      </nav>
    </div>
  );
}
