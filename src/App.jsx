import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CampaignDetails from "./components/CampaignDetails.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
