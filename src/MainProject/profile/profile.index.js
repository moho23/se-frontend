import "./profile.style.scss"
import Button from "../../utilities/components/button/button.index";

function Profile(){
    return(
        <>
        <div className="background">
            <div className="window">
            <div className="picture"></div>
                <div className="info">
                    <h3 className="user">نام کاربری:  </h3>
                    <h3 className="fName">نام: </h3>
                    <h3 className="lName">نام خانوادگی: </h3>
                    <h3 className="city">شهر: </h3>
                    <h3 className="email">ایمیل: </h3>                    
                </div>
                <Button className="editPro" text={"ویرایش"} ></Button>
            </div>
        </div>
        </>
    )
}
export default Profile;