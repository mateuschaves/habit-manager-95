import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { Alert, Share, View } from 'react-native';
import {
  Bezel,
  Win95Button,
  Win95DialogShell,
  Win95Input,
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
  parent?: string;
  bold?: boolean;
  isFolder?: boolean;
  articleKey?: 'taskmgr' | 'exe' | 'streaks';
}

const FOLDER_OPEN: Record<string, boolean> = {
  start: true,
};

export function HelpDialog() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState('exe');
  const [open, setOpen] = useState<Record<string, boolean>>(FOLDER_OPEN);
  const [query, setQuery] = useState('');

  const topics: TopicNode[] = useMemo(
    () => [
      { id: 'start', label: t('cfg.help.sec.start'), indent: 0, bold: true, isFolder: true },
      { id: 'taskmgr', label: t('cfg.help.topic.taskmgr'), indent: 1, parent: 'start', articleKey: 'taskmgr' },
      { id: 'exe', label: t('cfg.help.topic.exe'), indent: 1, parent: 'start', articleKey: 'exe' },
      { id: 'streaks', label: t('cfg.help.topic.streaks'), indent: 1, parent: 'start', articleKey: 'streaks' },
      { id: 'managing', label: t('cfg.help.sec.managing'), indent: 0, bold: true, isFolder: true },
      { id: 'notif', label: t('cfg.help.sec.notif'), indent: 0, bold: true, isFolder: true },
      { id: 'backup', label: t('cfg.help.sec.backup'), indent: 0, bold: true, isFolder: true },
      { id: 'troubleshoot', label: t('cfg.help.sec.troubleshoot'), indent: 0, bold: true, isFolder: true },
    ],
    [t]
  );

  const visibleTree = topics.filter((node) => {
    if (!node.parent) return true;
    return !!open[node.parent];
  });

  const leaves = topics.filter((n) => !n.isFolder);
  const flatSorted = [...leaves].sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  const filtered = query
    ? leaves.filter((n) =>
        n.label.toLowerCase().includes(query.toLowerCase())
      )
    : leaves;

  const activeTopic = topics.find((n) => n.id === selected);
  const articleBody = activeTopic?.articleKey
    ? activeTopic.articleKey === 'exe'
      ? t('cfg.help.article.p1')
      : t(`cfg.help.article.${activeTopic.articleKey}` as const)
    : null;

  function pickTopic(id: string) {
    setSelected(id);
    setTab(0);
  }

  function toggleFolder(id: string) {
    setOpen((o) => ({ ...o, [id]: !o[id] }));
  }

  async function onPrint() {
    if (!activeTopic || !articleBody) {
      Alert.alert(t('cfg.help.title'), t('cfg.help.printNoTopic'));
      return;
    }
    try {
      await Share.share({
        title: t('cfg.help.printShareTitle'),
        message: `${activeTopic.label}\n\n${articleBody}`,
      });
    } catch {
      // User dismissed the share sheet — nothing to do.
    }
  }

  function onAnnotate() {
    Alert.alert(t('cfg.help.annotateTitle'), t('cfg.help.annotateBody'));
  }

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
        testID="help-tabs"
      />
      <Win95TabPane>
        {tab === 0 && (
          <View>
            <Win95Text variant="caption" style={{ marginBottom: 4 }}>
              {t('cfg.help.intro')}
            </Win95Text>

            <Bezel variant="inset">
              <Tree>
                {visibleTree.map((node) => {
                  const isSel = node.id === selected;
                  const isOpen = !!open[node.id];
                  return (
                    <TocRow
                      key={node.id}
                      $selected={isSel}
                      onPress={() =>
                        node.isFolder
                          ? toggleFolder(node.id)
                          : setSelected(node.id)
                      }
                      testID={`help-toc-${node.id}`}
                    >
                      <TocSpacer style={{ width: node.indent * 14 }} />
                      {node.isFolder ? (
                        <IconFolder size={14} open={isOpen} />
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
              {activeTopic && articleBody ? (
                <>
                  <Win95Text bold style={{ marginBottom: 4 }}>
                    {activeTopic.label}
                  </Win95Text>
                  <Win95Text variant="caption">{articleBody}</Win95Text>
                </>
              ) : (
                <Win95Text variant="caption">
                  {t('cfg.help.noArticle')}
                </Win95Text>
              )}
            </Article>
          </View>
        )}

        {tab === 1 && (
          <View>
            <Win95Text variant="caption" style={{ marginBottom: 4 }}>
              {t('cfg.help.indexHint')}
            </Win95Text>
            <Bezel variant="inset">
              <Tree>
                {flatSorted.map((node) => {
                  const isSel = node.id === selected;
                  return (
                    <TocRow
                      key={node.id}
                      $selected={isSel}
                      onPress={() => pickTopic(node.id)}
                      testID={`help-index-${node.id}`}
                    >
                      <IconFile size={14} />
                      <View style={{ marginLeft: 4, flex: 1 }}>
                        <Win95Text
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
          </View>
        )}

        {tab === 2 && (
          <View>
            <Win95Input
              label={t('cfg.help.searchPlaceholder')}
              value={query}
              onChangeText={setQuery}
              testID="help-search"
            />
            <View style={{ marginTop: 6 }}>
              <Bezel variant="inset">
                <Tree>
                  {filtered.length === 0 ? (
                    <View style={{ padding: 8 }}>
                      <Win95Text variant="caption">
                        {t('cfg.help.searchEmpty')}
                      </Win95Text>
                    </View>
                  ) : (
                    filtered.map((node) => {
                      const isSel = node.id === selected;
                      return (
                        <TocRow
                          key={node.id}
                          $selected={isSel}
                          onPress={() => pickTopic(node.id)}
                          testID={`help-find-${node.id}`}
                        >
                          <IconFile size={14} />
                          <View style={{ marginLeft: 4, flex: 1 }}>
                            <Win95Text
                              color={isSel ? '#ffffff' : undefined}
                            >
                              {node.label}
                            </Win95Text>
                          </View>
                        </TocRow>
                      );
                    })
                  )}
                </Tree>
              </Bezel>
            </View>
          </View>
        )}

        <Footer>
          <HelpHint>
            <Win95Text variant="caption" color="#404040">
              {t('cfg.help.f1')}
            </Win95Text>
          </HelpHint>
          <Win95Button
            label={t('cfg.help.print')}
            onPress={onPrint}
            style={{ marginRight: 4 }}
            testID="help-print"
          />
          <Win95Button
            label={t('cfg.help.annotate')}
            onPress={onAnnotate}
            style={{ marginRight: 4 }}
            testID="help-annotate"
          />
          <Win95Button
            label={t('cfg.help.display')}
            primary
            onPress={() => setTab(0)}
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
