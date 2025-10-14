import { StyleSheet, FlatList } from "react-native";
import { ThemedText } from "@/components/common/typography";
import { ThemedView } from "@/components/common/view";
import { Href, router } from "expo-router";
import { LucideIcon } from "lucide-react-native";
import { features } from "@/components/screen/home/HomeCards";
import PressableOpacity from "@/components/common/buttons/pressable-opacity";
import {
  BORDER_RADIUS,
  BUTTON_HEIGHT,
  FLEX,
  FONT_SIZE,
  ICON_SIZE,
  MARGIN,
  PADDING,
} from "@/constants/AppConstants";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/theme/useTheme";
import React from "react";

interface FeatureItemProps {
  IconComponent: LucideIcon;
  route: string;
  name: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  IconComponent,
  route,
  name,
}) => {
  const { mode } = useTheme();

  const handlePress = () => {
    router.push(`/${route}` as Href);
  };

  return (
    <ThemedView style={styles.themedView}>
      <PressableOpacity
        onPress={handlePress}
        style={[styles.gridItem, { backgroundColor: Colors[mode].button }]}
      >
        <IconComponent size={ICON_SIZE.sm} color={Colors[mode].text} />
        <ThemedText style={styles.gridItemText}>{name}</ThemedText>
      </PressableOpacity>
    </ThemedView>
  );
};

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={features}
        renderItem={({ item }) => (
          <FeatureItem
            IconComponent={item.icon}
            route={item.route}
            name={item.name}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: FLEX.one,
    padding: PADDING.sm,
  },
  gridContainer: {
    padding: PADDING.sm,
  },
  themedView: {
    flex: FLEX.one,
  },
  gridItem: {
    flex: FLEX.one,
    justifyContent: "center",
    borderRadius: BORDER_RADIUS.sm,
    overflow: "hidden",
    alignItems: "center",
    margin: MARGIN.md,
    height: BUTTON_HEIGHT.xl,
  },
  gridItemText: {
    marginTop: MARGIN.lg,
    textAlign: "center",
    fontSize: FONT_SIZE.md,
  },
});
