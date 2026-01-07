import { BrowserModule, provideClientHydration /*, BrowserTransferStateModule */ } from '@angular/platform-browser';
import { NgModule, SecurityContext, PLATFORM_ID, inject, provideAppInitializer, APP_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NxModule } from '@nrwl/angular';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
// Base auth
import { AuthModule, LogoutInterceptor} from '@rollthecloudinc/auth';
// Auth implementation - open connect/oauth
import { OidcModule, TokenInterceptor, CLIENT_SETTINGS, ClientSettings } from '@rollthecloudinc/oidc';
import { MediaModule, MediaSettings, MEDIA_SETTINGS } from '@rollthecloudinc/media';
import { UtilsModule /*, CorrelationInterceptor */, SITE_NAME, HOST_NAME, PROTOCOL } from '@rollthecloudinc/utils';
//import { MaterialModule } from '@rollthecloudinc/material';
// import { LOGGING_SETTINGS, LoggingSettings, LoggingModule, HttpErrorInterceptor, GlobalErrorHandler } from '@classifieds-ui/logging';
import { TokenModule } from '@rollthecloudinc/token';
import { ContextModule } from '@rollthecloudinc/context';
import { ContentModule } from '@rollthecloudinc/content';
import { AliasModule, CatchAllGuard, CatchAllRouterComponent } from '@rollthecloudinc/alias';
import { PagealiasModule } from '@rollthecloudinc/pagealias';
import { PanelPage, PanelsModule, PanelsSettings, PANELS_SETTINGS } from '@rollthecloudinc/panels';
//import { FormlyModule } from '@rollthecloudinc/formly';
import { BridgeModule } from '@rollthecloudinc/bridge';
import { StateModule } from '@rollthecloudinc/state';
import { AwcogModule, CognitoSettings, COGNITO_SETTINGS } from '@rollthecloudinc/awcog';
import { initializeIdbDataFactory, KeyvalModule } from '@rollthecloudinc/keyval';
import { MarkdownModule, MARKED_OPTIONS, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule, MinimalRouterStateSerializer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule, DefaultDataServiceConfig } from '@ngrx/data';
import { reducers, metaReducers } from './reducers';
import { AuthCallbackComponent } from '@rollthecloudinc/auth';
import { TransformModule } from '@rollthecloudinc/transform';
import { DeityModule } from '@rollthecloudinc/deity';
import { LoopModule } from '@rollthecloudinc/loop';
import { RenderModule } from '@rollthecloudinc/render';
import { FormsModule as DruidFormsModule } from '@rollthecloudinc/forms';
// import { TransferHttpCacheModule } from '@angular/ssr';
import { AlienaliasModule, AlienaliasSettings, ALIENALIAS_SETTINGS } from '@rollthecloudinc/alienalias';
import { OutsiderModule } from '@rollthecloudinc/outsider';
import { TractorbeamModule } from '@rollthecloudinc/tractorbeam';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RefineryModule } from '@rollthecloudinc/refinery';
import { SheathModule } from '@rollthecloudinc/sheath';
// import { ReactModule } from '@rollthecloudinc/react';
import { CloudwatchRumSettings, CLOUDWATCH_RUM_SETTINGS } from '@rollthecloudinc/awrum';
import { panelpages } from '../environments/panelpages';
import { createEditMatcher, createMatcher, EditPanelPageComponent, PagesModule, PanelPageRouterComponent, PAGES_SETTINGS, PagesSettings } from '@rollthecloudinc/pages';
import { panelpages as panelpages2 } from '../data/panelpages';
import { OrdainModule } from '@rollthecloudinc/ordain';
import { DparamModule } from '@rollthecloudinc/dparam';
import { DetourModule } from '@rollthecloudinc/detour';

// import { MonacoEditorModule } from 'ngx-monaco-editor';

const routes = [
  { path: 'auth-callback', component: AuthCallbackComponent },
  ...panelpages.map(([id, path]) =>  ({ matcher: createEditMatcher(new PanelPage({ id, layoutType: '', displayType: '', gridItems: [], panels: [], layoutSetting: undefined, rowSettings: [], path })), component: EditPanelPageComponent, data: { panelPageListItem: new PanelPage({ id, layoutType: '', displayType: '', gridItems: [], panels: [], layoutSetting: undefined, rowSettings: [], path }) } })),
  ...panelpages.map(([id, path]) =>  ({ matcher: createMatcher(new PanelPage({ id, layoutType: '', displayType: '', gridItems: [], panels: [], layoutSetting: undefined, rowSettings: [], path })), component: PanelPageRouterComponent, data: { panelPageListItem: new PanelPage({ id, layoutType: '', displayType: '', gridItems: [], panels: [], layoutSetting: undefined, rowSettings: [], path }) } })),
  { path: '**', component: CatchAllRouterComponent, canActivate: [ CatchAllGuard ] }
];

