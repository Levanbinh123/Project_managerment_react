import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/Redux/Auth/Action.js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Login = () => {
    const dispatch = useDispatch();
    const { error, isLoading } = useSelector(store => store.auth);

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (data) => {
        dispatch(login(data));
        console.log("login data", data)
    }

    // Xóa lỗi khi người dùng bắt đầu nhập lại
    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (error && name) {
                // Reset error khi user bắt đầu nhập
                // Bạn có thể dispatch action để clear error ở đây nếu cần
            }
        });
        return () => subscription.unsubscribe();
    }, [form.watch, error]);

    return (
        <div className='space-y-5'>
            <h1 className="text-2xl font-bold text-center">Login</h1>

            {/* Hiển thị thông báo lỗi */}
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        {error.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu."}
                    </AlertDescription>
                </Alert>
            )}

            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) =>
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="Email..."
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) =>
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password" // Đổi thành password để ẩn mật khẩu
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="Password..."
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>}
                    />

                    <Button
                        type="submit"
                        className="w-full mt-5"
                        disabled={isLoading}
                    >
                        {isLoading ? "Đang đăng nhập..." : "Login"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default Login