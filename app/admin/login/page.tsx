'use client'

import { useAuth } from "@/common/components/auth";
import { TextFieldController } from "@/common/components/inputs/text-filed-controller";
import { ROUTE_ADMIN, ROUTE_APPLICANTS, ROUTE_DASHBOARD, ROUTE_PEOPLE, ROUTE_SEARCH } from "@/common/constants";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { useForm } from "react-hook-form";

import './styles.css';
import { ROLES } from "@/common/constants/common.constants";

export default function AdminLogin() {
    const { control, handleSubmit } = useForm({ defaultValues: { username: '', password: '' } })
    const { user, login, loading, loginError } = useAuth() as any;
    const router = useRouter();
    const onSubmit = (data: any) => { login({ ...data, is_admin: true }) };

    useEffect(() => {
        if (user) {
            if (user.roles.some((role: { name: ROLES }) => role.name === ROLES.ADMIN)) {
                router.push(`${ROUTE_ADMIN}/${ROUTE_DASHBOARD}/${ROUTE_PEOPLE}`)
            } else {
                router.push(`${ROUTE_APPLICANTS}/${ROUTE_SEARCH}`)
            }
        }
    }, [user, router]);
    return (<div className="admin__login w-full flex justify-center items-center">
        <div className='admin__login__content w-full flex items-center justify-center'>
            <div className='login__form'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='login__label text-center text-4xl tracking-tight mb-16'>Login</div>
                    <div className='w-395 mb-4'>
                        <TextFieldController
                            control={control}
                            name='username'
                            type='text'
                            placeholder='Email' />
                    </div>
                    <div className='w-395 mb-8'>
                        <TextFieldController
                            control={control}
                            name='password'
                            type='password'
                            placeholder='Password' />
                    </div>
                    {loginError && <div className='text-center mb-8 login-error-text text-xs'>Looks like these are not your correct details. Please try again.</div>}
                    <div className='mb-8 text-center'>
                        <button
                            className='text-white px-11 py-2.5 rounded font-semibold w-full'
                            disabled={loading}>Login</button>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex justify-between forgot-link'>
                            <a href='#' className='login-link'>Forgot Password?</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}
