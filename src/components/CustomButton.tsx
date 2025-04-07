import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle} from 'react-native';
import {Colors, ThemeColors} from 'src/config/colors';
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

const CustomButton = ({title, onPress, loading = false, disabled = false, variant = 'primary', style = {}}: Props) => {
  const {theme} = useThemeStore();
  const colors = Colors[theme];

  const getBackgroundColor = () => {
    if (variant === 'outline') return 'transparent';
    if (variant === 'secondary') return colors.BORDER;
    if (variant === 'primary') return colors.PRIMARY;
  };

  const getTextColor = () => {
    if (variant === 'outline') return colors.PRIMARY;
    if (variant === 'primary') return colors.TEXT_BUTTON;
    return '#fff';
  };

  const getBorderColor = () => {
    return 'transparent';
  };

  const styles = StyleSheet.create({
    button: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 12,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
      opacity: disabled ? 0.6 : 1,
      ...style
    },
    text: {
      fontSize: 16,
      fontWeight: '600',
      color: getTextColor()
    }
  });

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled || loading} style={styles.button}>
      {loading ? <ActivityIndicator color={getTextColor()} /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButton;
