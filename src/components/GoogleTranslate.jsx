import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage, setGoogleTranslateLoaded } from "../redux/languageSlice";

const GoogleTranslate = () => {
  const dispatch = useDispatch();
  const { currentLanguage, availableLanguages, isGoogleTranslateLoaded } = useSelector(
    (state) => state.language
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Load Google Translate script only once
    if (!scriptLoadedRef.current) {
      const addScript = document.createElement("script");
      addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.async = true;
      document.head.appendChild(addScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: availableLanguages.map(lang => lang.code).join(','),
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
        
        dispatch(setGoogleTranslateLoaded(true));
        scriptLoadedRef.current = true;
      };
    }

    // Cleanup function
    return () => {
      // Remove Google Translate elements when component unmounts
      const googleElements = document.querySelectorAll('.goog-te-banner-frame, .goog-te-gadget, .goog-te-ftab');
      googleElements.forEach(el => el.remove());
    };
  }, [dispatch, availableLanguages]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLangChange = (langCode) => {
    if (isGoogleTranslateLoaded) {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event("change"));
      }
    }
    
    dispatch(setLanguage(langCode));
    setIsOpen(false);
  };

  const getCurrentLanguageName = () => {
    const lang = availableLanguages.find(l => l.code === currentLanguage);
    return lang ? lang.nativeName : 'English';
  };

  return (
    <div className="google-translate-wrapper" ref={dropdownRef}>
      {/* Language Button */}
      <button
        className="btn btn-outline-light lang-btn"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        🌐 {getCurrentLanguageName()}
      </button>

      {/* Custom Dropdown */}
      {isOpen && (
        <div className="custom-translate-dropdown">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              className={`dropdown-item ${currentLanguage === lang.code ? 'active' : ''}`}
              onClick={() => handleLangChange(lang.code)}
              type="button"
            >
              {lang.nativeName}
            </button>
          ))}
        </div>
      )}

      {/* Hidden original element for Google Translate */}
      <div id="google_translate_element" style={{ display: "none" }}></div>
    </div>
  );
};

export default GoogleTranslate;
