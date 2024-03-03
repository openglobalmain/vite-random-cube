import { CubeComponent } from "../../components/CubeComponent";
import { useAppSelector } from "../../stateManager/hooks/redux";
import { Header } from "../../widgets/Header";
import { LoginWidget } from "../../widgets/LoginWidget";

export const DicePage = () => {
    const isLoginWidgetActive = useAppSelector((state) => state.userInfo.isLoginWidgetActive);
    const isLoggedIn = useAppSelector((state)=>state.userInfo.userInfoObj.active);
    return (
        <>
            {(isLoginWidgetActive && !isLoggedIn) && <LoginWidget />}
            <Header />
            <CubeComponent />
        </>
    );
};
