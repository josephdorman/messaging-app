import "./styles/app.css";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import ChannelView from "./components/channelView";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Sidebar />
      <ChannelView />
    </div>
  );
}

export default App;
