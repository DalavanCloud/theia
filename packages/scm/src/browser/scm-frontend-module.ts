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

import { ContainerModule } from 'inversify';
import { SCM_WIDGET_FACTORY_ID, ScmContribution } from './scm-contribution';
import { ScmServiceImpl } from './scm-service-impl';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';
import { ScmService } from '../common/scm';
import { ScmWidget } from '../browser/scm-widget';

export default new ContainerModule(bind => {
    bind(ScmService).to(ScmServiceImpl).inSingletonScope();

    bind(ScmWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: SCM_WIDGET_FACTORY_ID,
        createWidget: () => ctx.container.get(ScmWidget)
    })).inSingletonScope();

    bindViewContribution(bind, ScmContribution);
    bind(FrontendApplicationContribution).toService(ScmContribution);
});
