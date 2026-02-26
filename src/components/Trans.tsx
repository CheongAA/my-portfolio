"use client";

export default function Trans({ text }: { text: string }) {
  const parts = text.split("<br/>");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}
