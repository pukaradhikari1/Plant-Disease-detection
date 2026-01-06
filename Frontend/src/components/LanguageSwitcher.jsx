import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <div className="absolute top-6 right-6 flex bg-white/10 backdrop-blur-lg rounded-full p-1 border border-white/20">
            <button
                onClick={() => toggleLanguage("en")}
                className={`px-4 py-1 rounded-full text-sm transition ${language === "en"
                        ? "bg-green-500 text-white"
                        : "text-white/70 hover:text-white"
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => toggleLanguage("np")}
                className={`px-4 py-1 rounded-full text-sm transition ${language === "np"
                        ? "bg-green-500 text-white"
                        : "text-white/70 hover:text-white"
                    }`}
            >
                नेपाली
            </button>
        </div>
    );
}
