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

  //login V2 written by diayti
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
    <div className="bg-bgHaui h-screen">
      <div className="bg-green-500 bg-transparent h-full flex items-center loginFormWrapper">
        <div className="flex flex-col items-center gap-5 bg-white p-8 shadow-md rounded-lg loginForm">
          <img
            src={`https://cdn-001.haui.edu.vn//img/logo-haui-size.png`}
            alt="logo"
            className="w-24 h-24 object-cover loginFormAvatar"
          />

          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-5 ">
              Đại Học Công Nghiệp Hà Nội
            </h1>
            <p>BÀI TẬP LỚN MÔN LẬP TRÌNH JAVA NÂNG CAO</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLoginV2)}
              className="space-y-8 w-full"
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
              <p className="text-end mr-5">
                Chưa có tài khoản?{" "}
                <Link to="/register" className="text-blue-600">
                  {/* <HowToRegIcon className="mr-4" /> */}
                  Đăng ký
                </Link>
              </p>
              <Button type="submit" className="w-full actionBtn">
                <LoginIcon className="mr-2" />
                Đăng Nhập
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default memo(observer(Login));
