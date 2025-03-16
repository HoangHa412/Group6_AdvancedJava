import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useStore } from "@/stores";
import { useState } from "react";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const formSchema = z.object({
  email: z.string().email("Email là bắt buộc"),
});

const Register = () => {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // const { authStore } = useStore();
  // const { signUpUser } = authStore;
  //login V2 written by diayti
  // async function handleRegister(values: any) {
  //   try {
  //     setIsLoading(true);
  //     await signUpUser(values);
  //     navigate("/login");
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // const onSubmit = (values: z.infer<typeof formSchema>) => {
  //   handleRegister(values);
  // };

  return (
    <div className="bg-bgHaui h-screen bg-no-repeat ">
      <div className="bg-green-500 mx-auto bg-transparent h-full flex items-center">
        <div className="flex flex-col items-center gap-2 bg-white p-8 shadow-md rounded-lg">
          <img
            src={`https://cdn-001.haui.edu.vn//img/logo-haui-size.png`}
            alt="logo"
            className="w-16 h-16 object-cover"
          />

          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold mb-3">
              Đại Học Công Nghiệp Hà Nội
            </h1>
            <p>BÀI TẬP LỚN MÔN LẬP TRÌNH JAVA NÂNG CAO</p>
          </div>

          <Form {...form}>
            <form
              // onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 w-full"
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
              <p className="text-end mr-5">
                Đã có tài khoản?{" "}
                <Link to="/login" className="text-blue-600">
                  Đăng nhập
                </Link>
              </p>
              <Button disabled={isLoading} type="submit" className="w-full">
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
