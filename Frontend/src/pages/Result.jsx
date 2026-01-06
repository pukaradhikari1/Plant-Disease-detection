import { useLocation, useNavigate } from "react-router-dom";
import translations from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  if (!state) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-green-900 to-green-700 px-4 relative">
      <LanguageSwitcher />

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl max-w-2xl w-full text-white">

        <h1 className="text-3xl font-extrabold mb-6 text-center">
          🌱 {t.resultTitle}
        </h1>

        <img
          src={state.image}
          alt="Uploaded leaf"
          className="w-full h-72 object-cover rounded-2xl shadow-xl mb-6 transition-transform hover:scale-[1.02]"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg mb-6">
          <div className="bg-white/10 p-4 rounded-xl">
            <p className="text-white/70 text-sm">{t.disease}</p>
            <p className="font-bold text-xl mt-1">
              {state.disease}
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl">
            <p className="text-white/70 text-sm">{t.confidence}</p>
            <p className="font-bold text-xl mt-1">
              {(state.confidence * 100).toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="bg-white/10 p-5 rounded-xl mb-6">
          <p className="font-bold mb-3 text-lg">
            🧪 {t.treatment}
          </p>
          <ul className="list-disc list-inside space-y-1 text-white/80">
            <li>{t.todoTreatment || "Treatment recommendations coming soon."}</li>
          </ul>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-white/20 hover:bg-white/30 py-3 rounded-xl backdrop-blur-lg font-semibold transition-all shadow-lg active:scale-95"
        >
          {t.uploadAgain}
        </button>

      </div>
    </div>
  );
}
