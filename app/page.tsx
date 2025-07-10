import Image from "next/image";
import AuthDashboard from "./AuthDashboard";
import Listing from "./component/Listing";
import Logout from "./component/Logout";
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
