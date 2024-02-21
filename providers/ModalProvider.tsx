"use client";

import { useState, useEffect } from "react";
import AuthModal from "../components/authmodal";
import UploadModal from "../components/uploadmodal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModal />
            <UploadModal />
        </>
    );
}

export default ModalProvider;