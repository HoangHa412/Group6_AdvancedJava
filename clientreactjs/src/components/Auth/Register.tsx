import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useState } from "react";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useStore } from "@/stores";

const formSchema = z.object({
  email: z.string().email("Email là bắt buộc"),
});

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { authStore } = useStore();
  const { signUpUser } = authStore;
  async function handleRegister(values: any) {
    try {
      setIsLoading(true);
      await signUpUser(values);
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleRegister(values);
  };

  return (
    <div className="h-screen bg-no-repeat bg-bgHaui ">
      <div className="flex items-center h-full mx-auto bg-transparent bg-green-500">
        <div className="flex flex-col items-center gap-2 p-8 bg-white rounded-lg shadow-md">
          <img
            src={`https://cdn-001.haui.edu.vn//img/logo-haui-size.png`}
            alt="logo"
            className="object-cover w-16 h-16"
          />

          <div className="flex flex-col items-center mb-5">
            <h1 className="mb-3 text-xl font-semibold">
              Đại Học Công Nghiệp Hà Nội
            </h1>
            <p className="font-medium text-slate-500">BÀI TẬP LỚN MÔN LẬP TRÌNH JAVA NÂNG CAO</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="mb-5 mr-5 text-end text-slate-500">
                Đã có tài khoản?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-800">
                  Đăng nhập
                </Link>
              </p>
              <Button disabled={isLoading} type="submit" className="w-full transition-all duration-300 bg-blue-700 hover:bg-blue-900">
                <HowToRegIcon className="mr-2" />
                {isLoading ? <Loader /> : "Đăng ký"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
