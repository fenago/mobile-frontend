import { useEffect } from "react";
import { Appearance } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  setThemeMode,
  ThemeMode,
  updateEffectiveTheme,
} from "@/store/slices/themeSlice";
import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import { StatusBarStyle } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { getString, STORAGE_KEYS } from "@/utils/storage";

export const useTheme = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mode, selectedMode } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = getString(STORAGE_KEYS.THEME_MODE);
      if (savedTheme) {
        dispatch(setThemeMode(savedTheme as ThemeMode));
      } else {
        dispatch(setThemeMode("system"));
      }
    };

    const subscription = Appearance.addChangeListener(() => {
      if (selectedMode === "system") {
        dispatch(updateEffectiveTheme());
      }
    });

    loadTheme();

    return () => subscription.remove();
  }, [dispatch, mode, selectedMode]);

  const theme: Theme = mode === "dark" ? DarkTheme : DefaultTheme;

  const statusBarStyle: StatusBarStyle = mode === "light" ? "dark" : "light";
  const statusBarBackgroundColor = Colors[mode].background;

  return {
    theme,
    mode,
    statusBarStyle,
    selectedMode,
    statusBarBackgroundColor,
  };
};
