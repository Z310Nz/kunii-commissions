import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(-1)}
      className="absolute top-4 left-4 md:top-8 md:left-8"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back
    </Button>
  );
};

export default BackButton;