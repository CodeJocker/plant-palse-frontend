import { useState } from "react";
import { api } from "./Axios"; // Assuming you already configured Axios instance here
import { useContentWrapper } from "../components/ContentWrapper";

const useHandleAiResponse = () => {
  const { search, usedPhoto, isProcessing, aiResponse, history, error, setError , setSearch , setUsedPhoto , setIsProcessing , setAiResponse , setHistory } = useContentWrapper()

  const simulateAIResponse = async (e, form, image) => {
    e.preventDefault();
    setIsProcessing(true);
    setAiResponse("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("plantType", form.plantType);
      formData.append("symptoms", form.symptoms);
      formData.append("location", form.location);
      if (image) formData.append("image", image);

      const res = await api.post("/ai/diagnose", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data;
      setAiResponse(
        data?.data?.diagnosis ||
          data?.data?.response ||
          data?.message ||
          "No diagnosis available."
      );

      // Optional: Save to history
      setHistory((prev) => [...prev, { form, aiResponse: data }]);
    } catch (err) {
      setAiResponse("");
      setError("Sorry, there was a problem contacting the AI server.");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    search,
    setSearch,
    usedPhoto,
    setUsedPhoto,
    isProcessing,
    aiResponse,
    error,
    history,
    simulateAIResponse,
  };
};

export default useHandleAiResponse;
