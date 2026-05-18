import {
  NavigationContainer,
  NavigationContainerRefWithCurrent,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useHabits } from '@/shared/context/HabitsContext';
import { MainScreen } from '@/features/habits/screens/MainScreen';
import { RunDialogScreen } from '@/features/habits/screens/RunDialogScreen';
import { HabitDetailScreen } from '@/features/habits/screens/HabitDetailScreen';
import { SplashScreen } from '@/features/onboarding/screens/SplashScreen';
import { OnboardingWizard } from '@/features/onboarding/screens/OnboardingWizard';
import { BsodScreen } from '@/features/system/screens/BsodScreen';
import { SettingsScreen } from '@/features/system/screens/SettingsScreen';
import { AboutScreen } from '@/features/system/screens/AboutScreen';
import { NotificationsDialog } from '@/features/system/screens/NotificationsDialog';
import { AppearanceDialog } from '@/features/system/screens/AppearanceDialog';
import { BackupDialog } from '@/features/system/screens/BackupDialog';
import { DateTimeDialog } from '@/features/system/screens/DateTimeDialog';
import { DisplayDialog } from '@/features/system/screens/DisplayDialog';
import { HelpDialog } from '@/features/system/screens/HelpDialog';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

type NavRef = NavigationContainerRefWithCurrent<RootStackParamList>;

/**
 * Watches the habits context for a freshly broken streak and pushes the
 * BSOD screen. Lives inside the container so it can drive navigation
 * without prop drilling.
 */
function BsodWatcher({
  navRef,
  currentRoute,
}: {
  navRef: NavRef;
  currentRoute?: string;
}) {
  const { pendingCrash } = useHabits();
  useEffect(() => {
    if (
      pendingCrash &&
      currentRoute === 'Main' &&
      navRef.isReady() &&
      navRef.getCurrentRoute()?.name !== 'Bsod'
    ) {
      navRef.navigate('Bsod');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingCrash, currentRoute]);
  return null;
}

export function RootNavigator() {
  const navRef = useNavigationContainerRef<RootStackParamList>();
  const [route, setRoute] = useState<string | undefined>();

  return (
    <NavigationContainer
      ref={navRef}
      onReady={() => setRoute(navRef.getCurrentRoute()?.name)}
      onStateChange={() => setRoute(navRef.getCurrentRoute()?.name)}
    >
      <BsodWatcher navRef={navRef} currentRoute={route} />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, animation: 'fade' }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingWizard} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen
          name="RunDialog"
          component={RunDialogScreen}
          options={{ presentation: 'transparentModal' }}
        />
        <Stack.Screen name="HabitDetail" component={HabitDetailScreen} />
        <Stack.Screen
          name="Bsod"
          component={BsodScreen}
          options={{ presentation: 'fullScreenModal', animation: 'none' }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen
          name="CfgNotifications"
          component={NotificationsDialog}
          options={{ presentation: 'transparentModal', animation: 'fade' }}
        />
        <Stack.Screen
          name="CfgAppearance"
          component={AppearanceDialog}
          options={{ presentation: 'transparentModal', animation: 'fade' }}
        />
        <Stack.Screen
          name="CfgBackup"
          component={BackupDialog}
          options={{ presentation: 'transparentModal', animation: 'fade' }}
        />
        <Stack.Screen
          name="CfgDateTime"
          component={DateTimeDialog}
          options={{ presentation: 'transparentModal', animation: 'fade' }}
        />
        <Stack.Screen
          name="CfgDisplay"
          component={DisplayDialog}
          options={{ presentation: 'transparentModal', animation: 'fade' }}
        />
        <Stack.Screen
          name="CfgHelp"
          component={HelpDialog}
          options={{ presentation: 'transparentModal', animation: 'fade' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
