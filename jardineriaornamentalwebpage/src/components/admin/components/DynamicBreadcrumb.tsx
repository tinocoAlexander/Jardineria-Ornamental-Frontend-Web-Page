import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { breadcrumbNameMap } from "./breadcrumbConfig";

const HIDDEN_SEGMENTS = ["admin"];

const DynamicBreadcrumb = () => {
  const location = useLocation();
  const allSegments = location.pathname.split("/").filter(Boolean);
  const breadcrumbSegments = allSegments.filter((segment, index) => {
    const currentPath = "/" + allSegments.slice(0, index + 1).join("/");
    return (
      !HIDDEN_SEGMENTS.includes(segment) &&
      (currentPath !== "/admin/dashboard" || index === allSegments.length - 1)
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/admin/dashboard">Inicio</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Items dinámicos con separadores */}
        {breadcrumbSegments.map((segment, index) => {
          const routeParts = allSegments.slice(
            0,
            allSegments.indexOf(segment) + 1
          );
          const route = "/" + routeParts.join("/");

          const isLast = index === breadcrumbSegments.length - 1;
          const label = breadcrumbNameMap[route] || segment;

          if (
            route === "/admin/dashboard" &&
            location.pathname !== "/admin/dashboard"
          ) {
            return null;
          }

          return (
            <span key={route} className="flex items-center gap-1">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={route}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
