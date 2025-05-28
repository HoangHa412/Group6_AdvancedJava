import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { Loader } from "lucide-react";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useStore } from "@/stores";

const formSchema = z.object({
    newPassword: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
    confirmPassword: z.string().min(6, { message: "Vui lòng nhập lại mật khẩu" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
});

export type ForgotPasswordForm = z.infer<typeof formSchema>;

function ForgotPasswordConfirm() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();
    const { authStore } = useStore();
    const form = useForm<ForgotPasswordForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        },
    });

    async function handleRegisterPassword(values: any) {
        try {
            setIsLoading(true);
            await authStore.resetPassword(token || '', values.newPassword, values.confirmPassword);
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setIsLoading(false);
        }
    }

    const onSubmit = async (values: ForgotPasswordForm) => {
        try {
            await handleRegisterPassword(values);
            toast.success("Mật khẩu đã được cập nhật!");
            navigate("/login");
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen min-h-screen bg-gray-100 bg-no-repeat bg-bgHaui">
            <div className="w-[400px] p-6 bg-white rounded-lg shadow-lg py-10">
                <div className="flex flex-col items-center gap-4">
                    <img
                        src={`https://cdn-001.haui.edu.vn//img/logo-haui-size.png`}
                        alt="logo"
                        className="object-cover w-16 h-16"
                    />

                    <div className="flex flex-col items-center mb-5">
                        <h1 className="mb-3 text-xl font-semibold">
                            Đại Học Công Nghiệp Hà Nội
                        </h1>
                    </div>
                </div>
                <h2 className="mb-4 text-2xl font-semibold text-center text-slate-500">Tạo Tài Khoản Mới</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Mật khẩu mới" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Nhập lại mật khẩu" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading} type="submit" className="w-full transition-all duration-300 bg-blue-700 hover:bg-blue-900">
                            <HowToRegIcon className="mr-2" />
                            {isLoading ? <Loader className="animate-spin" /> : "Tạo tài khoản"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default ForgotPasswordConfirm;