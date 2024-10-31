import Header from "@components/header";
import Head from "next/head";
import LoginForm from "@components/loginform";

const login: React.FC = () => {
    return ( 
        <>
        <Head>
            <title>Login</title>
        </Head>
        <main>
            <header>
                <Header />
                <h1 className="text-[#1f0d38] mb-6 text-center font-bold mt-4">Login</h1>

            </header>
            <div className="flex flex-col items-center justify-start min-h-screen">
                <div className="w-full max-w-md p-8 rounded-lg shadow-md mx-auto" style={{ background: 'linear-gradient(10deg, #065290, #0a74da)' }}>
                    <LoginForm className="w-full flex flex-col space-y-4" />
                </div>
            </div>
        </main>
        </>
    );
}

export default login;

