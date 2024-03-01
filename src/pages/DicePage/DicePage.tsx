import { CubeComponent } from "../../components/CubeComponent";
import { useAppSelector } from "../../stateManager/hooks/redux";
import { Header } from "../../widgets/Header";
import { LoginWidget } from "../../widgets/LoginWidget";

export const DicePage = () => {
    const isLoginWidgetActive = useAppSelector((state) => state.products.isLoginWidgetActive);
    const isLoggedIn = useAppSelector((state)=>state.products.userInfoObj.active);
    return (
        <>
            {(isLoginWidgetActive && !isLoggedIn) && <LoginWidget />}
            <Header />
            <CubeComponent />
        </>
    );
};
