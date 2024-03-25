import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "../../../../Desktop/Admin/react-admin-dashboard-master/src/scenes/global/Topbar";
import Sidebar from "../../../../Desktop/Admin/react-admin-dashboard-master/src/scenes/global/Sidebar";
import Dashboard from "../../../../Desktop/Admin/react-admin-dashboard-master/src/scenes/dashboard";
import Team from "../../../../Desktop/Admin/react-admin-dashboard-master/src/scenes/team";
import Invoices from "../../../../Desktop/Admin/react-admin-dashboard-master/src/scenes/invoices";
import Contacts from "../../../../Desktop/Admin/react-admin-dashboard-master/src/scenes/contacts";
import Bar from "../../../../Desktop/Admin/react-admin-dashboard-master/src/scenes/bar";
import Form from "../../../../Desktop/Admin/react-admin-dashboard-master/src/scenes/form";
import Line from "../../../../Desktop/Admin/react-admin-dashboard-master/src/scenes/line";
import Pie from "../../../../Desktop/Admin/react-admin-dashboard-master/src/scenes/pie";
import FAQ from "../../../../Desktop/Admin/react-admin-dashboard-master/src/scenes/faq";
import Geography from "../../../../Desktop/Admin/react-admin-dashboard-master/src/scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "../../../../Desktop/Admin/react-admin-dashboard-master/src/scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
