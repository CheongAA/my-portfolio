import React from "react";

type NavLinkBaseProps = {
  children: React.ReactNode;
  className?: string;
};

type NavLinkAsAnchor = NavLinkBaseProps & {
  as?: "a";
  href: string;
  onClick?: never;
};

type NavLinkAsButton = NavLinkBaseProps & {
  as: "button";
  href?: never;
  onClick?: () => void;
};

type NavLinkProps = NavLinkAsAnchor | NavLinkAsButton;

const NavLink = ({
  as = "a",
  children,
  className = "",
  ...props
}: NavLinkProps) => {
  const baseClassName = `
    relative px-4 py-2 text-md font-medium text-primary/85
    transition-colors duration-300
    hover:text-primary
    group
    ${className}
  `;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = (props as NavLinkAsAnchor).href;
    if (href?.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (as === "button") {
    return (
      <button
        className={baseClassName}
        onClick={(props as NavLinkAsButton).onClick}
      >
        {/* pill background */}
        <span
          className="
            absolute inset-0 rounded-full
            bg-nav-hover
            opacity-0 scale-90
            transition-all duration-300 ease-out
            group-hover:opacity-100
            group-hover:scale-100
            group-hover:cursor-pointer
          "
        />
        {/* text */}
        {children}
      </button>
    );
  }

  return (
    <a
      className={baseClassName}
      href={(props as NavLinkAsAnchor).href}
      onClick={handleClick}
    >
      {/* pill background */}
      <span
        className="
          absolute inset-0 rounded-full 
          bg-nav-hover
          opacity-0 scale-90
          transition-all duration-300 ease-out
          group-hover:opacity-100
          group-hover:scale-100
          group-hover:cursor-pointer
        "
      />

      {/* text */}
      {children}
    </a>
  );
};

export default NavLink;
