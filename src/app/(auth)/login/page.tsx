"use client"

import Form from "@/components/form/Form"
import { InputProps } from "@/components/form/field/Field"
import { setAuthToken } from "@/redux/features/authSlice"
import { useSignInMutation } from "@/redux/services/authApi"
import { alert } from "@/utils/alert"
import { loginValidation } from "@/validations/auth"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [onLogin, { isLoading }] = useSignInMutation();

    const fields: InputProps[] = [
        {
            label: "Email",
            name: "email",
        },
        {
            label: "Password",
            name: "password",
            type: "password"
        },
    ]

    const onSubmit = (data: any) => {
        onLogin(data)
            .unwrap()
            .then((response) => {
                alert("Signin Successfully");
                dispatch(setAuthToken(response?.data?.token));
                router.push("/dashboard");
            })
            .catch((error: any) => {
                alert(error?.data?.message, "error");
            });
    }

    return (
        <main className="h-screen flex items-center justify-center ">
            <div className="bg-white p-4 rounded-lg shadow-md w-full mx-52">
                <h1 className="mb-5 text-xl font-bold">Login</h1>
                <Form
                    fields={fields}
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    submit={"Login"}
                    validation={loginValidation}
                />
            </div>
        </main>
    )
}

export default Login