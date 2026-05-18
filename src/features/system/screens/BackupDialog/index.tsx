import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Share, View } from 'react-native';
import {
  Bezel,
  Win95Button,
  Win95Checkbox,
  Win95DialogShell,
  Win95GroupBox,
  Win95Progress,
  Win95Radio,
  Win95Text,
} from '@/shared/components/win95';
import { IconFile, IconFloppy } from '@/shared/components/icons';
import { useHabits } from '@/shared/context/HabitsContext';
import { useSettings } from '@/shared/context/SettingsContext';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { APP_VERSION } from '@/shared/constants';
import {
  Eta,
  FileName,
  FileRow,
  Footer,
  Header,
  HeaderIcon,
  HeaderInfo,
  List,
  Meta,
} from './styles';

interface BackupFile {
  name: string;
  size: string;
  default: boolean;
}

const FILES: BackupFile[] = [
  { name: 'streak.dat', size: '4 KB', default: true },
  { name: 'history.db', size: '128 KB', default: true },
  { name: 'config.ini', size: '2 KB', default: true },
  { name: 'notifications.q', size: '8 KB', default: true },
  { name: 'theme.cfg', size: '1 KB', default: false },
  { name: 'cache.tmp', size: '64 KB', default: false },
];

type Dest = 'floppy' | 'cloud' | 'share';
type Status = 'idle' | 'exporting' | 'done' | 'error';

export function BackupDialog() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { habits, completions } = useHabits();
  const settings = useSettings();
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(FILES.map((f) => [f.name, f.default]))
  );
  const [dest, setDest] = useState<Dest>('share');
  const [status, setStatus] = useState<Status>('idle');
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<string>('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const selectedFiles = FILES.filter((f) => checked[f.name]);
  const selectedCount = selectedFiles.length;
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  function statusMessage(): string {
    if (status === 'exporting') {
      return t('cfg.backup.status.exporting', { file: currentFile });
    }
    if (status === 'done') return t('cfg.backup.status.done');
    if (status === 'error') return t('cfg.backup.status.error');
    return t('cfg.backup.status.idle');
  }

  async function start() {
    if (selectedCount === 0) {
      Alert.alert(t('cfg.backup.title'), t('cfg.backup.emptySelection'));
      return;
    }
    setStatus('exporting');
    setProgress(0);

    if (intervalRef.current) clearInterval(intervalRef.current);
    let step = 0;
    intervalRef.current = setInterval(() => {
      step += 1;
      const idx = Math.min(selectedFiles.length - 1, Math.floor(step / 4));
      setCurrentFile(selectedFiles[idx].name);
      const next = Math.min(100, step * 6);
      setProgress(next);
      if (next >= 100 && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 90);

    try {
      const payload = {
        version: APP_VERSION,
        exportedAt: new Date().toISOString(),
        files: selectedFiles.map((f) => f.name),
        settings: {
          palette: settings.palette,
          language: settings.language,
          notifyLate: settings.notifyLate,
          brightness: settings.brightness,
          colorDepth: settings.colorDepth,
        },
        habits,
        completions,
      };
      const json = JSON.stringify(payload, null, 2);
      await Share.share({
        title: t('cfg.backup.shareTitle'),
        message: json,
      });
      setStatus('done');
      setProgress(100);
    } catch {
      setStatus('error');
    } finally {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }

  function restore() {
    Alert.alert(t('cfg.backup.restoreTitle'), t('cfg.backup.restoreBody'));
  }

  return (
    <Win95DialogShell
      title={t('cfg.backup.title')}
      icon={<IconFloppy size={14} />}
      testID="dialog-backup"
    >
      <Header>
        <HeaderIcon>
          <IconFloppy size={42} />
        </HeaderIcon>
        <HeaderInfo>
          <Win95Text variant="label" bold>
            {t('cfg.backup.heading')}
          </Win95Text>
          <Win95Text variant="caption" style={{ marginTop: 4 }}>
            {t('cfg.backup.intro')}
          </Win95Text>
        </HeaderInfo>
      </Header>

      <Win95GroupBox title={t('cfg.backup.origin')}>
        <Bezel variant="inset">
          <List>
            {FILES.map((f) => (
              <FileRow key={f.name}>
                <Win95Checkbox
                  checked={!!checked[f.name]}
                  onToggle={(v) =>
                    setChecked((c) => ({ ...c, [f.name]: v }))
                  }
                />
                <View style={{ marginLeft: 4 }}>
                  <IconFile size={14} />
                </View>
                <FileName>
                  <Win95Text>{f.name}</Win95Text>
                </FileName>
                <Win95Text mono variant="caption">
                  {f.size}
                </Win95Text>
              </FileRow>
            ))}
          </List>
        </Bezel>
        <Meta>
          <Win95Text variant="caption">
            {t('cfg.backup.selected')} <Win95Text bold>142 KB</Win95Text>
          </Win95Text>
          <Win95Text variant="caption">
            {t('cfg.backup.files', { done: selectedCount, total: FILES.length })}
          </Win95Text>
        </Meta>
      </Win95GroupBox>

      <View style={{ marginTop: 8 }}>
        <Win95GroupBox title={t('cfg.backup.destination')}>
          <Win95Radio
            checked={dest === 'floppy'}
            onSelect={() => setDest('floppy')}
            label={t('cfg.backup.dest.floppy')}
          />
          <Win95Radio
            checked={dest === 'cloud'}
            onSelect={() => setDest('cloud')}
            label={t('cfg.backup.dest.cloud', { date: dateStr })}
          />
          <Win95Radio
            checked={dest === 'share'}
            onSelect={() => setDest('share')}
            label={t('cfg.backup.dest.share')}
          />
        </Win95GroupBox>
      </View>

      <View style={{ marginTop: 8 }}>
        <Win95Text variant="caption" style={{ marginBottom: 3 }}>
          {statusMessage()}
        </Win95Text>
        <Win95Progress value={progress} />
        <Eta>
          <Win95Text variant="caption">
            {Math.min(selectedCount, Math.ceil((progress / 100) * selectedCount))} / {selectedCount}
          </Win95Text>
          <Win95Text variant="caption">
            {status === 'exporting'
              ? t('cfg.backup.eta', { n: Math.max(0, Math.ceil((100 - progress) / 20)) })
              : ''}
          </Win95Text>
        </Eta>
      </View>

      <Footer>
        <Win95Button
          label={t('cfg.backup.start')}
          icon={<IconFloppy size={12} />}
          primary
          onPress={start}
          disabled={status === 'exporting'}
          style={{ marginRight: 4 }}
          testID="backup-start"
        />
        <Win95Button
          label={t('cfg.backup.restore')}
          onPress={restore}
          disabled={status === 'exporting'}
          style={{ marginRight: 4 }}
          testID="backup-restore"
        />
        <Win95Button
          label={t('btn.cancel')}
          onPress={() => navigation.goBack()}
          testID="backup-cancel"
        />
      </Footer>
    </Win95DialogShell>
  );
}
