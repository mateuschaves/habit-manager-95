/* Source-of-truth dictionary. en-US must mirror these keys. */
export const ptBR = {
  // common
  'btn.back': '< Voltar',
  'btn.next': 'Avançar >',
  'btn.finish': 'Concluir',
  'btn.cancel': 'Cancelar',
  'btn.ok': 'OK',
  'btn.browse': 'Procurar...',
  'btn.details': 'Detalhes',
  'btn.finishTask': 'Finalizar tarefa',
  'btn.run': 'Executar...',
  'btn.edit': 'Editar...',
  'btn.terminate': 'Encerrar',
  'btn.delete': 'Excluir',
  'btn.save': 'Salvar',
  'btn.newComponent': '+ Novo componente...',
  'btn.newHabit': 'Novo hábito',
  'btn.continue': 'Continuar',

  // splash
  'splash.bios': 'Habit BIOS v4.51',
  'splash.copyright': 'Copyright (C) 1995-2026, Habit Industries Inc.',
  'splash.memory': 'Teste de memória: 262144K OK',
  'splash.detecting': 'Detectando unidades IDE...',
  'splash.loadingKernel': 'Carregando kernel de hábitos.....[OK]',
  'splash.mounting': 'Montando /home/voce....[OK]',
  'splash.scheduling': 'Agendando notificações [OK]',
  'splash.press': 'Pressione qualquer lugar para iniciar o dia',

  // onboarding
  'setup.title': 'Setup do Habit Manager 95',
  'setup.wizard': 'Setup Wizard',
  'setup.step.welcome': 'Boas-vindas',
  'setup.step.select': 'Selecionar hábitos',
  'setup.step.customize': 'Personalizar',
  'setup.step.installing': 'Configurando',
  'setup.welcome.h': 'Bem-vindo ao Setup.',
  'setup.welcome.p1':
    'Este programa irá instalar Habit Manager 95 no seu sistema nervoso central. Recomenda-se encerrar todos os outros programas (planner do Notion, app fofinho com mascote) que possam estar em execução.',
  'setup.welcome.p2':
    'Toque em Avançar para continuar, ou Cancelar para sair e continuar fingindo que ano que vem você começa.',
  'setup.welcome.warn':
    'AVISO: este produto é protegido por leis de hábito-direito autoral.',
  'setup.select.h': 'Componentes a instalar',
  'setup.select.p': 'Selecione os hábitos que deseja rastrear. Você pode adicionar mais depois.',
  'setup.select.spaceNeeded': 'Espaço necessário',
  'setup.select.spaceAvailable': 'Espaço disponível',
  'setup.customize.h': 'Propriedades de cada hábito',
  'setup.customize.p':
    'Ajuste nome, ícone, frequência e lembretes. Você pode mudar tudo depois no Painel de Controle.',
  'setup.customize.empty': 'Adicione ao menos um hábito para continuar.',
  'setup.installing.h': 'Instalando...',
  'setup.installing.p': 'Configurando seus hábitos. Isso pode levar 0 segundos.',
  'setup.installing.done': 'Instalação concluída.',

  // form fields
  'field.processName': 'Nome do processo:',
  'field.icon': 'Ícone:',
  'field.frequency': 'Frequência:',
  'field.reminder': 'Lembrete:',
  'field.goal': 'Meta:',
  'field.notifyLate': 'Avisar se atrasado',
  'freq.daily': 'Diário',
  'freq.weekly': 'Semanal',
  'freq.custom': 'Dias específicos',
  'reminder.none': 'Sem lembrete',

  // main window
  'app.title': 'Gerenciador de Hábitos',
  'menu.file': 'Arquivo',
  'menu.options': 'Opções',
  'menu.view': 'Exibir',
  'menu.window': 'Janela',
  'menu.help': 'Ajuda',
  'tab.apps': 'Aplicativos',
  'tab.processes': 'Processos',
  'tab.performance': 'Desempenho',
  'tab.history': 'Histórico',
  'col.habit': 'Hábito',
  'col.status': 'Status',
  'col.streak': 'Streak',
  'col.energy': 'Energia',
  'list.empty': 'Nenhum processo em execução. Adicione um hábito para começar.',
  'status.running': 'Rodando',
  'status.pending': 'Pendente',
  'status.crashed': 'Não responde',
  'status.paused': 'Suspenso',
  'status.done': 'Concluído',
  'bar.processes': 'Processos: {n}',
  'bar.focus': 'Foco: {n}%',
  'bar.memory': '{n} concluídos',

  // aplicativos
  'apps.today': 'Aplicativos em execução hoje, {date}:',
  'apps.doneAt': 'Concluído hoje',
  'apps.waiting': 'Aguardando — lembrete {time}',
  'apps.waitingNoTime': 'Aguardando execução',
  'apps.crashed': 'Travou. Streak perdido.',
  'apps.running': 'Em execução',
  'apps.paused': 'Suspenso',

  // desempenho
  'perf.consistency': 'Consistência (12 semanas)',
  'perf.focus': 'Foco (últimos 7 dias)',
  'perf.totals': 'Totais',
  'perf.avgStreak': 'Streak médio:',
  'perf.bestStreak': 'Maior streak ativo:',
  'perf.weeklyRate': 'Taxa semanal:',
  'perf.crashes': 'Travamentos:',
  'perf.uptime': 'Hábitos ativos:',
  'perf.none': 'Sem dados de desempenho ainda.',
  'unit.days': 'dias',

  // historico
  'history.legendOk': 'tudo OK',
  'history.legendPartial': 'parcial',
  'history.legendFail': 'travou',
  'history.items': '{n} item(s)',

  // executar
  'run.title': 'Executar',
  'run.desc':
    'Digite o nome do hábito que deseja iniciar. O sistema o adicionará à lista de processos e agendará lembretes locais.',
  'run.open': 'Abrir:',
  'run.namePlaceholder': 'meditar',
  'run.background': 'Executar em segundo plano (sem notificar)',
  'run.editTitle': 'Propriedades — {name}.exe',
  'run.nameRequired': 'Digite um nome para o processo.',

  // detalhe
  'detail.title': '{name}.exe — Propriedades',
  'detail.tabGeneral': 'Geral',
  'detail.tabStats': 'Estatísticas',
  'detail.tabReminders': 'Lembretes',
  'detail.type': 'Tipo: {freq}',
  'detail.started': 'Iniciado em: {date}',
  'detail.currentStreak': 'Streak atual',
  'detail.bestStreak': 'Melhor streak',
  'detail.totalRuns': 'Total execuções',
  'detail.completionRate': 'Taxa de conclusão',
  'detail.unitTimes': 'vezes',
  'detail.consistencyMap': 'Mapa de consistência — últimas 12 semanas',
  'detail.deleteConfirmTitle': 'Encerrar processo',
  'detail.deleteConfirm':
    'Tem certeza que deseja encerrar permanentemente {name}.exe? Todo o histórico será perdido.',

  // bsod
  'bsod.brand': 'Habit Manager',
  'bsod.fatal': 'Um erro fatal ocorreu em {name}.exe. Streak de {days} dias foi perdido.',
  'bsod.blame':
    'A culpa é compartilhada entre o sistema operacional (você) e o subprocesso (também você). Não foi possível recuperar o estado anterior.',
  'bsod.advice':
    'Se este for o primeiro fail desta semana, toque em Continuar e retome o processo amanhã.',
  'bsod.tip1': '*  Verifique se o lembrete está agendado corretamente',
  'bsod.tip2': '*  Reduza a meta para um valor sustentável',
  'bsod.tip3': '*  Considere agrupar com outro hábito (habit stacking)',
  'bsod.tech': 'Detalhes técnicos:',
  'bsod.continue': 'Toque qualquer lugar da tela para continuar _',

  // settings / painel de controle
  'settings.title': 'Painel de Controle',
  'settings.address': 'Endereço: C:\\Painel de Controle',
  'settings.notifications': 'Notificações',
  'settings.appearance': 'Aparência',
  'settings.backup': 'Backup',
  'settings.datetime': 'Data e Hora',
  'settings.screen': 'Tela',
  'settings.addHabit': 'Adicionar Hábito',
  'settings.recycle': 'Reciclagem',
  'settings.help': 'Ajuda',
  'settings.about': 'Sobre',
  'settings.objects': '{n} objeto(s)',
  'settings.theme': 'Tema (paleta):',
  'settings.language': 'Idioma:',
  'settings.notifyLate': 'Avisar processos atrasados',
  'settings.resetTitle': 'Esvaziar Reciclagem',
  'settings.resetConfirm':
    'Isso apaga TODOS os hábitos e histórico permanentemente. Continuar?',
  'settings.resetDone': 'Sistema formatado. Comece de novo.',

  // about
  'about.title': 'Sobre Habit Manager 95',
  'about.version': 'Versão {v}',
  'about.licensed': 'Este produto está licenciado, segundo os termos do Acordo de Disciplina, para:',
  'about.licensee': 'Você — Pessoa Tentando se Organizar',
  'about.resources': 'Recursos do sistema',
  'about.activeHabits': 'Hábitos ativos:',
  'about.combinedStreak': 'Streak combinado:',
  'about.memoryFree': 'Memória física disponível:',

  // notifications
  'notif.pending': 'Você tem {n} processo(s) pendente(s).',

  // taskbar
  'taskbar.start': 'Iniciar',
};

export type TranslationKey = keyof typeof ptBR;
