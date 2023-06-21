'use client';

import './styles.css';
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ROUTE_ADMIN, ROUTE_APPLICANTS, ROUTE_SEARCH } from '@/common/constants';
import { useAuth } from '@/common/components/auth';
import { TextFieldController } from '@/common/components/inputs/text-filed-controller';
import Link from 'next/link';
import { ROLES } from '@/common/constants/common.constants';

export default function Login() {

    const { control, handleSubmit } = useForm({ defaultValues: { username: '', password: '' } })
    const { user, login, loading, loginError } = useAuth() as any;
    const router = useRouter();
    const onSubmit = (data: any) => login(data);

    useEffect(() => {
        if (user) {
            if (user.roles.some((role: { name: ROLES }) => role.name === ROLES.ADMIN)) {
                router.push(`${ROUTE_ADMIN}`)
            } else {
                router.push(`${ROUTE_APPLICANTS}/${ROUTE_SEARCH}`)
            }
        }
    }, [user, router]);

    return <div className="login h-screen w-screen overflow-hidden">
        <div className="h-20 login__header flex items-center">
            <div className='mx-44'>
                <Link href={'/'}>
                    <Image
                        src="/login-logo.svg"
                        width={167}
                        height={34}
                        alt="logo"
                    />
                </Link>
            </div>
        </div>
        <div className='login__content w-full flex items-center justify-center'>
            <div className='login__form'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='login__label text-center text-4xl tracking-tight text-white mb-16'>Sign in</div>
                    <div className='w-420 mb-4'>
                        <TextFieldController
                            control={control}
                            name='username'
                            type='text'
                            placeholder='Email' />
                    </div>
                    <div className='w-420 mb-8'>
                        <TextFieldController
                            control={control}
                            name='password'
                            type='password'
                            placeholder='Password' />
                    </div>
                    {loginError && <div className='text-center mb-8 login-error-text text-xs'>Looks like these are not your correct details. Please try again.</div>}
                    <div className='mb-8 text-center'>
                        <button
                            className='text-white px-11 py-2.5 bg-color-purple-primary rounded font-semibold'
                            disabled={loading}>
                            {loading ? <span className="loading loading-spinner text-primary"></span> : "Sign In"}
                        </button>
                        <div>

                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex justify-between w-2/3'>
                            <a href='#' className='login-link'>Forgot Password?</a>
                            <a href='#' className='login-link'>Create Account</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
}
