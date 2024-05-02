'use client'

import Image from "next/image";
import {useRouter} from "next/navigation";

export default function AuthImage() {
    const router = useRouter()
    return (
        <div className={"party-image-parent"}>
            <h2 className={"company-name"} onClick={() => router.push('/')}>THE HERD</h2>
            <Image src={"/assets/img/party-photo.jpg"} alt={"party-photo"} width={0} height={0} unoptimized
                   className={"party-image object-cover"}/>
        </div>
    )
}