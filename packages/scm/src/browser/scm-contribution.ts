/********************************************************************************
 * Copyright (C) 2019 Red Hat, Inc. and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import { inject, injectable } from 'inversify';
import {
    AbstractViewContribution,
    FrontendApplicationContribution,
    StatusBar,
    StatusBarAlignment,
    StatusBarEntry
} from '@theia/core/lib/browser';
import { ScmCommand, ScmService } from '../common/scm';
import { ScmWidget } from '../browser/scm-widget';

export const SCM_WIDGET_FACTORY_ID = 'scm';

@injectable()
export class ScmContribution extends AbstractViewContribution<ScmWidget> implements FrontendApplicationContribution {
    @inject(StatusBar) protected readonly statusBar: StatusBar;
    @inject(ScmService) protected readonly scmService: ScmService;

    constructor() {
        super({
            widgetId: SCM_WIDGET_FACTORY_ID,
            widgetName: 'Scm',
            defaultWidgetOptions: {
                area: 'left',
                rank: 300
            },
            toggleCommandId: 'scmView:toggle',
            toggleKeybinding: 'ctrlcmd+shift+q'
        });
    }

    onStart(): void {
        const refresh = (commands: ScmCommand[]) => {
            commands.forEach(command => {
                const statusBaCommand: StatusBarEntry = {
                    text: command.text,
                    tooltip: command.tooltip,
                    command: command.command,
                    alignment: StatusBarAlignment.LEFT,
                    priority: 100
                };
                this.statusBar.setElement(command.id, statusBaCommand);
            });
        };
        this.scmService.onDidAddRepository(repository => {
            const onDidChangeStatusBarCommands = repository.provider.onDidChangeStatusBarCommands;
            if (onDidChangeStatusBarCommands) {
                onDidChangeStatusBarCommands(commands => refresh(commands));
            }
        });
    }
}
