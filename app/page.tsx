'use client';
import React, {useEffect, useState} from 'react'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import("@/components/Scene"), {
  loading : () => <p></p>,
  ssr :false
},);

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

  const rotateTheme = () => {
    document.body.classList.remove(themes[themeIndex]);
    const nextThemeIndex = (themeIndex + 1) % themes.length;
    setThemeIndex(nextThemeIndex);
    document.body.classList.add(themes[nextThemeIndex]);
    localStorage.setItem("theme", themes[nextThemeIndex]);
    updateSceneColors();
  };

  const updateSceneColors = () => {
    const rootStyles = getComputedStyle(document.body);
    setSceneColors({
      BgCol: rootStyles.getPropertyValue("--primary").trim(),
      TextCol: rootStyles.getPropertyValue("--primary-foreground").trim(),
    });
  };

  return (
    <main className="bg-primary text-primary-foreground ">
      <div className="relatiave">
        <Scene BgCol={sceneColors.BgCol} TextCol={sceneColors.TextCol} />
      </div>
      <button 
        onClick={rotateTheme} 
        className="bg-primary-foreground text-primary">
        Change Mood
      </button>
    </main>
  );
}