'use client';
import React, {useEffect, useState} from 'react'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import("@/components/Scene"), {
  loading : () => <p></p>,
  ssr :false
},);

export default function Home() {
  const themes = ["dark", "light", "blue", "red"];
  const [themeIndex, setThemeIndex] = useState(0);
  const [sceneColors, setSceneColors] = useState({ BgCol: "#000000", TextCol: "#FFFFFF" });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const initialThemeIndex = themes.indexOf(savedTheme) !== -1 ? themes.indexOf(savedTheme) : themes.indexOf(initialTheme);

    setThemeIndex(initialThemeIndex);

    // Set transition for body
    document.body.classList.add("transition-colors", "duration-500");

    // Apply the initial theme
    document.body.classList.add(themes[initialThemeIndex]);
    updateSceneColors();
  }, []);

  // Function to rotate themes
  const rotateTheme = () => {
    document.body.classList.remove(themes[themeIndex]);
    const nextThemeIndex = (themeIndex + 1) % themes.length;
    setThemeIndex(nextThemeIndex);
    document.body.classList.add(themes[nextThemeIndex]);
    localStorage.setItem("theme", themes[nextThemeIndex]);
    updateSceneColors();
  };

  // Function to fetch CSS variables
  const updateSceneColors = () => {
    const rootStyles = getComputedStyle(document.body);
    setSceneColors({
      BgCol: rootStyles.getPropertyValue("--primary").trim(),
      TextCol: rootStyles.getPropertyValue("--primary-foreground").trim(),
    });
  };

  return (
    <main className="bg-primary text-primary-foreground ">
      <div className="relative">
        <Scene BgCol={sceneColors.BgCol} TextCol={sceneColors.TextCol} />
      </div>
      <button 
        onClick={rotateTheme} 
        className="mt-4 px-4 py-2 bg-primary-foreground text-primary rounded">
        Change Mood
      </button>
    </main>
  );
}