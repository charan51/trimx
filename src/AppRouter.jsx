import ShortenUrlPage from "./components/shortenUrlPage";
import {  Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import LoginForm from "./components/Login";
import SignupForm from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AddUrlPage from "./components/createURLPage";
import { Toaster } from "react-hot-toast";
import ErrorPage from "./components/ErrorPage";
const AppRouter = () => {
    return (
        <>
            <Navbar />
            <Toaster position="bottom center" />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/createurl" element={<AddUrlPage />} />
                <Route path="/s/:url" element={ShortenUrlPage} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </>
    );
}
export default AppRouter;

export const SubDomainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<ShortenUrlPage />} />
        </Routes>
    )
}