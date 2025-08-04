import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SymbolWeight } from 'expo-symbols';
import React, { ComponentProps } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

export const ICON_SIZE = 24;

interface IconProps {
  name: ComponentProps<typeof MaterialIcons>["name"];
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}

export const Icon = React.forwardRef(({
  name,
  size = ICON_SIZE,
  color,
  style,
}: IconProps,ref : any) => {
  const theme = useTheme();
  color = color || theme.colors.outline;
  return <MaterialIcons ref={ref} color={color} size={size} name={name} style={style} />;
});