// @todo: just get this to work for now deal with actual endpoints later.
const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiGatewaySettings.endpointUrl,
  timeout: 20000, // request timeout
}

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  renderer.link = ({ href, title, text }) => {
    if(text === 'page') {
      return `<classifieds-ui-panel-page id="${href}"></classifieds-ui-panel-page>`;
    } else {
      return `<classifieds-ui-page-router-link href="${href}" text="${text}"></classifieds-ui-page-router-link>`;
    }
  };
  return {
    renderer,
  };
}

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [/*BrowserModule.withServerTransition({ appId: 'serverApp' }),*/
        CommonModule,
        BrowserModule,
        // BrowserTransferStateModule ,
        FormsModule,
        ReactiveFormsModule,
        //BrowserAnimationsModule,
        NgxJsonViewerModule,
        // TransferHttpCacheModule,
        MarkdownModule.forRoot({
            sanitize: SecurityContext.NONE,
            markedOptions: {
                provide: MARKED_OPTIONS,
                useFactory: markedOptionsFactory,
            },
        }),
        // NbA11yModule.forRoot(),
        RouterModule.forRoot(routes),
        !environment.production ? StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
            connectInZone: true
        }) : [],
        StoreRouterConnectingModule.forRoot({
            serializer: MinimalRouterStateSerializer
        }),
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictActionImmutability: true,
                strictStateImmutability: true
            }
        }),
        EffectsModule.forRoot([]),
        BridgeModule,
        StateModule,
        // MaterialModule,
        UtilsModule,
        // LoggingModule,
        TokenModule,
        ContentModule,
        ContextModule,
        AuthModule.forRoot(),
        OidcModule.forRoot(),
        // MonacoEditorModule.forRoot(),
        MediaModule,
        // NxModule.forRoot(),
        EntityDataModule.forRoot({}),
        AliasModule,
        PanelsModule,
        RenderModule,
        PagealiasModule, // The PageAlias module is causing problems when prerendering the index / page. Therefore, remove it since we don't use PanelPageListItems at this time.
        // FormlyModule,
        TransformModule,
        AwcogModule,
        KeyvalModule,
        DeityModule,
        LoopModule,
        DruidFormsModule,
        // AlienaliasModule, // @todo: for now to avoid routing errors while working on ssr issues.
        OutsiderModule,
        TractorbeamModule,
        RefineryModule,
        SheathModule,
        NgxDropzoneModule,
        // ReactModule,
        PagesModule,
        OrdainModule,
        DparamModule,
        DetourModule], providers: [
        provideClientHydration(),
        CatchAllGuard,
        { provide: APP_ID, useValue: 'serverApp' },
        { provide: SITE_NAME, useValue: environment.site },
        { provide: CLIENT_SETTINGS, useValue: new ClientSettings(environment.clientSettings) },
        { provide: MEDIA_SETTINGS, useValue: new MediaSettings(environment.mediaSettings) },
        { provide: PANELS_SETTINGS, useValue: new PanelsSettings(environment.panelsSettings) },
        { provide: ALIENALIAS_SETTINGS, useValue: new AlienaliasSettings(environment.alienaliasSettings) },
        { provide: PAGES_SETTINGS, useValue: new PagesSettings({ disableRouting: false }) },
        { provide: COGNITO_SETTINGS, useValue: new CognitoSettings(environment.cognitoSettings) },
        { provide: CLOUDWATCH_RUM_SETTINGS, useValue: new CloudwatchRumSettings(environment.rumSettings) },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LogoutInterceptor, multi: true },
        { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
        provideAppInitializer(() => {
        const initializerFn = (initializeIdbDataFactory({ key: ({ data }) => 'panelpage__' + data.id, data: panelpages2.map(p => new PanelPage(p as any)) }))(inject(PLATFORM_ID));
        return initializerFn();
      }),
        provideHttpClient(withInterceptorsFromDi(), withJsonpSupport()),
    ] })
export class AppModule {}

