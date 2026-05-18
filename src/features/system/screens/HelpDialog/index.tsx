import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Bezel,
  Win95Button,
  Win95DialogShell,
  Win95Tabs,
  Win95TabPane,
  Win95Text,
} from '@/shared/components/win95';
import {
  IconFile,
  IconFolder,
  IconHelp,
} from '@/shared/components/icons';
import { useTranslation } from '@/shared/hooks/useTranslation';
import {
  Article,
  ArticleLink,
  Footer,
  HelpHint,
  TocRow,
  TocSpacer,
  Tree,
} from './styles';

interface TopicNode {
  id: string;
  label: string;
  indent: number;
  bold?: boolean;
  isFolder?: boolean;
  open?: boolean;
}

export function HelpDialog() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState('exe');

  const topics: TopicNode[] = [
    { id: 'start', label: t('cfg.help.sec.start'), indent: 0, bold: true, isFolder: true, open: true },
    { id: 'taskmgr', label: t('cfg.help.topic.taskmgr'), indent: 1 },
    { id: 'exe', label: t('cfg.help.topic.exe'), indent: 1 },
    { id: 'streaks', label: t('cfg.help.topic.streaks'), indent: 1 },
    { id: 'managing', label: t('cfg.help.sec.managing'), indent: 0, bold: true, isFolder: true },
    { id: 'notif', label: t('cfg.help.sec.notif'), indent: 0, bold: true, isFolder: true },
    { id: 'backup', label: t('cfg.help.sec.backup'), indent: 0, bold: true, isFolder: true },
    { id: 'troubleshoot', label: t('cfg.help.sec.troubleshoot'), indent: 0, bold: true, isFolder: true },
  ];

  return (
    <Win95DialogShell
      title={t('cfg.help.title')}
      icon={<IconHelp size={14} />}
      testID="dialog-help"
    >
      <Win95Tabs
        tabs={[
          t('cfg.help.tab.contents'),
          t('cfg.help.tab.index'),
          t('cfg.help.tab.find'),
        ]}
        active={tab}
        onChange={setTab}
      />
      <Win95TabPane>
        <Win95Text variant="caption" style={{ marginBottom: 4 }}>
          {t('cfg.help.intro')}
        </Win95Text>

        <Bezel variant="inset">
          <Tree>
            {topics.map((node) => {
              const isSel = node.id === selected;
              return (
                <TocRow
                  key={node.id}
                  $selected={isSel}
                  onPress={() => setSelected(node.id)}
                >
                  <TocSpacer style={{ width: node.indent * 14 }} />
                  {node.isFolder ? (
                    <IconFolder size={14} open={node.open} />
                  ) : (
                    <IconFile size={14} />
                  )}
                  <View style={{ marginLeft: 4, flex: 1 }}>
                    <Win95Text
                      bold={node.bold}
                      color={isSel ? '#ffffff' : undefined}
                    >
                      {node.label}
                    </Win95Text>
                  </View>
                </TocRow>
              );
            })}
          </Tree>
        </Bezel>

        <Article>
          <Win95Text bold style={{ marginBottom: 4 }}>
            {t('cfg.help.topic.exe')}
          </Win95Text>
          <Win95Text variant="caption">
            {t('cfg.help.article.p1')}
          </Win95Text>
          <Win95Text variant="caption" style={{ marginTop: 6 }}>
            {t('cfg.help.article.p2').split(',').map((seg, i, arr) => (
              <React.Fragment key={i}>
                {i > 0 ? ',' : ''}
                <ArticleLink>{seg}</ArticleLink>
                {i === arr.length - 1 ? '.' : ''}
              </React.Fragment>
            ))}
          </Win95Text>
        </Article>

        <Footer>
          <HelpHint>
            <Win95Text variant="caption" color="#404040">
              {t('cfg.help.f1')}
            </Win95Text>
          </HelpHint>
          <Win95Button label={t('cfg.help.print')} style={{ marginRight: 4 }} />
          <Win95Button label={t('cfg.help.annotate')} style={{ marginRight: 4 }} />
          <Win95Button
            label={t('cfg.help.display')}
            primary
            style={{ marginRight: 4 }}
          />
          <Win95Button
            label={t('cfg.help.close')}
            onPress={() => navigation.goBack()}
          />
        </Footer>
      </Win95TabPane>
    </Win95DialogShell>
  );
}
