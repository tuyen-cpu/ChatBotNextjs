import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const SignInPage = () => {
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) void signIn("google");
        if (session) window.close();
    }, [session]);
    // useEffect(() => {
    //     signIn("google")
    // })
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                position: "absolute",
                left: 0,
                top: 0,
                background: "white",
            }}
        ></div>
    );
};

export default SignInPage;