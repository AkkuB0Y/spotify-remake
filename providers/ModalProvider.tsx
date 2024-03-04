"use client";

import { useState, useEffect } from "react";
import AuthModal from "../components/authmodal";
import UploadModal from "../components/uploadmodal";
import SubscribeModal from "../components/subscribemodal";
import { ProductWithPrice } from "../types";

interface ModalProviderProps {
    products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({
    products
}) => {
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
            <SubscribeModal products={products}/>
        </>
    );
}

export default ModalProvider;