import React from "react";
import { Link } from "react-router-dom";
import BreadcrumbIcon from "@/assets/icons/breadcrumb.svg?react"

export interface BreadcrumbItem {
  label: React.ReactNode;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="mb-4 hidden lg:block" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.5px] text-slate-medium uppercase">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <li>
                {item.path && !isLast ? (
                  <Link to={item.path} className="transition-colors hover:text-slate-dark text-secondary/60 text-xs tracking-[1.2px] uppercase">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-primary font-bold tracking-[1.2px] uppercase text-xs" : ""}>
                    {item.label}
                  </span>
                )}
              </li>

              {!isLast && (
                <li className="text-slate-light">
                <BreadcrumbIcon />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
