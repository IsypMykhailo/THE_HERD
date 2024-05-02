import '../../_css/Auth.css';
import dynamic from "next/dynamic";

const AuthForm = dynamic(() => import('../../_components/auth/AuthForm'), {ssr: false});
const AuthImage = dynamic(() => import('../../_components/auth/AuthImage'), {ssr: false});

export default async function Auth() {
    return (
        <div className={"w-full flex flex-row parent-div"}>
            <AuthImage/>
            <AuthForm/>
        </div>
    );
}