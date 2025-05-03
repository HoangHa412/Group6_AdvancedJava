import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { memo } from "react";
import { observer } from "mobx-react";
import { useStore } from "@/stores";
import { toast } from "react-toastify";
import LoginIcon from '@mui/icons-material/Login';


const formSchema = z.object({
  email: z.string().min(1, {
    message: "Tên đăng nhập là bắt buộc",
  }),
  password: z.string().min(1, {
    message: "Mật khẩu là bắt buộc",
  }),
});
export type LoginForm = z.infer<typeof formSchema>;

function Login() {
  const navigate = useNavigate();
  const form = useForm<LoginForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { authStore } = useStore();
  const { authenticateUser, getAllClaimsFromJwt } = authStore;

  async function handleLoginV2(values: LoginForm) {
    try {
      await authenticateUser(values);
      const data = getAllClaimsFromJwt(localStorage.getItem("token"));
      console.log(data.scope);

      if (data.scope === "USER") navigate("/messenger-v2");
      else if (data.scope === "ADMIN") {
        // navigate("/admin");
        toast.success("Đã đăng nhập thành công phía quản trị viên, vui lòng chuyển sang phần mềm Swing để thực hiện các chức năng của quản trị viên! ");
      }
      else {
        toast.error("Bạn không có quyền truy cập");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 bg-bgHaui">
      <div className="flex flex-col items-center gap-5 px-8 py-12 bg-white rounded-lg shadow-md loginForm w-[450px] ">
        <img
          src={`https://cdn-001.haui.edu.vn//img/logo-haui-size.png`}
          alt="logo"
          className="object-cover w-24 h-24 loginFormAvatar"
        />

        <div className="flex flex-col items-center mb-5">
          <h1 className="mb-5 text-3xl font-semibold ">
            Đại Học Công Nghiệp Hà Nội
          </h1>
          <p className="font-medium text-slate-500">BÀI TẬP LỚN MÔN LẬP TRÌNH JAVA NÂNG CAO</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLoginV2)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Tên đăng nhập" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Mật khẩu"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="mr-5 text-end">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-800">
                {/* <HowToRegIcon className="mr-4" /> */}
                Đăng ký
              </Link>
            </p>
            <Button type="submit" className="w-full transition-all duration-300 bg-blue-700 hover:bg-blue-900 actionBtn">
              <LoginIcon className="mr-2" />
              Đăng Nhập
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default memo(observer(Login));
