import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import Container from "@/components/common/container";
import {
  BORDER_RADIUS,
  BUTTON_HEIGHT,
  FLEX,
  FONT_SIZE,
  MARGIN,
  PADDING,
  Z_INDEX,
} from "@/constants/AppConstants";
import { Header } from "@/components/screen/paywall-double/components/header";
import { FeatureList } from "@/components/screen/paywall-double/components/feature-list";
import { TermsText } from "@/components/screen/paywall-double/components/terms-text";
import { PurchaseButton } from "@/components/screen/paywall-double/components/purchase-button";
import RadioButton from "@/components/common/buttons/radio-button";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/theme/useTheme";
import { showToast } from "@/helpers/app-functions";

// 1. Uncomment: 👇
// import { ThemedText } from '@/components/common/typography';
// import PressableOpacity from '@/components/common/buttons/pressable-opacity';
// import { useRevenueCat } from '@/context/RevenueCatProvider';

export default function AndroidInAppPurchases() {
  const { mode } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<
    "$rc_monthly" | "$rc_annual"
  >("$rc_annual");

  // TODO: 2. Uncomment this 👇:
  // const { packages, purchasePackage } = useRevenueCat();

  // TODO: 3. Uncomment plans: 👇
  // const plans = useMemo(() => {
  //   const monthlyPackage = packages.find(
  //     (pkg) => pkg.identifier === '$rc_monthly'
  //   );
  //   const yearlyPackage = packages.find(
  //     (pkg) => pkg.identifier === '$rc_annual'
  //   );

  //   // Early return if packages are not available
  //   if (!monthlyPackage || !yearlyPackage) {
  //     return {
  //       $rc_monthly: {},
  //       $rc_annual: {},
  //     };
  //   }

  //   // Safely calculate savings percentage
  //   const calculateSavings = () => {
  //     const monthlyPricePerYear = monthlyPackage.product.pricePerYear ?? 0;
  //     const yearlyPrice = yearlyPackage.product.price ?? 0;

  //     if (monthlyPricePerYear === 0 || yearlyPrice === 0) {
  //       return null;
  //     }

  //     const savingsPercentage = Math.round(
  //       ((monthlyPricePerYear - yearlyPrice) / monthlyPricePerYear) * 100
  //     );

  //     return savingsPercentage > 0 ? `Save ${savingsPercentage}%` : null;
  //   };

  //   return {
  //     $rc_monthly: {
  //       price: monthlyPackage.product.priceString,
  //       period: 'month',
  //       id: monthlyPackage.identifier,
  //       package: monthlyPackage,
  //       pricePerMonth: monthlyPackage.product.pricePerMonthString,
  //     },
  //     $rc_annual: {
  //       price: yearlyPackage.product.priceString,
  //       period: 'year',
  //       id: yearlyPackage.identifier,
  //       package: yearlyPackage,
  //       pricePerMonth: yearlyPackage.product.pricePerMonthString,
  //       savings: calculateSavings(),
  //     },
  //   };
  // }, [packages]);

  // TODO: 4. Uncomment this 👇:
  // const handlePurchase = useCallback(async () => {
  //   const selectedPackage = plans[selectedPlan]?.package;

  //   if (!selectedPackage) {
  //     console.error('Selected package not available');
  //     return;
  //   }

  //   try {
  //     await purchasePackage(selectedPackage);
  //   } catch (error) {
  //     console.error('Purchase failed:', error);
  //   }
  // }, [selectedPlan, plans, purchasePackage]);

  // TODO: 5. Delete this function 👇:
  const handlePurchase = () => {
    showToast("Purchase", "error");
  };

  return (
    <Container edges={["bottom"]} bgColor={Colors[mode].background}>
      <View style={styles.container}>
        <Header />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <FeatureList />
        </ScrollView>
        <View style={styles.pricingContainer}>
          <RadioButton
            selected={selectedPlan === "$rc_monthly"}
            onSelect={() => setSelectedPlan("$rc_monthly")}
            // TODO: 6. Remove this 👇:
            label="Monthly Plan"
            value="$7.99" // TODO: Remove this
            description="Billed monthly ($7.99/mo)" // TODO: Remove this
            // TODO: 7. Uncomment this 👇:
            // value={plans['$rc_monthly'].price}
            // description={`Billed monthly (${plans['$rc_monthly'].pricePerMonth}/mo)`}
            style={styles.radioButton}
            color={Colors[mode].primary}
            height={BUTTON_HEIGHT.lg}
          />
          <View style={styles.savingsContainer}>
            {/* TODO: 8. Uncomment this 👇: */}
            {/* {plans['$rc_annual'].savings && (
              <PressableOpacity
                style={styles.savingsView}
                variant="active"
                onPress={() => setSelectedPlan('$rc_annual')}
              >
                <ThemedText type="defaultSemiBold" style={styles.savingsText}>
                  {plans['$rc_annual'].savings}
                </ThemedText>
              </PressableOpacity>
            )} */}
            <RadioButton
              selected={selectedPlan === "$rc_annual"}
              onSelect={() => setSelectedPlan("$rc_annual")}
              label="Yearly Plan"
              // TODO: 9. Remove this 👇:
              value="$7.99" // TODO: Remove this
              description="Billed yearly ($7.99/mo)" // TODO: Remove this
              // TODO: 10. Uncomment this 👇:
              // value={plans['$rc_annual'].price}
              // description={`Billed yearly (${plans['$rc_annual'].pricePerMonth}/mo)`}
              color={Colors[mode].primary}
              height={BUTTON_HEIGHT.lg}
            />
          </View>
        </View>
        <View style={styles.purchaseButtonContainer}>
          <PurchaseButton onPress={handlePurchase} />
        </View>
        <TermsText
          // TODO: 11. Remove this 👇:
          price="$7.99" // TODO: Remove this
          period="month" // TODO: Remove this
          // TODO: 12. Uncomment this 👇:
          // price={plans[selectedPlan].price}
          // period={plans[selectedPlan].period}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: FLEX.one,
    justifyContent: "space-between",
  },
  scrollContent: {
    paddingHorizontal: PADDING.lg,
  },
  purchaseButtonContainer: {
    marginHorizontal: MARGIN.lg,
    marginBottom: MARGIN.lg,
  },
  pricingContainer: {
    marginBottom: MARGIN.xl,
    marginHorizontal: MARGIN.xl,
  },
  radioButton: {
    marginVertical: MARGIN.md,
  },
  savingsContainer: {
    position: "relative",
  },
  savingsView: {
    position: "absolute",
    top: 15,
    right: 12,
    paddingHorizontal: PADDING.sm,
    paddingVertical: PADDING.xs,
    borderRadius: BORDER_RADIUS.sm,
    zIndex: Z_INDEX.top,
    backgroundColor: Colors.light.primary,
  },
  savingsText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "900",
    textAlign: "center",
    color: Colors.light.text,
  },
});
