/********************************************************************************
 * Copyright (C) 2019 Ericsson and others.
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
import { BrandingService } from '@theia/core/lib/browser/branding';
import { BuiltinThemeProvider } from '@theia/core/lib/browser/theming';

BrandingService.instance.setBranding({
    mainIcon: theme => theme.id === BuiltinThemeProvider.lightTheme.id
        ? require('../../src/browser/icons/theia-brand-logo-light.png')
        : require('../../src/browser/icons/theia-brand-logo-dark.png'),
    menuIcon: theme => theme.id === BuiltinThemeProvider.lightTheme.id
        ? require('../../src/browser/icons/theia-menu-logo-light.png')
        : require('../../src/browser/icons/theia-menu-logo-dark.png'),
    mainSize: '40%',
});

export default new ContainerModule(() => { });
