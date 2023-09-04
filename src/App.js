import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import Coinpage from "./Pages/Coinpage";
import { makeStyles } from "@material-ui/core";

//branch
const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "black",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coins/:id" element={<Coinpage />} />
      </Routes>
    </div>
  );
}

export default App;
