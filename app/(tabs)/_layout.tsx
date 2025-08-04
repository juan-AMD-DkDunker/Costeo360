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
    }
  ];

  console.log(tabs);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.onSurface,
        tabBarInactiveTintColor: theme.colors.outline,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      {
        tabs.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: tabBarIcon(tab.icon)
            }}
          />
        ))
      }
    </Tabs>
  );
}
