// Update this page (the content is just a fallback if you fail to update the page)

import Dashboard from "./Dashboard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-end mb-4">
        <Button variant="outline" asChild>
          <Link to="/onboarding">View Onboarding</Link>
        </Button>
      </div>
      <Dashboard />
    </div>
  );
};

export default Index;