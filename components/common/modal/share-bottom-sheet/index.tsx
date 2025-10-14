import { View, StyleSheet } from 'react-native';
import React, { useRef, forwardRef } from 'react';
import ShareOption from '@/components/common/share/ShareOption';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/theme/useTheme';
import BottomSheet from '@gorhom/bottom-sheet';
import { FLEX, MARGIN } from '@/constants/AppConstants';
import ViewShot from 'react-native-view-shot';

// This is working with Development Build
import Share, { Social } from 'react-native-share';

const ShareBottomSheet = forwardRef<ViewShot, { colors: string[] }>(
  (props, ref) => {
    const { mode } = useTheme();
    const bottomSheetRef = useRef<BottomSheet>(null);

    const shareStory = async () => {
      try {
        if (!ref || typeof ref === 'function') return;
        const uri = await ref?.current?.capture?.();
        await Share.shareSingle({
          social: Share.Social.INSTAGRAM_STORIES as Social,
          backgroundBottomColor: props.colors[1],
          backgroundTopColor: props.colors[0],
          appId: 'META APP ID',
          stickerImage: uri,
        });
      } catch {
        throw new Error('Error sharing on Instagram');
      }
    };
    const shareFacebookStory = async () => {
      try {
        if (!ref || typeof ref === 'function') return;
        const uri = await ref?.current?.capture?.();
        await Share.shareSingle({
          social: Share.Social.FACEBOOK_STORIES as Social,
          backgroundBottomColor: props.colors[1],
          backgroundTopColor: props.colors[0],
          appId: 'META APP ID',
          stickerImage: uri,
        });
      } catch {
        throw new Error('Error sharing on Facebook');
      }
    };

    return (
      <BottomSheet
        snapPoints={['17%', '25%', '30%']}
        backgroundStyle={{
          backgroundColor: Colors[mode].button,
        }}
        handleIndicatorStyle={{
          backgroundColor: Colors[mode].text,
        }}
        enableDynamicSizing={false}
        ref={bottomSheetRef}
        index={0}
        style={{
          flex: 0.17,
        }}
      >
        <View style={styles.shareOptions}>
          <View style={styles.shareOptionsRow}>
            <ShareOption
              icon="link"
              label="Copy link"
              color={Colors[mode].text}
              onPress={() => {}}
            />
            <ShareOption
              icon="instagram"
              label="Stories"
              color={Colors[mode].text}
              onPress={shareStory}
            />
            <ShareOption
              icon="instagram"
              label="Post"
              color={Colors[mode].text}
              onPress={() => {}}
            />
            <ShareOption
              icon="snapchat"
              label="Snap"
              color={Colors[mode].text}
              onPress={() => {}}
            />
          </View>
          <View style={styles.shareOptionsRow}>
            <ShareOption
              icon="facebook"
              label="Story"
              color={Colors[mode].text}
              onPress={shareFacebookStory}
            />
            <ShareOption
              icon="facebook"
              label="Post"
              color={Colors[mode].text}
              onPress={() => {}}
            />
            <ShareOption
              icon="reddit"
              label="Reddit"
              color={Colors[mode].text}
              onPress={() => {}}
            />
            <ShareOption
              icon="x-twitter"
              label="X"
              color={Colors[mode].text}
              onPress={() => {}}
            />
          </View>
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  shareOptions: {
    flex: FLEX.one,
  },
  shareOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: MARGIN.sm,
  },
});

export default ShareBottomSheet;
