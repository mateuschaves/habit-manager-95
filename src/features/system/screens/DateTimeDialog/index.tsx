import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import {
  Bezel,
  Win95Button,
  Win95Checkbox,
  Win95DialogShell,
  Win95GroupBox,
  Win95Select,
  Win95Tabs,
  Win95TabPane,
  Win95Text,
} from '@/shared/components/win95';
import { IconAlert, IconCalendar } from '@/shared/components/icons';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { AnalogClock } from './AnalogClock';
import {
  CalCol,
  CalDay,
  CalDow,
  CalDows,
  CalGrid,
  ClockCol,
  ClockReadout,
  DateRow,
  Footer,
  MonthRow,
  Warning,
} from './styles';

const DOW = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function DateTimeDialog() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [now, setNow] = useState(() => new Date());
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [day, setDay] = useState(now.getDate());
  const [tab, setTab] = useState(0);
  const [ntp, setNtp] = useState(true);
  const [dst, setDst] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  function applyAndStay() {
    Alert.alert(
      t('cfg.dateTime.systemClockTitle'),
      t('cfg.dateTime.systemClockBody')
    );
  }

  function applyAndClose() {
    Alert.alert(
      t('cfg.dateTime.systemClockTitle'),
      t('cfg.dateTime.systemClockBody'),
      [{ text: t('btn.ok'), onPress: () => navigation.goBack() }]
    );
  }

  const firstDow = new Date(year, month, 1).getDay();
  const total = daysInMonth(year, month);
  const prevTotal = daysInMonth(year, month - 1);
  const cells: { d: number; inMonth: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const dn = i - firstDow + 1;
    if (dn < 1) cells.push({ d: prevTotal + dn, inMonth: false });
    else if (dn > total) cells.push({ d: dn - total, inMonth: false });
    else cells.push({ d: dn, inMonth: true });
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const clock = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const years = Array.from({ length: 10 }).map((_, i) =>
    String(now.getFullYear() - 5 + i)
  );

  return (
    <Win95DialogShell
      title={t('cfg.dateTime.title')}
      icon={<IconCalendar size={14} />}
      testID="dialog-datetime"
    >
      <Win95Tabs
        tabs={[t('cfg.dateTime.tab.date'), t('cfg.dateTime.tab.timezone')]}
        active={tab}
        onChange={setTab}
      />
      <Win95TabPane>
        <DateRow>
          <CalCol>
            <MonthRow>
              <View style={{ flex: 1 }}>
                <Win95Select
                  value={String(month)}
                  onChange={(v) => setMonth(Number(v))}
                  options={MONTHS.map((m, i) => ({
                    value: String(i),
                    label: m,
                  }))}
                />
              </View>
              <View style={{ width: 80, marginLeft: 4 }}>
                <Win95Select
                  value={String(year)}
                  onChange={(v) => setYear(Number(v))}
                  options={years}
                />
              </View>
            </MonthRow>

            <Bezel variant="inset">
              <View style={{ padding: 4, backgroundColor: '#ffffff' }}>
                <CalDows>
                  {DOW.map((d, i) => (
                    <CalDow key={i}>
                      <Win95Text variant="caption" bold>
                        {d}
                      </Win95Text>
                    </CalDow>
                  ))}
                </CalDows>
                <CalGrid>
                  {cells.map((c, i) => {
                    const isToday = c.inMonth && c.d === day;
                    return (
                      <CalDay
                        key={i}
                        $today={isToday}
                        $dim={!c.inMonth}
                        onPress={() => c.inMonth && setDay(c.d)}
                      >
                        <Win95Text
                          mono
                          color={isToday ? '#ffffff' : undefined}
                        >
                          {c.d}
                        </Win95Text>
                      </CalDay>
                    );
                  })}
                </CalGrid>
              </View>
            </Bezel>
          </CalCol>

          <ClockCol>
            <AnalogClock size={110} hours={hours} minutes={minutes} />
            <ClockReadout>
              <Bezel variant="inset">
                <View
                  style={{
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Win95Text mono>{clock}</Win95Text>
                </View>
              </Bezel>
            </ClockReadout>
          </ClockCol>
        </DateRow>

        <View style={{ marginTop: 8 }}>
          <Win95GroupBox title={t('cfg.dateTime.sync')}>
            <Win95Checkbox
              checked={ntp}
              onToggle={setNtp}
              label={t('cfg.dateTime.ntp')}
            />
            <View style={{ marginTop: 4 }}>
              <Win95Checkbox
                checked={dst}
                onToggle={setDst}
                label={t('cfg.dateTime.dst')}
              />
            </View>
            <View style={{ marginTop: 2, paddingLeft: 22 }}>
              <Win95Text variant="caption" color="#404040">
                {t('cfg.dateTime.dstNote')}
              </Win95Text>
            </View>
          </Win95GroupBox>
        </View>

        <Warning>
          <IconAlert size={14} />
          <View style={{ flex: 1, marginLeft: 6 }}>
            <Win95Text variant="caption">{t('cfg.dateTime.warning')}</Win95Text>
          </View>
        </Warning>

        <Footer>
          <Win95Button
            label={t('btn.ok')}
            primary
            onPress={applyAndClose}
            style={{ marginRight: 4 }}
            testID="datetime-ok"
          />
          <Win95Button
            label={t('btn.cancel')}
            onPress={() => navigation.goBack()}
            style={{ marginRight: 4 }}
            testID="datetime-cancel"
          />
          <Win95Button
            label={t('btn.apply')}
            onPress={applyAndStay}
            testID="datetime-apply"
          />
        </Footer>
      </Win95TabPane>
    </Win95DialogShell>
  );
}
