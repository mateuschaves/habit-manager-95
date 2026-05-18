import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, ScrollView, View } from 'react-native';
import {
  Bezel,
  Win95Button,
  Win95Checkbox,
  Win95Desktop,
  Win95Input,
  Win95Progress,
  Win95Radio,
  Win95Select,
  Win95Text,
  Win95Window,
} from '@/shared/components/win95';
import {
  HabitIcon,
  IconAlert,
  IconFloppy,
} from '@/shared/components/icons';
import { useHabits } from '@/shared/context/HabitsContext';
import { useSettings } from '@/shared/context/SettingsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import {
  HABIT_ICON_KEYS,
  REMINDER_TIMES,
} from '@/shared/constants';
import { Frequency } from '@/shared/types/habit';
import { RootStackParamList } from '@/navigation/types';
import {
  HABIT_TEMPLATES,
  WIZARD_STEPS,
} from '@/features/onboarding/constants';
import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';
import {
  Body,
  Content,
  CustomizeRow,
  DayToggle,
  DaysRow,
  DraftItem,
  DraftRemove,
  DraftSidebar,
  Footer,
  FooterSpacer,
  Form,
  FormField,
  IconCell,
  IconGrid,
  LogBox,
  NewDraft,
  Progress,
  SelectList,
  SidePanel,
  SpaceRow,
  StepDot,
  StepItem,
  TemplateName,
  TemplateRow,
  ToolRow,
  WarnBox,
} from './styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;
const DOW = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function OnboardingWizard() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { addHabit } = useHabits();
  const { completeOnboarding } = useSettings();
  const ob = useOnboarding();

  const stepTitles = [
    t('setup.step.welcome'),
    t('setup.step.select'),
    t('setup.step.customize'),
    t('setup.step.installing'),
  ];

  function goMain() {
    completeOnboarding();
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  }

  async function finish() {
    try {
      for (const input of ob.toInputs()) {
        await addHabit(input);
      }
      goMain();
    } catch {
      Alert.alert(t('setup.title'), t('setup.installError'));
    }
  }

  async function next() {
    if (ob.step === 2 && ob.drafts.length === 0) {
      Alert.alert(t('setup.title'), t('setup.customize.empty'));
      return;
    }
    if (ob.step === 3 && ob.validDrafts.length === 0) {
      Alert.alert(t('setup.title'), t('setup.customize.empty'));
      return;
    }
    if (ob.step >= WIZARD_STEPS) {
      await finish();
      return;
    }
    ob.setStep(ob.step + 1);
  }

  const draft = ob.activeDraft;

  return (
    <Win95Desktop hideTaskbar activeApp="setup.exe">
      <Win95Window
        title={t('setup.title')}
        icon={<IconFloppy size={14} />}
        controls={['close']}
        onClose={goMain}
        fill
        style={{ flex: 1 }}
        bodyStyle={{ flex: 1, padding: 0 }}
        testID="onboarding-window"
      >
        <Body>
          <SidePanel>
            <View>
              <Win95Text variant="title" bold onDark>
                Habit{'\n'}Manager{'\n'}95
              </Win95Text>
              <Win95Text variant="caption" onDark style={{ marginTop: 6 }}>
                {t('setup.wizard')}
              </Win95Text>
            </View>
            <View>
              {stepTitles.map((title, i) => (
                <StepItem key={title} $active={i + 1 === ob.step}>
                  <StepDot $done={i + 1 <= ob.step} />
                  <Win95Text variant="caption" onDark>
                    {i + 1}. {title}
                  </Win95Text>
                </StepItem>
              ))}
            </View>
          </SidePanel>

          <Content>
            {ob.step === 1 && (
              <ScrollView>
                <Win95Text variant="heading" bold>
                  {t('setup.welcome.h')}
                </Win95Text>
                <Win95Text style={{ marginTop: 8 }}>
                  {t('setup.welcome.p1')}
                </Win95Text>
                <Win95Text style={{ marginTop: 8 }}>
                  {t('setup.welcome.p2')}
                </Win95Text>
                <WarnBox>
                  <IconAlert size={16} />
                  <Win95Text variant="caption" style={{ flex: 1, marginLeft: 6 }}>
                    {t('setup.welcome.warn')}
                  </Win95Text>
                </WarnBox>
              </ScrollView>
            )}

            {ob.step === 2 && (
              <View style={{ flex: 1 }}>
                <Win95Text variant="title" bold>
                  {t('setup.select.h')}
                </Win95Text>
                <Win95Text variant="caption" style={{ marginVertical: 6 }}>
                  {t('setup.select.p')}
                </Win95Text>
                <Bezel variant="inset">
                  <SelectList>
                    <ScrollView>
                      {HABIT_TEMPLATES.map((tpl) => (
                        <TemplateRow key={tpl.key}>
                          <Win95Checkbox
                            checked={ob.isSelected(tpl.key)}
                            onToggle={() => ob.toggleTemplate(tpl.key)}
                            testID={`tpl-${tpl.key}`}
                          />
                          <View style={{ marginLeft: 6 }}>
                            <HabitIcon iconKey={tpl.iconKey} size={16} />
                          </View>
                          <TemplateName>
                            <Win95Text>{tpl.name}.exe</Win95Text>
                          </TemplateName>
                          <Win95Text variant="caption">{tpl.sizeKB}</Win95Text>
                        </TemplateRow>
                      ))}
                    </ScrollView>
                  </SelectList>
                </Bezel>
                <ToolRow>
                  <Win95Button
                    label={t('btn.newComponent')}
                    onPress={() => {
                      ob.addBlank();
                      ob.setStep(3);
                    }}
                    style={{ flex: 1, marginRight: 6 }}
                    testID="onboarding-new"
                  />
                </ToolRow>
                <SpaceRow>
                  <Win95Text variant="caption">
                    {t('setup.select.spaceNeeded')}: {ob.drafts.length * 16} KB
                  </Win95Text>
                  <Win95Text variant="caption">
                    {t('setup.select.spaceAvailable')}: ∞
                  </Win95Text>
                </SpaceRow>
              </View>
            )}

            {ob.step === 3 && (
              <View style={{ flex: 1 }}>
                <Win95Text variant="label" bold>
                  {t('setup.customize.h')}
                </Win95Text>
                <Win95Text variant="caption" style={{ marginVertical: 4 }}>
                  {t('setup.customize.p')}
                </Win95Text>
                <CustomizeRow>
                  <Bezel variant="inset">
                    <DraftSidebar>
                      <ScrollView>
                        {ob.drafts.map((d) => {
                          const isActive = d.key === ob.activeDraft?.key;
                          return (
                            <DraftItem
                              key={d.key}
                              $active={isActive}
                              onPress={() => ob.setActiveKey(d.key)}
                              testID={`draft-${d.key}`}
                            >
                              <HabitIcon iconKey={d.iconKey} size={14} />
                              <View style={{ flex: 1, marginLeft: 3 }}>
                                <Win95Text
                                  variant="caption"
                                  numberOfLines={1}
                                  color={isActive ? '#ffffff' : undefined}
                                >
                                  {(d.name || '...') + '.exe'}
                                </Win95Text>
                              </View>
                              <DraftRemove
                                accessibilityRole="button"
                                accessibilityLabel={t('setup.removeDraft')}
                                onPress={() => ob.removeDraft(d.key)}
                                testID={`draft-remove-${d.key}`}
                              >
                                <Win95Text
                                  variant="caption"
                                  color={isActive ? '#ffffff' : '#404040'}
                                >
                                  ✕
                                </Win95Text>
                              </DraftRemove>
                            </DraftItem>
                          );
                        })}
                      </ScrollView>
                      <NewDraft
                        onPress={() => ob.addBlank()}
                        testID="draft-new"
                      >
                        <Win95Text variant="caption" color="#000080">
                          + {t('btn.newHabit')}
                        </Win95Text>
                      </NewDraft>
                    </DraftSidebar>
                  </Bezel>

                  {draft ? (
                    <Form>
                      <ScrollView>
                        <FormField>
                          <Win95Input
                            label={t('field.processName')}
                            value={draft.name}
                            onChangeText={(v) =>
                              ob.updateDraft(draft.key, { name: v })
                            }
                            suffix={
                              <Win95Text variant="caption">.exe</Win95Text>
                            }
                            testID="draft-name"
                          />
                        </FormField>
                        <FormField>
                          <Win95Text variant="caption">
                            {t('field.icon')}
                          </Win95Text>
                          <Bezel variant="inset">
                            <IconGrid>
                              {HABIT_ICON_KEYS.map((key) => (
                                <IconCell
                                  key={key}
                                  $selected={key === draft.iconKey}
                                  onPress={() =>
                                    ob.updateDraft(draft.key, { iconKey: key })
                                  }
                                  testID={`draft-icon-${key}`}
                                >
                                  <HabitIcon iconKey={key} size={16} />
                                </IconCell>
                              ))}
                            </IconGrid>
                          </Bezel>
                        </FormField>
                        <FormField>
                          <Win95Text variant="caption">
                            {t('field.frequency')}
                          </Win95Text>
                          {(['daily', 'weekly', 'custom'] as Frequency[]).map(
                            (f) => (
                              <Win95Radio
                                key={f}
                                checked={draft.frequency === f}
                                onSelect={() =>
                                  ob.updateDraft(draft.key, { frequency: f })
                                }
                                label={t(`freq.${f}` as const)}
                                testID={`draft-freq-${f}`}
                              />
                            )
                          )}
                          {draft.frequency === 'custom' ? (
                            <DaysRow>
                              {DOW.map((d, i) => (
                                <Bezel
                                  key={i}
                                  variant={
                                    draft.days.includes(i)
                                      ? 'pressed'
                                      : 'raised'
                                  }
                                >
                                  <DayToggle
                                    onPress={() =>
                                      ob.updateDraft(draft.key, {
                                        days: draft.days.includes(i)
                                          ? draft.days.filter((x) => x !== i)
                                          : [...draft.days, i].sort(),
                                      })
                                    }
                                    testID={`draft-day-${i}`}
                                  >
                                    <Win95Text variant="caption">{d}</Win95Text>
                                  </DayToggle>
                                </Bezel>
                              ))}
                            </DaysRow>
                          ) : null}
                        </FormField>
                        <FormField>
                          <Win95Text variant="caption">
                            {t('field.reminder')}
                          </Win95Text>
                          <Win95Select
                            value={draft.reminderTime ?? 'none'}
                            onChange={(v) =>
                              ob.updateDraft(draft.key, {
                                reminderTime: v === 'none' ? null : v,
                              })
                            }
                            options={[
                              { value: 'none', label: t('reminder.none') },
                              ...REMINDER_TIMES.map((r) => ({
                                value: r,
                                label: r,
                              })),
                            ]}
                            testID="draft-reminder"
                          />
                        </FormField>
                        <FormField>
                          <Win95Checkbox
                            checked={draft.notifyIfLate}
                            onToggle={(v) =>
                              ob.updateDraft(draft.key, { notifyIfLate: v })
                            }
                            label={t('field.notifyLate')}
                            testID="draft-notify"
                          />
                        </FormField>
                      </ScrollView>
                    </Form>
                  ) : (
                    <Form>
                      <Win95Text variant="caption">
                        {t('setup.customize.empty')}
                      </Win95Text>
                    </Form>
                  )}
                </CustomizeRow>
              </View>
            )}

            {ob.step === 4 && (
              <ScrollView>
                <Win95Text variant="title" bold>
                  {t('setup.installing.h')}
                </Win95Text>
                <Win95Text variant="caption" style={{ marginVertical: 8 }}>
                  {t('setup.installing.p')}
                </Win95Text>
                <Progress>
                  <Win95Progress value={100} />
                </Progress>
                <Progress>
                  <Win95Progress value={100} />
                </Progress>
                <Bezel variant="thinInset">
                  <LogBox>
                    {ob.validDrafts.slice(0, 5).map((d) => (
                      <Win95Text key={d.key} variant="caption" mono>
                        &gt; Copiando {d.name}.exe ... OK
                      </Win95Text>
                    ))}
                    <Win95Text variant="caption" mono>
                      &gt; {t('setup.installing.done')}
                    </Win95Text>
                  </LogBox>
                </Bezel>
              </ScrollView>
            )}
          </Content>
        </Body>

        <Footer>
          <Win95Button
            label={t('btn.back')}
            disabled={ob.step === 1}
            onPress={() => ob.setStep(Math.max(1, ob.step - 1))}
            style={{ marginRight: 6 }}
            testID="onboarding-back"
          />
          <Win95Button
            label={ob.step === WIZARD_STEPS ? t('btn.finish') : t('btn.next')}
            primary
            onPress={next}
            testID="onboarding-next"
          />
          <FooterSpacer />
          <Win95Button
            label={t('btn.cancel')}
            onPress={goMain}
            testID="onboarding-cancel"
          />
        </Footer>
      </Win95Window>
    </Win95Desktop>
  );
}
