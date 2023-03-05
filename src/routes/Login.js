import { useState, useEffect} from "react";
// import { loginUser, loginAdmin } from "../util/API";
import { useOutletContext, useNavigate } from "react-router-dom";
import AdminLogin from "../components/AdminLogin";
import CustomerLogin from "../components/CustomerLogin";


const Login = () => {
    const useToggle = (initialState) => {
        const [toggleValue, setToggleValue] = useState(initialState);
    
        const toggler = () => { setToggleValue(!toggleValue) };
        return [toggleValue, toggler]
    };
    const [loading, setLoading] = useState(false);
    const [adminToggle, setAdminToggle] = useToggle();
    const [customerToggle, setCustomerToggle] = useToggle()
    const [adminToken, setadminToken] = useOutletContext();
    const [customerToken, setCustomerToken] = useOutletContext();
    const [loginButton, setLoginButton] = useState(false)
    const navigate = useNavigate();
    
    // useEffect(() => {
    //     if(adminToken || customerToken){
    //         return navigate('/home')
    //     }
    // },[adminToken, customerToken, navigate]);

    return(
        <div>
            <h1>Under Construction!</h1>
                <section className ="login">    
                    <h2 className = 'title'> Log In </h2>
                        <button onClick={setAdminToggle}>Log In as Admin</button>
                        <button onClick={setCustomerToggle}>Log In as Customer</button>

                        {adminToggle && <AdminLogin setLoading={setLoading}/>}
                        {customerToggle && <CustomerLogin setLoading={setLoading}/>}
                </section>
        </div>
    )
};

export default Login;