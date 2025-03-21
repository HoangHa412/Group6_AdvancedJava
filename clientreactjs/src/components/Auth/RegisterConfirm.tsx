import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const formSchema = z.object({
    newPassword: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
    confirmPassword: z.string().min(6, { message: "Vui lòng nhập lại mật khẩu" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
});

export type ResetPasswordForm = z.infer<typeof formSchema>;

function RegisterConfirm() {
    const navigate = useNavigate();
    const form = useForm<ResetPasswordForm>({
        resolver: zodResolver(formSchema),
        defaultValues: { newPassword: "", confirmPassword: "" },
    });

    const onSubmit = async (values: ResetPasswordForm) => {
        try {
            console.log("Mật khẩu mới:", values.newPassword);
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
                <h2 className="mb-4 text-2xl font-semibold text-center text-slate-500">Tạo Mật Khẩu Mới</h2>
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
                        <Button type="submit" className="w-full mt-5 transition-all duration-300 bg-blue-700 hover:bg-blue-900">Tạo mật khẩu mới</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default RegisterConfirm;
