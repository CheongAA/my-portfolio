import React from "react";
import NextLink from "next/link";
import { Link } from "@/i18n/navigation";

type NavLinkBaseProps = {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  noLocale?: boolean;
};

type NavLinkAsLink = NavLinkBaseProps & {
  as?: "link";
  href: string;
  onClick?: () => void;
};

type NavLinkAsButton = NavLinkBaseProps & {
  as: "button";
  href?: never;
  onClick?: () => void;
};

type NavLinkProps = NavLinkAsLink | NavLinkAsButton;

const NavLink = ({
  as = "link",
  children,
  className = "",
  active = false,
  noLocale = false,
  ...props
}: NavLinkProps) => {
  const baseClassName = `
    relative px-4 py-2 text-md font-medium
    transition-colors duration-300
    hover:text-primary
    group
    ${active ? "text-primary" : "text-primary/85"}
    ${className}
  `;

  const pill = (
    <span
      className={`
        absolute inset-0 rounded-full
        bg-nav-hover
        transition-all duration-300 ease-out
        group-hover:opacity-100
        group-hover:scale-100
        group-hover:cursor-pointer
        ${active ? "opacity-100 scale-100" : "opacity-0 scale-90"}
      `}
    />
  );

  if (as === "button") {
    return (
      <button
        className={baseClassName}
        onClick={(props as NavLinkAsButton).onClick}
      >
        {pill}
        {children}
      </button>
    );
  }

  const href = (props as NavLinkAsLink).href;
  const onClick = (props as NavLinkAsLink).onClick;

  if (noLocale) {
    return (
      <NextLink className={baseClassName} href={href} onClick={onClick}>
        {pill}
        {children}
      </NextLink>
    );
  }

  return (
    <Link className={baseClassName} href={href} onClick={onClick}>
      {pill}
      {children}
    </Link>
  );
};

export default NavLink;
