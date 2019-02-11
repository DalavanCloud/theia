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
import { injectable } from 'inversify';
import { ReactWidget } from '@theia/core/lib/browser';
import * as React from 'react';
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';

@injectable()
export class ScmWidget extends ReactWidget {

    constructor() {
        super();
        this.id = 'scm';
        this.title.label = 'Scm';
        this.title.caption = 'Scm';
        this.title.iconClass = 'fa extensions-tab-icon';
        this.addClass('theia-scm');

        this.update();
    }
    protected render(): React.ReactNode {
        return <AlertMessage
            type='WARNING'
            header='Version control is not available at this time'
        />;
    }
}
