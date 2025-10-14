import React from 'react';
import { Platform, ScrollView } from 'react-native';
import { ThemedView } from '@/components/common/view';
import { ThemedText } from '@/components/common/typography';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/theme/useTheme';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ExternalLink } from '@/components/common/external-link';
import { useAuth } from '@/context/FirebaseProvider';
import { Image } from 'expo-image';
import AuthButton from '@/components/common/buttons/auth';
import { authStyles } from '@/constants/AuthStyles';
import PressableOpacity from '@/components/common/buttons/pressable-opacity';
import { ANIMATION_DURATION } from '@/constants/AppConstants';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const SignUpScreen = () => {
  const router = useRouter();
  const { mode } = useTheme();
  const { signInWithGoogle, signInWithApple, signUpAnonymously, isLoading } =
    useAuth();

  return (
    <ScrollView
      contentContainerStyle={authStyles.scrollViewContent}
      style={{ backgroundColor: Colors[mode].background }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <ThemedView>
        <ThemedView style={authStyles.imageTitleContainer}>
          <AnimatedImage
            entering={FadeInDown.duration(ANIMATION_DURATION.D2)}
            source={require('@/assets/images/logo.png')}
            style={authStyles.logo}
          />
          <ThemedText type="title" style={authStyles.title}>
            Ship Mobile Fast
          </ThemedText>
        </ThemedView>

        <ThemedView style={authStyles.viewContainer}>
          {Platform.OS === 'ios' && (
            <Animated.View
              entering={FadeInDown.duration(ANIMATION_DURATION.D3)}
            >
              <AuthButton
                onPress={signInWithApple}
                icon="logo-apple"
                text="Continue with Apple"
                disabled={isLoading}
                loading={isLoading}
              />
            </Animated.View>
          )}

          <Animated.View entering={FadeInDown.duration(ANIMATION_DURATION.D4)}>
            <AuthButton
              onPress={signInWithGoogle}
              icon="logo-google"
              text="Continue with Google"
              disabled={isLoading}
              loading={isLoading}
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(ANIMATION_DURATION.D5)}>
            <AuthButton
              onPress={() => router.push('/(no-auth)/sign-up-with-email')}
              icon="mail"
              text="Continue with Email"
              disabled={isLoading}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(ANIMATION_DURATION.D5)}>
            <AuthButton
              onPress={signUpAnonymously}
              icon="mail"
              text="Continue Anonymously"
              disabled={isLoading}
            />
          </Animated.View>
        </ThemedView>
        <Animated.View entering={FadeInDown.duration(ANIMATION_DURATION.D6)}>
          <ExternalLink
            href="https://shipmobilefast.com/privacy-policy"
            style={authStyles.termsText}
          >
            <ThemedText
              type="link"
              lightColor={Colors.light.placeholderColor}
              darkColor={Colors.dark.placeholderColor}
            >
              By registering, you agree to our Terms of Service and Privacy
              Policy
            </ThemedText>
          </ExternalLink>
        </Animated.View>
        <Animated.View entering={FadeInDown.duration(ANIMATION_DURATION.D7)}>
          <PressableOpacity
            onPress={() => {
              router.push('/(no-auth)/sign-in');
            }}
            disabled={isLoading}
            style={authStyles.alreadyHaveAccount}
          >
            <ThemedText
              style={authStyles.alreadyHaveAccount}
              lightColor={Colors.light.placeholderColor}
              darkColor={Colors.dark.placeholderColor}
            >
              Already have an account?
            </ThemedText>
            <ThemedText
              type="link"
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
              style={authStyles.linkText}
            >
              Sign In
            </ThemedText>
          </PressableOpacity>
        </Animated.View>
      </ThemedView>
    </ScrollView>
  );
};

export default SignUpScreen;
