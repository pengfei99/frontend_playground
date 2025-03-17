import { useState } from "react";
import { ScreenShare} from "lucide-react"; // Importing icons
import './App.css'


// Define icon list with labels
const icons = [
  { id: 1, name: "Server-1", component: <ScreenShare size={80} /> },
  { id: 2, name: "Server-2", component: <ScreenShare size={80} /> },
  { id: 3, name: "Server-3", component: <ScreenShare size={80} /> },
  { id: 4, name: "Server-4", component: <ScreenShare size={80} /> },

];

function App() {
  // State to store the clicked icon
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null); 

  // Function to handle click
  const handleIconClick = (iconName: string) => {
    setSelectedIcon(iconName); // Update state
  };

  return (
    <>
      <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Select the server which you want to connect:</h1>
      <div className="flex gap-6">
        {icons.map((icon) => (
          <button
            key={icon.id}
            onClick={() => handleIconClick(icon.name)}
            className="p-4 border rounded-lg hover:bg-gray-100 transition">
            {icon.component}
            <span className="mt-2 text-sm font-medium">{icon.name}</span>
          </button>
        ))}
      </div>

      {/* Display selected icon name */}
      <div className="mt-4 p-4 border rounded-lg w-64 text-center bg-gray-100 shadow-md">
        {selectedIcon ? (
          <p className="text-lg font-medium text-gray-800">Connect to server: <strong className="text-blue-600">{selectedIcon}</strong></p>
        ) : (
          <p className="text-gray-500">Click a server icon to connect to the server.</p>
        )}
      </div>
    </div>
    </>
  )
}

export default App
