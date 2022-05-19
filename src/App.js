import Therapeias from "./component/Therapeias";
import WriteTherapeia from "./component/WriteTherapeia";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <Therapeias />
        </div>
        <div className="col-md-4">
          <WriteTherapeia></WriteTherapeia>
        </div>
      </div>
    </div>
  );
}

export default App;
