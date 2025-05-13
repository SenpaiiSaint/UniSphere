import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole, Permission } from "../types/security";

// Mock user roles and permissions (in a real app, this would come from a database)
const rolePermissions: Record<UserRole, Permission[]> = {
  student: [
    {
      id: "1",
      name: "View Own Profile",
      description: "Can view own profile",
      resource: "profile",
      action: "read",
    },
    {
      id: "2",
      name: "View Own Courses",
      description: "Can view enrolled courses",
      resource: "courses",
      action: "read",
    },
    {
      id: "3",
      name: "Submit Assignments",
      description: "Can submit assignments",
      resource: "assignments",
      action: "create",
    },
  ],
  teacher: [
    {
      id: "4",
      name: "View All Students",
      description: "Can view all students",
      resource: "students",
      action: "read",
    },
    {
      id: "5",
      name: "Manage Courses",
      description: "Can manage courses",
      resource: "courses",
      action: "create",
    },
    {
      id: "6",
      name: "Grade Assignments",
      description: "Can grade assignments",
      resource: "assignments",
      action: "update",
    },
  ],
  admin: [
    {
      id: "7",
      name: "Manage Users",
      description: "Can manage all users",
      resource: "users",
      action: "create",
    },
    {
      id: "8",
      name: "View Analytics",
      description: "Can view analytics",
      resource: "analytics",
      action: "read",
    },
    {
      id: "9",
      name: "Manage System",
      description: "Can manage system settings",
      resource: "system",
      action: "update",
    },
  ],
  system_admin: [
    {
      id: "10",
      name: "Full Access",
      description: "Has full system access",
      resource: "*",
      action: "create",
    },
  ],
};

export function middleware(request: NextRequest) {
  // Get the user's role from the session (mock implementation)
  const userRole =
    (request.cookies.get("userRole")?.value as UserRole) || "student";

  // Get the requested resource and action from the URL
  const path = request.nextUrl.pathname;
  const method = request.method.toLowerCase();

  // Map HTTP methods to CRUD actions
  const methodToAction: Record<
    string,
    "create" | "read" | "update" | "delete"
  > = {
    post: "create",
    get: "read",
    put: "update",
    patch: "update",
    delete: "delete",
  };

  const action = methodToAction[method] || "read";
  const resource = path.split("/")[1]; // Get the first part of the path as the resource

  // Check if the user has permission
  const hasPermission = rolePermissions[userRole]?.some(
    (permission) =>
      (permission.resource === resource || permission.resource === "*") &&
      permission.action === action
  );

  if (!hasPermission) {
    // Log the unauthorized access attempt
    console.log(
      `Unauthorized access attempt: ${userRole} tried to ${action} ${resource}`
    );

    // Return 403 Forbidden
    return new NextResponse(JSON.stringify({ error: "Unauthorized access" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  return NextResponse.next();
}

// Configure which routes to run the middleware on
export const config = {
  matcher: [
    "/api/:path*",
    "/courses/:path*",
    "/students/:path*",
    "/assignments/:path*",
    "/analytics/:path*",
    "/settings/:path*",
  ],
};
