import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CampaignDetails from "./components/CampaignDetails.jsx";
import CreateCampaign from "./components/CreateCampaign.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
        <Route path="/create-campaign" element={<CreateCampaign />} />
      </Routes>
    </Router>
  );
}

export default App;
