import { Outlet } from "react-router";
import { PlatformNav } from "~/components/PlatformNav";

export default function PlatformLayout() {
  return (
    <>
      <PlatformNav />
      <Outlet />
    </>
  );
}
