import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
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
import { useTranslation } from '@/shared/hooks/useTranslation';
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

export function BackupDialog() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(FILES.map((f) => [f.name, f.default]))
  );
  const [dest, setDest] = useState<Dest>('floppy');

  const selectedCount = Object.values(checked).filter(Boolean).length;
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

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
          {t('cfg.backup.copying', { file: 'history.db' })}
        </Win95Text>
        <Win95Progress value={62} />
        <Eta>
          <Win95Text variant="caption">3 / 4</Win95Text>
          <Win95Text variant="caption">
            {t('cfg.backup.eta', { n: 2 })}
          </Win95Text>
        </Eta>
      </View>

      <Footer>
        <Win95Button
          label={t('cfg.backup.start')}
          icon={<IconFloppy size={12} />}
          primary
          style={{ marginRight: 4 }}
        />
        <Win95Button label={t('cfg.backup.restore')} style={{ marginRight: 4 }} />
        <Win95Button
          label={t('btn.cancel')}
          onPress={() => navigation.goBack()}
        />
      </Footer>
    </Win95DialogShell>
  );
}
