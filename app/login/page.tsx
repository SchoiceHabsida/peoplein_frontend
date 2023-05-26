'use client';

import Image from 'next/image';
import './styles.css';
import { TextFieldController } from '@/common/components/inputs/text-filed-controller';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/common/components/auth';
import { useEffect } from 'react';
import { ROUTE_HOME } from '@/common/constants';
import { useRouter } from 'next/navigation';

export default function Login() {

    const { control, handleSubmit } = useForm({ defaultValues: { username: '', password: '' } })
    const { user, login, loading, loginError } = useAuth() as any;
    const router = useRouter();
    const onSubmit = (data: any) => login(data);
    
    useEffect(() => {
        if (user) {
            router.push(ROUTE_HOME)
        }
    }, [user, router]);

    return <div className="login h-screen w-screen overflow-hidden">
        <div className="h-20 login__header flex items-center">
            <div className='mx-44'>
                <Image
                    src="/login-logo.svg"
                    width={167}
                    height={34}
                    alt="logo"
                />
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
                            disabled={loading}>Sign In</button>
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
