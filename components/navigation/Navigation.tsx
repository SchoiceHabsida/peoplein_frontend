import { FC, useCallback } from "react";
import "./styles.css";
import { usePathname } from "next/navigation";
import {
    ROUTE_APPLICANTS,
  ROUTE_FAVORITES,
  ROUTE_INTERVIEWS,
  ROUTE_SEARCH,
} from "@/common/constants";
import { useRouter } from "next/navigation";
import { useAuth } from "@/common/components/auth";

export const Navigation: FC = () => {
  const currentUrl = usePathname();
  const router = useRouter();
  const { logout } = useAuth() as any;

  const activePath = useCallback(
    (path: string) => {
      const routes = currentUrl?.split('/');
      return routes.includes(path.split('/')[1]);
    },
    [currentUrl]
  );

  const navItems = [
    {
      path: ROUTE_SEARCH,
      label: "Search",
    },
    {
      path: ROUTE_FAVORITES,
      label: "Favorites",
    },
    {
      path: ROUTE_INTERVIEWS,
      label: "Interviews",
    },
  ];

  const onNavigate = (path: string) => {
    router.push(`${ROUTE_APPLICANTS}${path}`)
  };

  return (
    <div className="navigation rounded mt-4 py-2">
      <div className="nav-item nav-title uppercase text-xs py-2 px-4 font-semibold">
        navigation
      </div>
      {navItems.map((nav) => (
        <div
          onClick={() => onNavigate(nav.path)}
          key={nav.path}
          className={`nav-item text-sm py-2 px-4 font-semibold ${
            activePath(nav.path) ? "nav-active" : ""
          }`}
        >
          {nav.label}
        </div>
      ))}

      <div className="nav-item text-sm sign-out py-2 px-4 font-semibold" onClick={() => logout()}>
        Sign Out
      </div>
    </div>
  );
};
