import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useStore } from "@/stores";
import { LogOut } from "lucide-react";
type Props = {
  isAdminPage?: boolean;
};
const LogoutButton = ({ isAdminPage }: Props) => {
  const { authStore } = useStore();
  const { logout: handleLogoutV2 } = authStore;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="right-0">
        {isAdminPage ? (
          <div className="flex items-center gap-2 cursor-pointer">
            <LogOut /> Đăng xuất
          </div>
        ) : (
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex items-center gap-2 py-2 hover:bg-blue-2 rounded-xl"
          >
            <LogOut /> Đăng xuất
          </DropdownMenuItem>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="border-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-5">
            <p className="">Bạn có chắc chắn muốn đăng xuất</p>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="px-6 text-white transition-all duration-300 border-none bg-slate-800 hover:bg-slate-950">Huỷ</AlertDialogCancel>
          <AlertDialogAction className="transition-all duration-300 bg-red-600 hover:bg-red-900" onClick={handleLogoutV2}>
            Đăng xuất
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default LogoutButton;
