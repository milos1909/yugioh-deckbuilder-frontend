import RoleModel from "@/models/roleModel";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  id: number;
  roles: RoleModel[];
  exp: number;
  iat: number;
}

export function getUsernameFromToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

export function getIdFromToken(): number | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.id;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.roles.some(role => role.name === "Admin");
  } catch (error) {
    console.error("Failed to decode token:", error);
    return false;
  }
}

