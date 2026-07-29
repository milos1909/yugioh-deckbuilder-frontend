import { useEffect, useState } from "react";

export function useAuthStatus() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(!!localStorage.getItem("token"));
  }, []);

  return authenticated;
}