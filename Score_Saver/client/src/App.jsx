import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Stat from "./Stat";
import Analytics from "./Analytics";
import Profile from "./Profile";
import Home from "./Home";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import BowlingForm from "./components/BowlingForm";
import BattingForm from "./components/BattingForm";
import AuthProvider from "./context/AuthContext";
import BattingEditForm from "./components/BattingEditForm";
import BowlingEditForm from "./components/BowlingEditForm";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute/>}>
          <Route path="/home" element={<Home />} />
          <Route path="/stat" element={<Stat />} />
          <Route path="/editBatting/:id" element={<BattingEditForm />} />
          <Route path="/editBowling/:id" element={<BowlingEditForm />} />
          <Route path="/deleteBatting/:id" element={<BattingEditForm />} />
          <Route path="/deleteBowling/:id" element={<BowlingEditForm />} />
          <Route path="/analytics" element={<Analytics />}>
            <Route path="bowling" element={<BowlingForm />} />
            <Route path="batting" element={<BattingForm />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<logout />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
