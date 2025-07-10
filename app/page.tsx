import AuthDashboard from "./AuthDashboard";
import Dashbord from "./Dashbord";

export default function Home() {

  return (
    <div className="p-10">
      <AuthDashboard>
        <Dashbord/>
      </AuthDashboard>
    </div>
  );
}
