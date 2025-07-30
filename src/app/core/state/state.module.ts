// src/app/core/state/state.module.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../environments/environment';

import { todoFeature } from './todos/todo.feature';
import { TodoEffects } from './todos/todo.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),

    // Feature-specific state
    StoreModule.forFeature(todoFeature),
    EffectsModule.forFeature([TodoEffects]),

    // Optional Devtools
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production, // disable in production
    }),
  ],
})
export class StateModule {}
