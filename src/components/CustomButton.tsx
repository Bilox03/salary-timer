import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useThemeStore} from 'src/store/themeStore';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  style?: ViewStyle;
};

const CustomButton = ({title, onPress, loading = false, disabled = false, variant = 'primary', style}: Props) => {
  const theme = useThemeStore(s => s.theme);
  const colors = Colors[theme];

  const getBackgroundColor = () => {
    if (variant === 'outline') return 'transparent';
    if (variant === 'secondary') return colors.TEXT_SECONDARY;
    return colors.PRIMARY;
  };

  const getTextColor = () => {
    if (variant === 'outline') return colors.PRIMARY;
    return '#fff';
  };

  const getBorderColor = () => {
    if (variant === 'outline') return colors.PRIMARY;
    return 'transparent';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          opacity: disabled ? 0.6 : 1
        },
        style
      ]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, {color: getTextColor()}]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    fontWeight: '600'
  }
});
