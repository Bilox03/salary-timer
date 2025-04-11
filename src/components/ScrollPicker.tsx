import React, {useRef, useState, useEffect} from 'react';
import {View, FlatList, Text, StyleSheet, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {useThemeStore} from '@/store/themeStore';
import {Colors} from '@/config/colors';

interface ScrollPickerProps {
  data: string[];
  defaultIndex?: number;
  onValueChange?: (value: string, index: number) => void;
  visibleItems?: number;
  itemHeight?: number;
}

const ScrollPicker: React.FC<ScrollPickerProps> = ({
  data,
  defaultIndex = 0,
  onValueChange,
  visibleItems = 5,
  itemHeight = 30
}) => {
  const colors = Colors[useThemeStore(s => s.theme)];

  const flatListRef = useRef<FlatList>(null);
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const [listReady, setListReady] = useState<boolean>(false);

  const halfItems = Math.floor((visibleItems - 1) / 2);

  const getValidIndex = (index: number) => {
    return Math.max(0, Math.min(data.length - 1, index));
  };

  const getOffsetFromIndex = (index: number) => {
    return index * itemHeight;
  };

  const scrollToIndex = (index: number, animated = true) => {
    const validIndex = getValidIndex(index);
    const offset = getOffsetFromIndex(validIndex);
    flatListRef.current?.scrollToOffset({
      offset,
      animated
    });
  };

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / itemHeight);
    const clampedIndex = getValidIndex(index);
    const alignedOffset = getOffsetFromIndex(clampedIndex);

    flatListRef.current?.scrollToOffset({
      offset: alignedOffset,
      animated: true
    });

    if (clampedIndex !== selectedIndex) {
      setSelectedIndex(clampedIndex);
      onValueChange?.(data[clampedIndex], clampedIndex);
    }
  };

  useEffect(() => {
    if (listReady) {
      scrollToIndex(defaultIndex, false);
      setSelectedIndex(getValidIndex(defaultIndex));
    }
  }, [listReady, defaultIndex]);

  const styles = StyleSheet.create({
    item: {
      justifyContent: 'center',
      alignItems: 'center',
      height: itemHeight
    },
    text: {
      fontSize: 22,
      color: colors.TEXT_SECONDARY
    },
    selectedText: {
      color: colors.PRIMARY,
      fontWeight: 'bold'
    },
    highlight: {
      position: 'absolute',
      top: (itemHeight * visibleItems) / 2 - itemHeight / 2,
      height: itemHeight,
      left: 0,
      right: 0,
      borderWidth: 1,
      borderRadius: 5,
      borderStyle: 'dashed',
      borderColor: colors.PRIMARY
    },
    wrapper: {
      height: itemHeight * visibleItems,
      overflow: 'hidden'
    }
  });

  const renderItem = ({item, index}: {item: string; index: number}) => {
    const isSelected = index === selectedIndex;
    return (
      <View style={styles.item}>
        <Text style={[styles.text, isSelected && styles.selectedText]}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index
        })}
        contentContainerStyle={{
          paddingTop: itemHeight * halfItems,
          paddingBottom: itemHeight * halfItems,
          paddingHorizontal: 10
        }}
        onLayout={() => setListReady(true)}
      />
      <View pointerEvents="none" style={styles.highlight} />
    </View>
  );
};

export default ScrollPicker;
