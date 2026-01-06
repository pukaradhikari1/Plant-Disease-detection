import { useState } from "react";
import { useNavigate } from "react-router-dom";
import translations from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!image) return alert(t.uploadAlert || "Please upload an image first.");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      navigate("/result", {
        state: {
          disease: data.best_prediction.disease,
          confidence: data.best_prediction.confidence,
          image: preview,
          topPredictions: data.top_predictions,
        },
      });
    } catch (err) {
      console.error(err);
      alert(t.error || "Prediction failed. Check backend.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 via-green-900 to-black px-4 relative">
      <LanguageSwitcher />

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl max-w-xl w-full">

        <h1 className="text-4xl font-extrabold text-white text-center mb-2">
          🌿 {t.title}
        </h1>

        <p className="text-white/70 text-center mb-8">
          {t.subtitle}
        </p>

        <label className="relative block border-2 border-dashed border-white/30 rounded-2xl p-8 text-center cursor-pointer bg-white/5 hover:bg-white/10 transition-all">
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />

          {preview ? (
            <img
              src={preview}
              alt="Leaf Preview"
              className="mx-auto h-44 rounded-xl shadow-lg object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="space-y-3">
              <p className="text-white text-lg font-semibold">
                {t.upload}
              </p>
              <p className="text-white/60 text-sm">
                {t.supportedFormats || "JPG, PNG or JPEG supported"}
              </p>
            </div>
          )}
        </label>

        <button
          onClick={handleUpload}
          className="mt-8 w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-3 rounded-xl font-semibold tracking-wide shadow-xl transition-all active:scale-95"
        >
          {t.diagnose}
        </button>

      </div>
    </div>
  );
}
