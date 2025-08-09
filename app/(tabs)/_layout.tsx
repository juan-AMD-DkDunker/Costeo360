import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import { Icon } from '@/components/ui/Icon';
import useTranslation from '@/hooks/useTranslation';
import { useTheme } from 'react-native-paper';

const tabBarIcon = (name: string) => ({ color, focused }: { color: string, focused: boolean }) => <Icon size={28} name={`${name}${focused ? '' : '-outline'}` as any} color={color} />

export default function TabLayout() {
  const theme = useTheme();
  const { t } = useTranslation();

  const tabs = [
    {
      name: 'inventory',
      title: t('tabs.inventory'),
      icon: 'clipboard-list'
    },
    {
      name: 'recipe',
      title: t('tabs.recipe'),
      icon: 'book-open'
    },
    {
      name: 'sale',
      title: t('tabs.sale'),
      icon: 'file-chart'
    },
    {
      name: 'index',
      title: 'Perfil',
      icon: 'account'
    }
  ];
  console.log(tabs)
  return (
    <Tabs
      initialRouteName='recipe'
      screenOptions={{
        tabBarActiveTintColor: theme.colors.onSecondary,
        tabBarInactiveTintColor: theme.colors.outline,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
          <Tabs.Screen
            key={'inventory'}
            name={'inventory'}
            options={{
              title: t('tabs.inventory'),
              tabBarIcon: tabBarIcon('clipboard-list'),
            }}

          />
          <Tabs.Screen
            key={'recipe'}
            name={'recipe'}
            options={{
              title: t('tabs.recipe'),
              tabBarIcon: tabBarIcon('book-open')
            }}
          />
          <Tabs.Screen
            key={'sale'}
            name={'sale'}
            options={{
              title: t('tabs.sale'),
              tabBarIcon: tabBarIcon('file-chart')
            }}
          />
          <Tabs.Screen
            key={'account'}
            name="account"
            options={{
              title: 'Perfil',
              tabBarIcon: tabBarIcon('account')
            }}
          />
    </Tabs>
  );
}
