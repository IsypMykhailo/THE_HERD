'use client'

import React from "react";
import '../_css/Home.css'

const Loading = ({loadingClass}) => {
    return (
        <div className={`loading ${loadingClass}`}>THE HERD</div>
    )
}

export default Loading;