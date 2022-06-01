import "./App.css";
import { useStores } from "./stores";
import { observer } from "mobx-react";
import { LogIn } from "./component/logIn";
import { MyLayout } from "./layout";
const App = observer(() => {
  const { thanhVien } = useStores();
  return (
    <div className="App">
      {thanhVien.token !== null && thanhVien.token !== "null" ? (
        <MyLayout />
      ) : (
        <LogIn />
      )}
    </div>
  );
});

export default App;
