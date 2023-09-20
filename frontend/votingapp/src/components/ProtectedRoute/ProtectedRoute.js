import AdminDashboard from "../Dashboard/AdminDashboard";
import CandidateDashboard from "../Dashboard/CandidateDashboard";
import VoterDashboard from "../Dashboard/VoterDashboard";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {

  const isAuthenticated = sessionStorage.getItem("jwt");
  const userType = sessionStorage.getItem("userType");
  const isAdminDashboard = Component === AdminDashboard;
  const isVoterDashboard = Component === VoterDashboard;
  const isCandidateDashboard = Component === CandidateDashboard;
  const isAdmin = isAuthenticated && userType === "Admin";
  const isVoter = isAuthenticated && userType === "Voter";
  const isCandidate = isAuthenticated && userType === "Candidate";
  
  if (isAdminDashboard && !isAdmin) {
    return <Navigate to="/PageNotFound" />;
  }

  if (isVoterDashboard && !isVoter) {
    return <Navigate to="/PageNotFound" />;
  }

  if (isCandidateDashboard && !isCandidate) {
    return <Navigate to="/PageNotFound" />;
  }

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
