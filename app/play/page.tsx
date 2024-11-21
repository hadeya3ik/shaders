'use client';
import React, {useEffect, useState} from 'react'


export default function Home() {
  const themes = ["dark", "light", "blue"];
  const [themeIndex, setThemeIndex] = useState(0);
  const [sceneColors, setSceneColors] = useState({ BgCol: "#000000", TextCol: "#FFFFFF" });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const initialThemeIndex = themes.indexOf(savedTheme || initialTheme) !== -1 ? themes.indexOf(savedTheme || initialTheme) : 0;
    setThemeIndex(initialThemeIndex);
    document.body.classList.add("transition-colors", "duration-500");
    document.body.classList.add(themes[initialThemeIndex]);
    updateSceneColors();
  }, []);


  const updateSceneColors = () => {
    const rootStyles = getComputedStyle(document.body);
    setSceneColors({
      BgCol: rootStyles.getPropertyValue("--primary").trim(),
      TextCol: rootStyles.getPropertyValue("--primary-foreground").trim(),
    });
  };

  return (
    <main className="bg-primary text-primary-foreground h-screen">
      jhjljk
    </main>
  );
}